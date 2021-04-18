const express = require('express');
const router = express.Router();

const chat = require('../../chat')
const User = require('../../models/user')
const Workspace = require('../../models/Workspace')

router.post("/signup", async (req, res) => {
  const {team_id: workspace_slack_id, user_id: user_slack_id, user_name} = req.body

  console.log(req.body)
  console.log("user_slack_id", user_slack_id)

  try {
    // TODO userがすでに登録されていないかを確認する
    // 現状、slackIdにUnique制約で登録されないが、チャットでエラーメッセージを送ってあげたい

    const workspace = (await Workspace.findOne({slackId: workspace_slack_id})).dataValues
    const user = (await User.create({slackId: user_slack_id, name: user_name, workspaceId: workspace.id})).dataValues
    await chat.postMessage(user_slack_id, `ユーザー連携が完了しました ID:${user.id}`)
    res.status(200).json({user})
  } catch (e) {
    res.status(500).json({error: e})
  }
})

router.get("/hello", (req, res) => {
  res.status(200).json({"message": "hello"})
})

module.exports = router