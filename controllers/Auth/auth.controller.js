const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { Users } = require("../../models/Users.model");
const {
  STATUS_DEFAULT,
  FALSE,
  RESPONSE_PAYLOAD_STATUS_SUCCESS,
  RESPONSE_STATUS_CODE_OK,
  RESPONSE_PAYLOAD_STATUS_ERROR,
  RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
  RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
  RESPONSE_STATUS_MESSAGE_NOT_FOUND,
  NULL,
} = require("../../constants/global.constants");

const authService = require("../../services/auth.service");
const { addToken } = require("../Users/users.controller");
const AUTH_MESSAGES = require("../../controllers-messages/Auth/auth.messages");
dotenv.config();
const saltRounds = process.env.SALT_ROUNDS;

const passwordHash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, parseInt(saltRounds), function (err, hash) {
      if (err) {
        return reject(err);
      }
      return resolve(hash);
    });
  });
};
const loginPasswordHash = (password, hash) => {
  return new Promise((resolve) => {
    bcrypt.compare(password, hash).then((isValid) => {
      if (isValid) {
        return resolve(isValid);
      }
      return resolve(isValid);
    });
  });
};

/**Login API */
const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const userObj = await Users.findOne({
      where: {
        email: email,
        status: STATUS_DEFAULT,
        is_deleted: FALSE,
      },
      attributes: ["id", "email", "password"],
    });
    if (userObj) {
      const userHash = userObj.password;
      const isPasswordValid = await loginPasswordHash(password, userHash);
      if (isPasswordValid) {
        const userJsonObject = userObj.toJSON();
        delete userJsonObject.password;
        const token = authService.generateToken(userJsonObject);
        await addToken(token, userObj.id);
        const responsePayload = {
          status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
          message: AUTH_MESSAGES.LOGIN_SUCCESS,
          data: { token, userObj: userJsonObject },
          error: NULL,
        };
        return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
      } else {
        const responsePayload = {
          status: RESPONSE_PAYLOAD_STATUS_ERROR,
          message: AUTH_MESSAGES.LOGIN_FAILED,
          data: NULL,
          error: AUTH_MESSAGES.INVALID_CREDENTIALS,
        };
        return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
      }
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: AUTH_MESSAGES.LOGIN_FAILED,
        data: NULL,
        error: AUTH_MESSAGES.INVALID_CREDENTIALS,
      };
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    }
  } catch (err) {
    const responsePayload = {
      status: RESPONSE_PAYLOAD_STATUS_ERROR,
      message: AUTH_MESSAGES.LOGIN_FAILED,
      data: NULL,
      error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    };
    return res
      .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
      .json(responsePayload);
  }
};

const register = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await Users.create({
      email,
      password: await passwordHash(password),
    });
    if (user && user.id) {
      const userData = {
        id: user.id,
        email: user.email,
      };
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
        message: AUTH_MESSAGES.REGISTER_SUCCESS,
        data: userData,
        error: NULL,
      };
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: NULL,
        data: NULL,
        error: AUTH_MESSAGES.REGISTER_FAILED,
      };
      return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
    }
  } catch (err) {
    const responsePayload = {
      status: RESPONSE_PAYLOAD_STATUS_ERROR,
      message: NULL,
      data: NULL,
      error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    };
    return res
      .status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR)
      .json(responsePayload);
  }
};

module.exports = {
  login,
  register,
};
