const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common/index");

const logger = require("../config/logger-config");

const {AppError} = require('../utils/errors/index')

function validateCreateRequest(req, res, next) {
  const { body } = req;
  if (!body.modelNumber) {
    logger.error("Model Number not found ");
    ErrorResponse.message = "Something went wrong while creating airplane";
    ErrorResponse.error = new AppError(['Model Number not found'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!body.capacity) {
    logger.error("Capacity not found");
    ErrorResponse.message = "Something went wrong while creating airplane";
    ErrorResponse.error = new AppError(['Capacity not found'], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
