const express = require("express");

const router = express.Router();

const { InfoController } = require("../../controllers");

const airplanesRoutes = require("./airplane-routes");

const cityRoutes = require("./city-routes");

router.use("/info", InfoController);

router.use("/airplane", airplanesRoutes);

router.use("/cities", cityRoutes);

module.exports = router;
