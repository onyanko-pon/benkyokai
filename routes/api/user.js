const express = require('express');
const router = express.Router();
const auth = require('../../auth')

const { Event, User } = require('../../models')

router.get("/:userId", auth, async (req, res) => {
  const { userId } = req.params
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

  if (user.id !== parseInt(req.jwtPayload.user_id)) {
    return res.status(403).json({message: "not auth"})
  }

  res.status(200).json({user})
})

module.exports = router;