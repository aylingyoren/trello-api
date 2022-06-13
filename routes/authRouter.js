const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const dataValidator = require("../middleware/dataValidator");
const schemas = require("../model/schemas");

authRouter.post(
  "/",
  dataValidator(schemas.userSchema),
  authController.handleLogin
);

module.exports = authRouter;
