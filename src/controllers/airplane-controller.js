const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger-config");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index");

const { AirplaneService } = require("../services/index");
const { Error } = require("sequelize");
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

// GET : /airplane/:id
// req-body: {}
async function getAirplane(req, res) {
  try {
    const airplane = await AirplaneService.getAirplaneById(req.params.id);
    if (airplane.statusCode === StatusCodes.NOT_FOUND) {
      return new AppError(
        "Airplane requested not found",
        StatusCodes.NOT_FOUND
      );
    }
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

// DELETE : /airplane/:id
// req-body: {}
async function destroyAirplane(req, res) {
  try {
    const airplane = await AirplaneService.destroyAirplaneById(req.params.id);
    SuccessResponse.message = "Airplane deleted successfully";
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

// PATCH : /airplane/:id
// req-body: { modelNumber, capacity }
async function updateAirplane(req, res) {
  try {
    const airplane = await AirplaneService.updateAirplaneById(
      req.params.id,
      req.body
    );
    SuccessResponse.message = "Airplane updated successfully";
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane,
};
