const express = require('express');
const router = express.Router();

const chat = require('../../chat')
const Event = require('../../models/Event')
const User = require('../../models/user')

router.post("/", async (req, res) => {
  const {user_id} = req.body

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const startTime = new Date()
  const endTime = new Date()
  startTime.setHours(10, 0, 0, 0)
  endTime.setHours(11, 0, 0, 0)

  try {
    const user = (await User.findOne({ where: { slack_id: user_id } })).dataValues
    const event = await Event.create({
      title: "イベントタイトル",
      description: "説明を記述してください",
      userId: user.id,
      workspaceId: user.workspaceId,
      date: tomorrow.toLocaleDateString(),
      startTime: startTime.toLocaleTimeString(),
      endTime: endTime.toLocaleTimeString(),
    })
    chat.postMessage(user.slackId, `勉強会が作成されました event_id ${event.id}`)
    res.status(200)
  } catch (e) {
    res.status(500).json({"error": e})
  }
})

router.get("/hello", (req, res) => {
  res.status(200).json({"message": "hello"})
})

module.exports = router