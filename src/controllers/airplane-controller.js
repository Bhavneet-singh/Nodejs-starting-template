const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger-config");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index");

const { AirplaneService } = require("../services/index");
// console.log("Contents of services module:", services); // Log the contents of the services module

async function createAirplane(req, res) {
  try {
    // Log the incoming
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.message = "Airplane created successfully";
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    logger.error("Something went wrong while creating airplane", error);
    // Log the detailed error
    ErrorResponse.message = "Something went wrong while creating airplane";
    ErrorResponse.error = { explanation: error.message };
    return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
  }
}

 async function getAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAirplanes();
    if (!airplanes) {
      ErrorResponse.message = "No airplanes found";
      return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }
    return res.status(StatusCodes.OK).json(airplanes);
  } catch (error) {
    logger.error("Something went wrong while fetching airplanes", error);
    ErrorResponse.message = "Something went wrong while fetching airplanes";
    ErrorResponse.error = { explanation: error.message };
    return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
};
