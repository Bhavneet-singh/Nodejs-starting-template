const { where } = require("sequelize");
const logger = require("../config/logger-config"); // Corrected import
const { AppError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      logger.error("Something went wrong in CrudRepository.create()"); // Using logger, not Logger
      throw error;
    }
  }

  // Fix for destroy method which has syntax errors
  async destroy(id) {
    try {
      const response = await this.model.destroy({
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      logger.error("Something went wrong in CrudRepository.destroy()");
      throw error;
    }
  }

  async find(id) {
    try {
      const response = await this.model.findByPk(id); // Corrected method name (findByPk, not findByPK)
      return response;
    } catch (error) {
      logger.error("Something went wrong in CrudRepository.find()");
      throw error;
    }
  }

  async findAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      logger.error("Something went wrong in CrudRepository.findAll()");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      logger.error("Something went wrong in CrudRepository.update()");
      throw error;
    }
  }
}

module.exports = CrudRepository;
