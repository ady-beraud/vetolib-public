const db = require("../db");

module.exports = class SearchModel {
  async findProfessionals(searchTerm) {
    try {
      const statement =
        "SELECT * FROM professionals WHERE unaccent(last_name) ILIKE unaccent($1) OR unaccent(job) ILIKE unaccent($1) OR unaccent(first_name) ILIKE unaccent($1) ORDER BY first_name, last_name, job";
      const value = [`${searchTerm}%`];
      const result = await db.query(statement, value);
      if (result.rows?.length) {
        return result.rows;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findPropositions(searchTerm) {
    try {
      const statement = `
                SELECT job, first_name, last_name, image, id FROM (
                SELECT DISTINCT job, NULL AS first_name, NULL AS last_name, NULL AS image, CAST(NULL AS INTEGER) AS id, 1 AS order_col
                FROM professionals
                WHERE unaccent(job) ILIKE unaccent($1)
        
                 UNION ALL
        
                SELECT job, first_name, last_name, image, id, 2 AS order_col
                FROM professionals
                WHERE unaccent(last_name) ILIKE unaccent($1) 
                OR unaccent(first_name) ILIKE unaccent($1)
                ) AS combined_results
                ORDER BY order_col, job, first_name, last_name
                LIMIT 3;`;

      const value = [`${searchTerm}%`];
      const result = await db.query(statement, value);
      if (result.rows?.length) {
        return result.rows;
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findByJob(searchTerm) {
    try {
      const statement =
        "SELECT * FROM professionals WHERE unaccent(job) = unaccent($1)";
      const value = [`${searchTerm}`];
      const result = await db.query(statement, value);
      if (result.rows?.length) {
        return result.rows;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async findByProfile(searchTerm) {
    try {
      const statement = "SELECT * FROM professionals WHERE id = $1";
      const value = [`${searchTerm}`];
      const result = await db.query(statement, value);
      if (result.rows?.length) {
        return result.rows;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      const statement = "SELECT * FROM professionals";
      const value = [];
      const result = await db.query(statement, value);
      if (result.rows?.length) {
        return result.rows;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
};
