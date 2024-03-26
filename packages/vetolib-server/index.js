const express = require("express");
const app = express();
const loaders = require("./loaders");

require("dotenv").config();

const { PORT } = require("./config");
const db = require("./db");

async function startServer() {
  await loaders(app);
  await db;
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
}

startServer();
