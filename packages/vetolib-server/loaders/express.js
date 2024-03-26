const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { SESSION_SECRET, VETOLIB_FRONT_URL } = require("../config");

const corsOptions = {
  origin: VETOLIB_FRONT_URL,
  credentials: true,
};

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: "lax",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  return app;
};
