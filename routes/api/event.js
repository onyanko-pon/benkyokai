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

module.exports = router;