const express = require("express");

const v1Routes = require("./v1/index");

const v2Routes = require("./v2/index")

const router = express.Router();


router.use('/v2' , v2Routes)

router.use('/v1', v1Routes);

module.exports = router;