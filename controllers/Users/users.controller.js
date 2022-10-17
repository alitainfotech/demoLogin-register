const {
  RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
  RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
  NULL,
  RESPONSE_PAYLOAD_STATUS_ERROR,
} = require("../../constants/global.constants");
const { Users } = require("../../models/Users.model");

const addToken = async (token, id) => {
  try {
    return Users.update(
      {
        token: token,
      },
      {
        where: {
          id,
        },
      }
    );
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
  addToken,
};
