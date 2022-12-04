import express from "express";
const boardsRouter = express.Router();
import {
  getAllBoards,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoard,
} from "../../controllers/boardController";
import { ROLES } from "../../config/roles";
import verifyRoles from "../../middleware/verifyRoles";
import dataValidator from "../../middleware/dataValidator";
import { BoardSchema } from "../../databases/schemas";

boardsRouter
  .route("/")
  .get(getAllBoards)
  .post(verifyRoles(ROLES.ADMIN), dataValidator(BoardSchema), createBoard);

boardsRouter
  .route("/:boardId")
  .get(getBoard)
  .put(verifyRoles(ROLES.ADMIN), updateBoard)
  .delete(verifyRoles(ROLES.ADMIN), deleteBoard);

export default boardsRouter;
