const bcrypt = require("bcrypt");

const passwordHash = async (password, saltRounds) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch(err) {
    console.log(err);
  }
  return null;
}

module.exports = passwordHash;