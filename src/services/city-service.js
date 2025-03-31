const logger = require("../config/logger-config");
const { CityRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/errors/index");
const { city } = require("../models");
const { ErrorResponse } = require("../utils/common");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const newCity = await cityRepository.create(data);
    return newCity;
  } catch (error) {
    console.log(error);
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explantion = [];
      error.errors.forEach((err) => {
        explantion.push(err.message);
      });
      throw new AppError(explantion, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteCity(id) {
  try {
    const city = await cityRepository.destroy(id);
    return city;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explantion = [];
      error.errors.forEach((err) => {
        explantion.push(err.message);
      });
      throw new AppError(explantion, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot delete a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    console.log(id, data);
    const city = await cityRepository.update(id, {
      name: data,
    });
    return city;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explantion = [];
      error.errors.forEach((err) => {
        explantion.push(err.message);
      });
      throw new AppError(explantion, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot update a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
  deleteCity,
  updateCity,
};
