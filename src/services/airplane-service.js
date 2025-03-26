const logger = require("../config/logger-config");
const { AirplaneRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/errors/index");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    console.log(data);
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

module.exports = {
  createAirplane,
  getAirplanes,
};
