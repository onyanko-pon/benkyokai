const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

router.post("/v2.access", async (req, res) => {
  const { code } = req.body

  const data = (await fetch("https://slack.com/api/oauth.v2.access", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: `code=${code}&client_id=${process.env.SLACK_API_CLIENT_ID}&client_secret=${process.env.SLACK_API_CLIENT_SECRET}`
  })).json()

  const {authed_user, team, ok} = data

  if (!ok) {
    res.status(401).json(data)
    return
  }

  res.status(200).json({authed_user, team, ok})
})

router.get("/hello", (req, res) => {
  res.status(200).json({"message": "hello"})
})

module.exports = router