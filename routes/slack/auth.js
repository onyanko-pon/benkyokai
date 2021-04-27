const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

router.post("/v2.access", async (req, res) => {
  const { code } = req.body

  fetch("https://slack.com/api/oauth.v2.access", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: `code=${code}&client_id=${process.env.SLACK_API_CLIENT_ID}&client_secret=${process.env.SLACK_API_CLIENT_SECRET}`
  }).then(data => data.json())
    .then(data => {
      const {authed_user, team, ok} = data
      if (ok) {
        res.status(200).json({authed_user, team})
      } else {
        res.status(401).json(data)
      }
    })
    .catch(error => {
      res.status(500).json({error})
    })

})

router.get("/hello", (req, res) => {
  res.status(200).json({"message": "hello"})
})

module.exports = router