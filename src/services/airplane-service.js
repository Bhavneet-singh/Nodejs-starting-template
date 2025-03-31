const logger = require("../config/logger-config");
const { AirplaneRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/errors/index");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    logger.error("Something went wrong while creating airplane", error);
    if (error.name === "SequelizeValidationError") {
      let explanation = error.errors.map((err) => err.message);
      return new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    return new AppError(
      "Something went wrong while creating airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanes() {
  try {
    const airplanes = await airplaneRepository.findAll();
    if (!airplanes) {
      return new AppError("No airplanes found", StatusCodes.NOT_FOUND);
    }
    return airplanes;
  } catch (error) {
    logger.error("Something went wrong while fetching airplanes", error);
    if (error.name === "SequelizeValidationError") {
      let explanation = error.errors.map((err) => err.message);
      return new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    return new AppError(
      "Something went wrong while fetching airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplaneById(id) {
  try {
    const airplane = await airplaneRepository.find(id);
    if (!airplane) {
      throw new AppError("Airplane requested not found", StatusCodes.NOT_FOUND);
    }
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("Airplane requested not found", StatusCodes.NOT_FOUND);
    }

    let explanation =
      error.errors && Array.isArray(error.errors)
        ? error.errors.map((err) => err.message)
        : "An unexpected error occurred";

    throw new AppError(explanation, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function destroyAirplaneById(id) {
  try {
    const response = await airplaneRepository.destroy(id);
    if(!response) {
      throw new AppError("Airplane requested not found", StatusCodes.NOT_FOUND);
    }

    return response;
  } catch (error) {
    throw new AppError(
      error.message || "Something went wrong while deleting airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirplaneById(id, data) {
  try {
    const response = await airplaneRepository.update(id , data) ; 
    if(!response) {
      throw new AppError("Airplane requested not found", StatusCodes.NOT_FOUND);
    }
    return response ;
  } catch (error) {
    throw new AppError(
      error.message || "Something went wrong while updating airplane",
    StatusCodes.INTERNAL_SERVER_ERROR
    );
    
  }}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplaneById,
  destroyAirplaneById,
  updateAirplaneById , 
};
