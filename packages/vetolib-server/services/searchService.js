const createError = require("http-errors");
const SearchModel = require("../models/search");
const SearchModelInstance = new SearchModel();

module.exports = class SearchService {
  async search(data) {
    try {
      const searchResults = await SearchModelInstance.findProfessionals(data);
      return searchResults;
    } catch (err) {
      console.log(err);
      createError(500, err);
    }
  }

  async propositions(data) {
    try {
      const searchPropositions = await SearchModelInstance.findPropositions(
        data
      );
      return searchPropositions;
    } catch (err) {
      console.log(err);
      createError(500, err);
    }
  }

  async searchByJob(data) {
    try {
      const searchResults = await SearchModelInstance.findByJob(data);
      return searchResults;
    } catch (err) {
      createError(500, err);
    }
  }

  async searchByProfile(data) {
    try {
      const searchResults = await SearchModelInstance.findByProfile(data);
      return searchResults;
    } catch (err) {
      createError(500, err);
    }
  }

  async searchAll() {
    try {
      const searchResults = await SearchModelInstance.findAll();
      return searchResults;
    } catch (err) {
      createError(500, err);
    }
  }
};
