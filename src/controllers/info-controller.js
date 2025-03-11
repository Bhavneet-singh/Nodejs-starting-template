const { statusCodes } = require("http-status-codes");

const info = (req, res) => {
  return res.status(statusCodes.OK).json({
    sucess: true,
    message: "ok",
    erro: {},
    data: {},
  });
};

module.exports = {
  info,
};
