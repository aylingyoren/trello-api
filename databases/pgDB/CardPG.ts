import { Request, Response } from "express";
import { Card } from "./model/pgCardModel";

export class CardPG {
  constructor() {}

  async getAllItems(req: Request, res: Response) {
    const cards = await Card.findAll();
    if (cards.length <= 0) return res.json({ message: "No cards found" });
    res.json(cards);
  }

  async createItem(req: Request, res: Response) {
    const { name, description, estimate, status, due_date, labels } = req.body;
    if (!req?.body)
      return res.status(400).json({ message: "Card details are required." });
    await Card.create({
      name,
      description,
      estimate,
      status,
      due_date,
      labels,
    });
    res.json({
      message: `Card with name "${name}" has been created.`,
    });
  }

  async updateItem(req: Request, res: Response) {
    const { cardId } = req.params;
    if (!cardId)
      return res.status(400).json({ message: "Card ID is required." });
    const { name, description, estimate, status, due_date, labels, boardId } =
      req.body;
    await Card.update(
      { name, description, estimate, status, due_date, labels, boardId },
      { where: { id: cardId } }
    );
    res.json({ message: `Card ${cardId} has been updated.` });
  }

  async deleteItem(req: Request, res: Response) {
    const { cardId } = req.params;
    if (!cardId)
      return res.status(400).json({ message: "Card ID is required." });
    await Card.destroy({ where: { id: cardId } });
    res.json({ message: `Card ${cardId} has been deleted.` });
  }

  async getItem(req: Request, res: Response) {
    const { cardId } = req.params;
    if (!cardId)
      return res.status(400).json({ message: "Card ID is required." });
    const card = await Card.findOne({ where: { id: cardId } });
    if (!card) return res.json({ message: `No card with id ${cardId} found.` });
    res.json(card);
  }
  // TODO
  // async getItemsByItem(req: Request, res: Response) {
  //   const { boardId } = req.params;
  //   const cards = await db.query(getAllCardsByBoardQuery, [boardId]);
  //   res.json(cards.rows);
  // }
}
