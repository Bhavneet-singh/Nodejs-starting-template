const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger-config");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index");

const { CityService } = require("../services/index");

async function createCity(req, res) {
  try {
    // Log the incoming
    const city = await CityService.createCity({ name: req.body.name });
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    logger.error("Something went wrong while creating city", error);
    // Log the detailed error
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
};
