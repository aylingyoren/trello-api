const express = require("express");
const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  try {
    res.send(`<h1>Main Page</h1>`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = rootRouter;
