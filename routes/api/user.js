const express = require('express');
const router = express.Router();
const auth = require('../../auth')

const { Event, User } = require('../../models')

router.get("/detail", auth, async (req, res) => {

  const userId = req.jwtPayload.user_id
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Event,
      },
      {
        model: Event,
        as: 'AdminEvent'
      },
    ],
  })

  if (!user) {
    return res.status(404).json({message: "not found"})
  }

  res.status(200).json({user})
})

module.exports = router;