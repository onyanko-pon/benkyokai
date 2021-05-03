const express = require('express')
const router = express.Router();
const fetch = require('node-fetch')
const jwt = require('jsonwebtoken')
const session = require("express-session")
const User = require("../../models/user")
const Workspace = require("../../models/Workspace")

const auth = require("../../auth")

router.post("/signin", async (req, res) => {
  const { code } = req.body

  const fetch_res = await fetch("https://slack.com/api/oauth.v2.access", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: `code=${code}&client_id=${process.env.SLACK_API_CLIENT_ID}&client_secret=${process.env.SLACK_API_CLIENT_SECRET}`
  })

  const data = await fetch_res.json()

  const {authed_user, team, ok} = data

  if (!ok) {
    return res.status(401).json(data)
  }

  let token = ""
  try {
    token = jwt.sign({
      user_id: authed_user.id,
      workspace_id: team.id,
      access_token: authed_user.access_token,
    }, process.env.JWT_PRIVATE_KEY, {});
  } catch (e) {
    return res.status(500).json({error: e})
  }

  const user = await User.findOne({ where: { slackId: authed_user.id}})
  const workspace = await Workspace.findOne({ where: { slackId: team.id}})
  req.session.user = user

  res.cookie('token', token, {
    maxAge: 31536000,
    SameSite: 'None',
    // TODO 本番で設定
    // domain: "",
    // secure: true,
    // httpOnly: true
  })

  res.status(200).json({user, workspace})
})

router.post("/verify", auth, async (req, res) => {

  const payload = req.jwtPayload
  const user = await User.findOne({ where: { slackId: payload.user_id}})
  const workspace = await Workspace.findOne({ where: { slackId: payload.workspace_id}})

  return res.status(200).json({user, workspace})
})

router.get("/hello", (req, res) => {
  res.status(200).json({"message": "hello"})
})

module.exports = router