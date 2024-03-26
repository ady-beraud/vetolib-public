const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class UserModel {
  async create(data) {
    try {
      const statement = pgp.helpers.insert(data, null, "users") + "RETURNING *";
      const result = await db.query(statement);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async update(data) {
    try {
      const { id, ...params } = data;
      const condition = pgp.as.format("WHERE id = ${id} RETURNING *", { id });
      const statement = pgp.helpers.update(params, null, "users") + condition;
      const result = db.query(statement);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async findOneByEmail(email) {
    try {
      const statement = "SELECT * FROM users WHERE email = $1";
      const value = [email];
      const result = await db.query(statement, value);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id) {
    try {
      const statement = "SELECT * FROM users WHERE id = $1";
      const value = [id];
      const result = await db.query(statement, value);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async findOneByGoogleId(id) {
    try {
      const statement = "SELECT * FROM users WHERE google_id = $1";
      const value = [id];
      const result = await db.query(statement, value);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async newAnimal(data) {
    try {
      const { newValue, id } = data;
      const statement =
        "UPDATE users SET animals = array_append(animals, $1) WHERE id = $2";
      const value = [newValue, id];
      await db.query(statement, value);
      const updatedData = await db.query(
        "SELECT animals FROM users WHERE id = $1",
        [id]
      );
      if (updatedData.rows?.length) {
        return updatedData.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async allInfo(id) {
    try {
      const statement = "SELECT animals, telephone FROM users WHERE id = $1";
      const value = [id];
      const result = await db.query(statement, value);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async newPhone(data) {
    try {
      const { newValue, id } = data;
      const statement = "UPDATE users SET telephone = $1 WHERE id = $2";
      const value = [newValue, id];
      await db.query(statement, value);
      const updatedData = await db.query(
        "SELECT telephone FROM users WHERE id = $1",
        [id]
      );
      if (updatedData.rows?.length) {
        return updatedData.rows[0];
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
};
