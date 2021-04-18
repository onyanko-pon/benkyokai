const express = require('express');
const router = express.Router();

const chat = require('../../chat')
const Workspace = require('../../models/Workspace')

router.post("/signup", async (req, res) => {
  const {team_id: workspace_slack_id, team_domain: workspace_name, user_id: user_slack_id} = req.body

  // TODO workspaceがすでに登録されていないかを確認する
  // 現状、slackIdにUnique制約で登録されないが、チャットでエラーメッセージを送ってあげたい

  try {
    const workspace = (await Workspace.create({slackId: workspace_slack_id, name: workspace_name})).dataValues
    await chat.postMessage(user_slack_id, `ワークスペースと連携されました ID:${workspace.id}`)
    res.status(200).json({workspace})
  } catch (e) {
    res.status(500).json({error: e})
  }
})

router.get("/hello", (req, res) => {
  res.status(200).json({"message": "hello"})
})

module.exports = router