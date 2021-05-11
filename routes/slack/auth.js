const express = require('express')
const router = express.Router();
const fetch = require('node-fetch')
const jwt = require('jsonwebtoken')
const User = require("../../models/user")
const Workspace = require("../../models/Workspace")

const auth = require("../../auth")

router.post("/signin", async (req, res) => {
  const { code, redirect_uri } = req.body

  // TODO redirect_uriを定数から
  const fetch_res = await fetch("https://slack.com/api/oauth.v2.access", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: `code=${code}&client_id=${process.env.SLACK_API_CLIENT_ID}&client_secret=${process.env.SLACK_API_CLIENT_SECRET}&redirect_uri=${redirect_uri}`
  })

  const data = await fetch_res.json()

  const {authed_user, team, ok} = data
  const access_token = authed_user.access_token

  let user = await User.findOne({ where: { slackId: authed_user.id}})
  const workspace = await Workspace.findOne({ where: { slackId: team.id}})

  if (!user) {
    const identifyFetchRes = await fetch(`https://slack.com/api/users.identity?token=${access_token}`, {
      method: "GET",
      cache: 'no-cache'
    })

    const identifyData = await identifyFetchRes.json()

    const {image_192, name} = identifyData.user

    try {
      user = await User.create({
        name: name,
        image: image_192,
        slackId: authed_user.id,
        workspaceId: workspace.id
      })
    } catch (e) {
      res.status(500).json({error: e})
    }
  }

  if (!ok) {
    return res.status(401).json(data)
  }

  let token = ""
  try {
    token = jwt.sign({
      user_id: user.id,
      workspace_id: workspace.id,
      access_token: authed_user.access_token,
    }, process.env.JWT_PRIVATE_KEY, {});
  } catch (e) {
    return res.status(500).json({error: e})
  }

  res.cookie('token', token, {
    maxAge: 31536000,
    sameSite: 'None',
    // TODO 本番で設定
    domain: process.env.BACKEND_DOMAIN,
    secure: true,
    httpOnly: true,
    path: '/'
  })

  res.status(200).json({user, workspace})
})

router.post("/verify", auth, async (req, res) => {

  const payload = req.jwtPayload
  const user = await User.findByPk(payload.user_id)
  const workspace = await Workspace.findByPk(payload.workspace_id)

  return res.status(200).json({user, workspace})
})

router.get("/hello", (req, res) => {
  res.status(200).json({"message": "hello"})
})

module.exports = router