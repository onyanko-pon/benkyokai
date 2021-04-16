const chat = require('./chat')
const Event = require('./models/Event')

// exports.createEvent = async (payload) => {
//   const {type, token, team, user, callback_id, trigger_id} = payload
//
//   try {
//     await Event.create({
//       title: "イベントタイトル",
//       description: "説明を記述してください",
//       userId: user.id
//     })
//     // console.log("events", events)
//   } catch (e) {
//     console.log("error", e)
//   }
//   chat.postMessage(user.id, `勉強会が作成されました`)
// }