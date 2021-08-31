var express = require('express');
var router = express.Router();
const userRouter = require('./user.route')

router.use("/api", userRouter);

module.exports = router

