const CrudRepository = require("./crud-repository");
const { Airplane } = require("../models");

const Logger = require("../config/logger-config"); // Corrected import



class AirplaneRepository extends CrudRepository {
  constructor() {
    super(Airplane);
  }
}

module.exports = AirplaneRepository;
