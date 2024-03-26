const express = require("express");
const router = express.Router();

const SearchService = require("../services/searchService");
const SearchServiceInstance = new SearchService();

module.exports = (app) => {
  app.use("/api/search", router);

  router.get("/", async (req, res) => {
    try {
      if (req.query.searchTerm) {
        const { searchTerm } = req.query;

        const response = await SearchServiceInstance.search(searchTerm);

        res.status(200).send(response);
      } else if (req.query.searchProposition) {
        const { searchProposition } = req.query;

        const response = await SearchServiceInstance.propositions(
          searchProposition
        );

        res.status(200).send(response);
      } else if (req.query.searchJob) {
        const { searchJob } = req.query;

        const response = await SearchServiceInstance.searchByJob(searchJob);

        res.status(200).send(response);
      } else if (req.query.searchProfile) {
        const { searchProfile } = req.query;

        const response = await SearchServiceInstance.searchByProfile(
          searchProfile
        );

        res.status(200).send(response);
      }
    } catch (err) {
      console.error("Search error:", err);
      res.status(500).send("Error during search");
    }
  });

  router.get("/all", async (req, res) => {
    try {
      const response = await SearchServiceInstance.searchAll();

      res.status(200).send(response);
    } catch (err) {
      throw err;
    }
  });
};
