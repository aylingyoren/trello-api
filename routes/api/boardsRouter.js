const express = require("express");
const boardsRouter = express.Router();
const boardController = require("../../controllers/boardController");
const cardController = require("../../controllers/cardController");
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

//.../boards/2/cards/1
boardsRouter
  .route("/:boardId")
  .get(boardController.getBoard)
  .put(verifyRoles(ROLES_LIST.Admin), boardController.updateBoard)
  .delete(verifyRoles(ROLES_LIST.Admin), boardController.deleteBoard);

boardsRouter
  .route("/:boardId/cards")
  .get(cardController.getAllCards)
  .post(
    verifyRoles(ROLES_LIST.Admin),
    dataValidator(schemas.cardSchema),
    cardController.createCard
  );

boardsRouter
  .route("/:boardId/cards/:cardId")
  .get(cardController.getCard)
  .put(verifyRoles(ROLES_LIST.Admin), cardController.updateCard)
  .delete(verifyRoles(ROLES_LIST.Admin), cardController.deleteCard);

module.exports = boardsRouter;
