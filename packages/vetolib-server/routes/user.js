const express = require("express");
const router = express.Router();

const UserService = require("../services/userService");
const UserServiceInstance = new UserService();

module.exports = (app) => {
  app.use("/api/user", router);

  router.get("/info/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const response = await UserServiceInstance.getUserInfo({ id: userId });
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const response = await UserServiceInstance.get({ id: userId });
      res.status(200).send(response);
    } catch (err) {
      throw err;
    }
  });

  router.put("/animals", async (req, res) => {
    try {
      const data = req.body;
      const response = await UserServiceInstance.createAnimal(data);
      res.status(200).send(response);
    } catch (err) {
      throw err;
    }
  });

  router.put("/telephone", async (req, res) => {
    try {
      const data = req.body;
      const response = await UserServiceInstance.createPhone(data);
      res.status(200).send(response);
    } catch (err) {
      throw err;
    }
  });

  router.put("/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const data = req.body;
      const response = await UserServiceInstance.update({
        id: userId,
        ...data,
      });
      res.status(200).send(response);
    } catch (err) {
      throw err;
    }
  });
};
