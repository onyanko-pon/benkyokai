const express = require('express');
const router = express.Router();
const auth = require('../../auth')

const { Event, User } = require('../../models')

router.put("/", auth, async (req, res) => {
  const userId = req.jwtPayload.user_id
  // TODO 外部キーなど不必要なKeyが変更可能になっているので、制限する
  try {
    const user = req.body.user
    delete user.id
    await User.update(user, {
      where: {
        id: userId
      }
    });
    const newUser = await User.findByPk(userId)
    res.status(200).json({user: newUser})
  } catch (error) {
    res.status(500).json({error})
  }
})

router.get("/detail", auth, async (req, res) => {

  const userId = req.jwtPayload.user_id
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Event,
      },
      {
        model: Event,
        as: 'adminEvent'
      },
    ],
  })

  if (!user) {
    return res.status(404).json({message: "not found"})
  }

  res.status(200).json({user})
})

module.exports = router;