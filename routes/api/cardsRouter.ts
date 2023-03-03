import express from "express";
const cardsRouter = express.Router();
import {
  getAllCards,
  createCard,
  updateCard,
  deleteCard,
  getCard,
} from "../../controllers/cardController";
import { ROLES } from "../../config/roles";
import verifyRoles from "../../middleware/verifyRoles";
import dataValidator from "../../middleware/dataValidator";
import { CardSchema } from "../../databases/schemas";

cardsRouter
  .route("/")
  .get(getAllCards)
  .post(verifyRoles(ROLES.ADMIN), dataValidator(CardSchema), createCard);

cardsRouter
  .route("/:cardId")
  .get(getCard)
  .put(verifyRoles(ROLES.ADMIN), updateCard)
  .delete(verifyRoles(ROLES.ADMIN), deleteCard);

export default cardsRouter;
