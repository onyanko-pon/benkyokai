const jwt = require('jsonwebtoken')

// TODO next()を用いたスマートなやり方模索
module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (token === undefined || token === "") {
    return res.status(403).json({message: "token not set"})
  }

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, function(err, decoded) {
    if (err) {
      return res.status(403).json({err})
    }
  })
}