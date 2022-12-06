import { Request, Response } from "express";
import { pool as db } from "../config/pgDBCon";
import {
  createCardQuery,
  deleteCardQuery,
  getAllCardsQuery,
  getCardQuery,
  updateCardQuery,
} from "../helpers/pgCardQueries";

export class CardPG {
  constructor() {}

  async getAllItems(req: Request, res: Response) {
    const cards = await db.query(getAllCardsQuery);
    if (!cards.rowCount) return res.json({ message: "No cards found" });
    res.json(cards.rows);
  }

  async createItem(req: Request, res: Response) {
    const { name, description, estimate, status, due_date, labels, board_id } =
      req.body;
    if (!req?.body)
      return res.status(400).json({ message: "Card details are required." });
    await db.query(createCardQuery, [
      name,
      description,
      estimate,
      status,
      due_date,
      labels,
      board_id,
    ]);
    res.json({
      message: `Card with name "${name}", description "${description}", estimate "${estimate}", status "${status}", due_date "${due_date}", labels "${labels}" and board_id "${board_id}" has been created.`,
    });
  }

  async updateItem(req: Request, res: Response) {
    const { cardId } = req.params;
    if (!cardId)
      return res.status(400).json({ message: "Card ID is required." });
    const { name, description, estimate, status, due_date, labels, board_id } =
      req.body;
    await db.query(updateCardQuery, [
      name,
      board_id,
      description,
      estimate,
      status,
      due_date,
      labels,
      cardId,
    ]);
    res.json({ message: `Card ${cardId} has been updated.` });
  }

  async deleteItem(req: Request, res: Response) {
    const { cardId } = req.params;
    if (!cardId)
      return res.status(400).json({ message: "Card ID is required." });
    await db.query(deleteCardQuery, [cardId]);
    res.json({ message: `Card ${cardId} has been deleted.` });
  }

  async getItem(req: Request, res: Response) {
    const { cardId } = req.params;
    if (!cardId)
      return res.status(400).json({ message: "Card ID is required." });
    const card = await db.query(getCardQuery, [cardId]);
    res.json(card.rows[0]);
  }
  // TODO
  // async getItemsByItem(req: Request, res: Response) {
  //   const { boardId } = req.params;
  //   const cards = await db.query(getAllCardsByBoardQuery, [boardId]);
  //   res.json(cards.rows);
  // }
}
