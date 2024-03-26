const authRouter = require("./auth");
const searchRouter = require("./search");
const userRouter = require("./user");
const appointmentRouter = require("./appointments");
const testRouter = require("./test");

module.exports = (app, passport) => {
  authRouter(app, passport);
  searchRouter(app);
  userRouter(app);
  appointmentRouter(app);
  testRouter(app);
};
