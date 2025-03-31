const express = require("express");

const { CityController } = require("../../controllers");

const router = express.Router();

// /api/v1/cities POST
router.post("/", CityController.createCity);

// /api/v1/cities DELETE
router.delete("/:id", CityController.deleteCity);

// /api/v1/cities PATCH
router.patch("/:id", CityController.updateCity);

module.exports = router;
