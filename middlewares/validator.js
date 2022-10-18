const {
  TRUE,
  RESPONSE_PAYLOAD_STATUS_ERROR,
  NULL,
  RESPONSE_STATUS_CODE_VALIDATION_ERROR,
} = require("../constants/global.constants");
const { validationResult } = require("express-validator");

const validateApi = (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    return next();
  }
  const extractedErrors = {};
  error
    .array({ onlyFirstError: TRUE })
    .map((err) => (extractedErrors[err.param] = err.msg));
  const responsePayload = {
    status: RESPONSE_PAYLOAD_STATUS_ERROR,
    message: NULL,
    data: NULL,
    errors: extractedErrors,
  };

  return res
    .status(RESPONSE_STATUS_CODE_VALIDATION_ERROR)
    .json(responsePayload);
};

module.exports = validateApi;
