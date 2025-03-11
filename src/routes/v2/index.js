const express = require("express");

const router = express.Router();

router.get("/info", (req, res) => {
  return res.json({ msg: "from v2 route " });
});

module.exports = router;
