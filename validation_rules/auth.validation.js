const { checkSchema } = require("express-validator");

const AUTH_MESSAGES = require("../controllers-messages/Auth/auth.messages");
const { checkUniqueColumn } = require("../helpers/fn");
const { Users } = require("../models/Users.model");

const loginValidationRules = () => {
  return checkSchema({
    email: {
      exists: {
        errorMessage: AUTH_MESSAGES.EMAIL_ERROR_MISSING,
      },
      notEmpty: {
        errorMessage: AUTH_MESSAGES.EMAIL_ERROR_EMPTY,
      },
      isEmail: {
        errorMessage: AUTH_MESSAGES.EMAIL_ERROR_INVALID,
      },
    },

    password: {
      exists: {
        errorMessage: AUTH_MESSAGES.PASSWORD_ERROR_MISSING,
      },
      notEmpty: {
        errorMessage: AUTH_MESSAGES.PASSWORD_ERROR_EMPTY,
      },
    },
  });
};

const registerValidationRules = () => {
  return checkSchema({
    email: {
      exists: {
        errorMessage: AUTH_MESSAGES.EMAIL_ERROR_MISSING,
      },
      notEmpty: {
        errorMessage: AUTH_MESSAGES.EMAIL_ERROR_EMPTY,
      },
      isEmail: {
        errorMessage: AUTH_MESSAGES.EMAIL_ERROR_INVALID,
      },
      custom: {
        options: (value) => {
          return checkUniqueColumn(
            Users,
            "email",
            value,
            "",
            AUTH_MESSAGES.EMAIL_UNIQUE
          );
        },
      },
    },
    password: {
      exists: {
        errorMessage: AUTH_MESSAGES.PASSWORD_ERROR_MISSING,
      },
      notEmpty: {
        errorMessage: AUTH_MESSAGES.PASSWORD_ERROR_EMPTY,
      },
      matches: {
        options: [
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{5,16}$/,
        ],

        errorMessage: `${"Min 5 char long. At least one uppercase. At least one lower case. At least one special character."}`,
      },
    },
  });
};

module.exports = {
  loginValidationRules,
  registerValidationRules,
};
