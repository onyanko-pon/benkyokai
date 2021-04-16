const fetch = require('node-fetch')

exports.postMessage = async (channel, text, token = process.env.BOT_BEAR_TOKEN) => {
  const as_user = true
  fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BOT_BEAR_TOKEN}`
    },
    body: JSON.stringify({channel, text, as_user, token})
  }).then(e => console.log(`message send ${text} to ${channel}`))
}