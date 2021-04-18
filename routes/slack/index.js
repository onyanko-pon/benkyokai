const express = require('express');
const router = express.Router();

const eventRouter = require("./event")
router.use("/events", eventRouter)

const userRouter = require('./user')
router.use("/users", userRouter)

const workspaceRouter = require('./workspace')
router.use("/workspaces", workspaceRouter)

module.exports = router;
