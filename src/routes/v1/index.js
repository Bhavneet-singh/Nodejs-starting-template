const express = require("express");

const router = express.Router();

const {InfoController} = require("../../controllers");


router.use('/info', InfoController);

router.use('/airplane' , require("./airplane-routes"));

module.exports = router;