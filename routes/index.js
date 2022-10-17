const express = require("express");
const authRouter = require("./Auth/auth.routers");

const indexRouter = new express.Router();

indexRouter.use("/auth", authRouter);

module.exports = indexRouter;
