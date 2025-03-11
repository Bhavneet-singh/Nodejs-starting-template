const express = require("express");
const apiRoutes = require("./routes/index.js");
const { ServerConfig, Logger } = require("./config/index.js");

const app = express();

app.use("/api", apiRoutes);

app.listen(ServerConfig.port, () => {
  console.log(`Server is running on port ${ServerConfig.port}`);
  Logger.info("Suceessfully started the server", "root", {});
});
