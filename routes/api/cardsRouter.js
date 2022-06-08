const express = require("express");
const cardsRouter = express.Router();
const cardController = require("../../controllers/cardController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const dataValidator = require("../../middleware/dataValidator");
const schemas = require("../../model/schemas");

cardsRouter
  .route("/")
  .get(cardController.getAllCards)
  .post(
    verifyRoles(ROLES_LIST.Admin),
    dataValidator(schemas.cardSchema),
    cardController.createCard
  );

cardsRouter
  .route("/:cardId")
  .get(cardController.getCard)
  .put(verifyRoles(ROLES_LIST.Admin), cardController.updateCard)
  .delete(verifyRoles(ROLES_LIST.Admin), cardController.deleteCard);

module.exports = cardsRouter;
