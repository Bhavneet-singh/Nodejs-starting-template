const express = require("express");

const { AirplaneController } = require("../../controllers/index");

const router = express.Router();

const { AirplaneMiddlewares } = require("../../middlewares/index");

//api/vi/airplane POST
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest, // MidddleWare using

  AirplaneController.createAirplane
);

//api/vi/airplane GET
router.get("/", AirplaneController.getAirplanes);

//api/vi/airplane/:id GET
router.get("/:id", AirplaneController.getAirplane);

//api/vi/airplane/:id DELETE
router.delete("/:id", AirplaneController.destroyAirplane);

//api/v1/airplanes/:id PATCH
router.patch("/:id", AirplaneController.updateAirplane);

module.exports = router;
z