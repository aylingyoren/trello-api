const express = require("express");
const boardsRouter = express.Router();
const boardController = require("../../controllers/boardController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const dataValidator = require("../../middleware/dataValidator");
const schemas = require("../../model/schemas");

boardsRouter
  .route("/")
  .get(boardController.getAllBoards)
  .post(
    verifyRoles(ROLES_LIST.Admin),
    dataValidator(schemas.boardSchema),
    boardController.createBoard
  );

boardsRouter
  .route("/:boardId")
  .get(boardController.getBoard)
  .put(verifyRoles(ROLES_LIST.Admin), boardController.updateBoard)
  .delete(verifyRoles(ROLES_LIST.Admin), boardController.deleteBoard);

module.exports = boardsRouter;
