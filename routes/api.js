const express = require('express');
const router = express.Router();

const Event = require('../models/Event')

router.get("/events", (req, res) => {
  Event.findAll()
    .then(events => {
      const event_values = events.map(event => event.dataValues)
      res.status(200).json({events: event_values})
    }).catch(error => {
      res.status(500).json({error})
  })
})

module.exports = router;
