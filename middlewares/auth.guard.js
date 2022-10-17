const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const { Users } = require("../models/Users.model");
const {
  AUTH_USER_DETAILS,
  RESPONSE_PAYLOAD_STATUS_ERROR,
  RESPONSE_STATUS_MESSAGE_AUTHORIZATION_ERROR,
  NULL,
  RESPONSE_STATUS_CODE_AUTHORIZATION_ERROR,
  RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
  RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
} = require("../constants/global.constants");

/** Authorization middleware to check */

const auth = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const authArray = req.headers.authorization.split(" ");
      if (authArray && authArray.length > 0 && authArray[1]) {
        const token = authArray[1];
        const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

        const userObj = await Users.findOne({
          attributes: ["id", "email"],
          where: {
            id: { [Op.eq]: decodedToken.id },
            email: { [Op.eq]: decodedToken.email },
            type: { [Op.eq]: decodedToken.type },
            token: { [Op.eq]: token },
            status: { [Op.eq]: STATUS_DEFAULT },
            is_deleted: { [Op.eq]: FALSE },
          },
        });
        if (userObj) {
          const user = userObj.toJSON();
          req[AUTH_USER_DETAILS] = user;
          return next();
        } else {
          const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: NULL,
            data: NULL,
            error: RESPONSE_STATUS_MESSAGE_AUTHORIZATION_ERROR,
          };
          return res
            .status(RESPONSE_STATUS_CODE_AUTHORIZATION_ERROR)
            .json(responsePayload);
        }
      } else {
        const responsePayload = {
          status: RESPONSE_PAYLOAD_STATUS_ERROR,
          message: NULL,
          data: NULL,
          error: RESPONSE_STATUS_MESSAGE_AUTHORIZATION_ERROR,
        };
        return res
          .status(RESPONSE_STATUS_CODE_AUTHORIZATION_ERROR)
          .json(responsePayload);
      }
    } else {
      const responsePayload = {
        status: RESPONSE_PAYLOAD_STATUS_ERROR,
        message: NULL,
        data: NULL,
        error: RESPONSE_STATUS_MESSAGE_AUTHORIZATION_ERROR,
      };
      return res
        .status(RESPONSE_STATUS_CODE_AUTHORIZATION_ERROR)
        .json(responsePayload);
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

module.exports = auth;
