const express = require('express');
const router = express.Router();

const eventRouter = require("./event")
router.use("/events", eventRouter)

const workspaceRouter = require('./workspace')
router.use("/workspaces", workspaceRouter)

module.exports = router;
