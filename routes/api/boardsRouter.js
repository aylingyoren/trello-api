const express = require("express");
const boardsRouter = express.Router();
const boardController = require("../../controllers/boardController");
const ROLES = require("../../config/roles");
const verifyRoles = require("../../middleware/verifyRoles");
const dataValidator = require("../../middleware/dataValidator");
const schemas = require("../../model/schemas");

boardsRouter
  .route("/")
  .get(boardController.getAllBoards)
  .post(
    verifyRoles(ROLES.ADMIN),
    dataValidator(schemas.boardSchema),
    boardController.createBoard
  );

boardsRouter
  .route("/:boardId")
  .get(boardController.getBoard)
  .put(verifyRoles(ROLES.ADMIN), boardController.updateBoard)
  .delete(verifyRoles(ROLES.ADMIN), boardController.deleteBoard);

module.exports = boardsRouter;
