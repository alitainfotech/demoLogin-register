var express = require("express");
const { login, register } = require("../../controllers/Auth/auth.controller");
const validateApi = require("../../middlewares/validator");
const {
  loginValidationRules,
  registerValidationRules,
} = require("../../validation_rules/auth.validation");
var authRouter = new express.Router();

/* Register */
authRouter.post("/login", loginValidationRules(), validateApi, login);

/*Login */
authRouter.post("/register", registerValidationRules(), validateApi, register);

module.exports = authRouter;
