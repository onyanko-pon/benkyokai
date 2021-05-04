const jwt = require('jsonwebtoken')

// TODO next()を用いたスマートなやり方模索
module.exports = (req, res, next) => {
  console.log({message: "cookie", cookie: req.cookies})
  const token = req.cookies.token;
  if (token === undefined || token === "") {
    return res.status(403).json({message: "token not set", cookie: req.cookies})
  }

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, function(err, payload) {
    if (err) {
      return res.status(403).json({err})
    }
    req.jwtPayload = payload
    next()
  })
}