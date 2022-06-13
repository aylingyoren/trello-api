const express = require("express");
const cardsRouter = express.Router();
const cardController = require("../../controllers/cardController");
const ROLES = require("../../config/roles");
const verifyRoles = require("../../middleware/verifyRoles");
const dataValidator = require("../../middleware/dataValidator");
const schemas = require("../../model/schemas");

cardsRouter
  .route("/")
  .get(cardController.getAllCards)
  .post(
    verifyRoles(ROLES.ADMIN),
    dataValidator(schemas.cardSchema),
    cardController.createCard
  );

cardsRouter
  .route("/:cardId")
  .get(cardController.getCard)
  .put(verifyRoles(ROLES.ADMIN), cardController.updateCard)
  .delete(verifyRoles(ROLES.ADMIN), cardController.deleteCard);

module.exports = cardsRouter;
