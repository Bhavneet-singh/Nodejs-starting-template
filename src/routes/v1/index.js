const express = require("express");

const router = express.Router();

const {InfoController} = require("../../controllers");

router.use('/info', InfoController);

module.exports = router;