const express = require('express');
const router = express.Router();

const eventRouter = require("./event")
router.use("/events", eventRouter)

const workspaceRouter = require('./workspace')
router.use("/workspaces", workspaceRouter)

const userRouter = require('./user')
router.use("/users", userRouter)

module.exports = router;
