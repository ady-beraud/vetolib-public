const express = require("express");
const router = express.Router();

module.exports = (app) => {
  app.use("/test", router);

  router.get("/", async (req, res) => {
    try {
      res.status(200).send("yes it is working!");
    } catch (err) {
      throw err;
    }
  });
};
