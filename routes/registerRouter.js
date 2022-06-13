const express = require("express");
const registerRouter = express.Router();
const registerController = require("../controllers/registerController");
const dataValidator = require("../middleware/dataValidator");
const schemas = require("../model/schemas");

registerRouter.post(
  "/",
  dataValidator(schemas.userSchema),
  registerController.handleNewUser
);

module.exports = registerRouter;
