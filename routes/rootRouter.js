const express = require("express");
const rootRouter = express.Router();
const logger = require("../config/logger");

rootRouter.get("/", (req, res) => {
  try {
    res.send(`<h1>Main Page</h1>`);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
});

module.exports = rootRouter;
