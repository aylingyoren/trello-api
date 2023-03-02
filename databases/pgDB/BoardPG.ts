import { Request, Response } from "express";
import { Board } from "./model/pgBoardModel";

export class BoardPG {
  constructor() {}

  async getAllItems(req: Request, res: Response) {
    const boards = await Board.findAll();
    if (boards.length <= 0) return res.json({ message: "No boards found" });
    res.json(boards);
  }

  async createItem(req: Request, res: Response) {
    const { name, color, description } = req.body;
    if (!name && !color && !description)
      return res.status(400).json({ message: "Board details are required." });
    await Board.create({ name, color, description });
    res.status(201).json({
      message: `New board with name "${name}" has been created.`,
    });
  }

  async updateItem(req: Request, res: Response) {
    const { boardId } = req.params;
    if (!boardId)
      return res.status(400).json({ message: "Board ID is required." });
    const { name, color, description } = req.body;
    await Board.update(
      { name, color, description },
      { where: { id: boardId } }
    );
    res.json({ message: `Board ${boardId} has been updated.` });
  }

  async deleteItem(req: Request, res: Response) {
    const { boardId } = req.params;
    if (!boardId)
      return res.status(400).json({ message: "Board ID is required." });
    await Board.destroy({ where: { id: boardId } });
    res.json({ message: `Board ${boardId} has been deleted.` });
  }

  async getItem(req: Request, res: Response) {
    const { boardId } = req.params;
    if (!boardId)
      return res.status(400).json({ message: "Board ID is required." });
    const board = await Board.findOne({ where: { id: boardId } });
    if (!board)
      return res.json({ message: `No board with id ${boardId} found` });
    res.json(board);
  }
}
