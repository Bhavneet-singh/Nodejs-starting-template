const express = require("express");

const { AirplaneController } = require("../../controllers/index");

const router = express.Router();

const { AirplaneMiddlewares } = require("../../middlewares/index");

//appi/vi/airplane POST
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest, // MidddleWare using

  AirplaneController.createAirplane
);

router.get("/", AirplaneController.getAirplanes);

module.exports = router;
