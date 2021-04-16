const express = require('express');
const router = express.Router();

const eventRouter = require("./event")
router.use("/events", eventRouter)

module.exports = router;
