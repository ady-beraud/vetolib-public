const express = require("express");
const router = express.Router();

const AuthService = require("../services/authService");
const AuthServiceInstance = new AuthService();

const UserService = require("../services/userService");
const UserServiceInstance = new UserService();

const { VETOLIB_FRONT_URL } = require("../config");

module.exports = (app, passport) => {
  app.use("/api/auth", router);

  router.post("/register", async (req, res) => {
    try {
      const data = req.body;
      const response = await AuthServiceInstance.register(data);
      res.status(200).send(response);
    } catch (err) {
      if (err.status === 409) {
        res.status(409).send({ error: err.message });
      } else {
        console.log(err);
      }
    }
  });

  router.post(
    "/login",
    passport.authenticate("local", { keepSessionInfo: true }),
    async (req, res) => {
      try {
        res.status(200).send({ user: req.user });
      } catch (err) {
        console.log(err);
      }
    }
  );

  router.post("/logout", async (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).send("Error during logout");
      }

      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            console.error("Session destruction error on logout:", err);
            return res.status(500).send("Error ending session during logout");
          }
          res.clearCookie("connect.sid");
          return res.status(200).send("User logged out");
        });
      } else {
        return res.status(200).send("User logged out");
      }
    });
  });

  router.get(
    "/google",
    (req, res, next) => {
      const redirectUrl =
        req.query.redirect || `${VETOLIB_FRONT_URL}/account/appointments`;
      res.cookie("redirect_url", redirectUrl, {
        maxAge: 5 * 60 * 1000,
      });
      next();
    },
    passport.authenticate("google", { scope: ["profile"] })
  );

  router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    async (req, res) => {
      const redirectUrl =
        req.cookies.redirect_url || `${VETOLIB_FRONT_URL}/account/appointments`;
      res.clearCookie("redirect_url");
      res.redirect(redirectUrl);
    }
  );

  router.get("/logged_in", async (req, res) => {
    try {
      let { id } = req.query;
      if (req.user) {
        id = req.user.id;
      }
      const user = await UserServiceInstance.get({ id });
      res.status(200).send({
        user,
        loggedIn: true,
      });
    } catch (err) {
      console.log(err);
    }
  });
};
