const express = require('express');
const router = express.Router();
const auth = require('../../auth')

const { Event, User } = require('../../models')

router.get("/", auth, (req, res) => {
  Event.findAll({
    where: {
      workspaceId: req.jwtPayload.workspace_id
    },
    include: [
      {
        model: User,
      },
      {
        model: User,
        as: 'Administrator'
      },
    ],
  }).then(events => {
      res.status(200).json({events})
    }).catch(error => {
    res.status(500).json({error})
  })
})

router.get("/:eventId", auth, async (req, res) => {
  const {eventId} = req.params
  const event = await Event.findByPk(eventId, {
    include: [
      {
        model: User,
      },
      {
        model: User,
        as: 'Administrator'
      },
    ],
  })

  if (!event) {
    return res.status(404).json({message: "not found"})
  }
  
  if (event.workspaceId !== req.jwtPayload.workspace_id) {
    return res.status(403).json({message: "not auth"})
  }

  res.status(200).json({event})
})

router.put("/:event_id", auth, async (req, res) => {
  const { event_id } = req.params
  const { description, title } = req.body

  const event = await Event.findByPk(event_id)

  if (event.userId !== parseInt(req.jwtPayload.user_id)) {
    return res.status(403).json({message: "not auth"})
  }

  event.description = description
  event.title = title
  try {
    await event.save()
    res.status(200).json({event})
  } catch (error) {
    res.status(500).json({error})
  }
})

router.delete("/:event_id", async (req, res) => {
  const { event_id } = req.params
  const event = await Event.findByPk(event_id)

  if (event.userId !== parseInt(req.jwtPayload.user_id)) {
    return res.status(403).json({message: "not auth"})
  }

  try {
    await event.destroy()
    res.status(200).json({event})
  } catch (error) {
    res.status(500).json({error})
  }
})

module.exports = router;