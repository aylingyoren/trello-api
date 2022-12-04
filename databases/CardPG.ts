import { Request, Response } from "express";
import { pool as db } from "../config/pgDBCon";
import {
  createCardQuery,
  deleteCardQuery,
  getAllCardsByBoardQuery,
  getAllCardsQuery,
  getCardQuery,
  updateCardQuery,
} from "../helpers/pgCardQueries";

export class CardPG {
  constructor() {}

  async getAllItems(req: Request, res: Response) {
    const cards = await db.query(getAllCardsQuery);
    if (!cards) return res.status(204).json({ message: "No cards found" });
    res.json(cards.rows);
  }

  async createItem(req: Request, res: Response) {
    if (!req?.body)
      return res.status(400).json({ message: "Card details are required." });
    const { name, description, estimate, status, due_date, labels, board_id } =
      req.body;
    const newCard = await db.query(createCardQuery, [
      name,
      description,
      estimate,
      status,
      due_date,
      labels,
      board_id,
    ]);
    res.json(newCard.rows[0]);
  }

  async updateItem(req: Request, res: Response) {
    const { cardId } = req.params;
    if (!cardId)
      return res.status(400).json({ message: "Card ID is required." });
    const { name, description, estimate, status, due_date, labels, board_id } =
      req.body;
    const card = await db.query(updateCardQuery, [
      name,
      description,
      estimate,
      status,
      due_date,
      labels,
      board_id,
      cardId,
    ]);
    res.json(card.rows[0]);
  }

  async deleteItem(req: Request, res: Response) {
    const { cardId } = req.params;
    if (!cardId)
      return res.status(400).json({ message: "Card ID is required." });
    const card = await db.query(deleteCardQuery, [cardId]);
    res.json(card.rows[0]);
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
