const express = require('express');
const router = express.Router();

const Event = require('../../models/Event')

router.get("/", (req, res) => {
  Event.findAll()
    .then(events => {
      res.status(200).json({events})
    }).catch(error => {
    res.status(500).json({error})
  })
})

router.put("/:event_id", (req, res) => {
  const {event_id} = req.params
  const {description, title} = req.body

  Event.findByPk(event_id)
    .then(async (event) => {
      event.description = description
      event.title = title
      await event.save()
      res.status(200).json({event})
    })
    .catch(error => {
      res.status(500).json({error})
    })
})

router.delete("/:event_id", (req, res) => {
  const {event_id} = req.params
  Event.destroy({
    where: {id: event_id}
  }).then(value => {
    res.status(200).json({value})
  }).catch(error => {
    res.status(500).json({error})
  })
})

module.exports = router;