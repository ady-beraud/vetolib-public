const createError = require("http-errors");
const passwordHash = require("../bcrypt");
const bcrypt = require("bcrypt");

const UserModel = require("../models/user");
const UserModelInstance = new UserModel();

module.exports = class AuthService {
  async register(data) {
    try {
      const { email } = data;
      const user = await UserModelInstance.findOneByEmail(email);
      if (user) {
        throw createError(409, "Email already in use");
      }
      const hash = await passwordHash(data.password, 5);
      data.password = hash;
      return await UserModelInstance.create(data);
    } catch (err) {
      throw createError(500, err);
    }
  }

  async login(data) {
    try {
      const { email, password } = data;
      const user = await UserModelInstance.findOneByEmail(email);
      if (!user) {
        throw createError(401, "Incorrect username or password");
      }
      const matchFound = await bcrypt.compare(password, user.password);
      if (!matchFound) {
        throw createError(401, "Incorrect username or password");
      }
      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }

  async googleLogin(profile) {
    try {
      const { id, displayName } = profile;

      const user = await UserModelInstance.findOneByGoogleId(id);
      if (!user) {
        return await UserModelInstance.create({
          google_id: id,
          google_name: displayName,
        });
      }
      return user;
    } catch (err) {
      console.log(err);
      throw createError(500, err);
    }
  }
};
