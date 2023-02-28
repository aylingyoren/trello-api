import { Request, Response } from "express";
import _ from "lodash";

let boards = require("./mockDB/boardsDB.json");

interface BoardI {
  id: number;
  name: string;
  color: string;
  description: string;
  createdAt: Date;
}

const setBoards = (data: BoardI[]) => (boards = data);

export class BoardFileDB {
  constructor() {}

  async getAllItems(req: Request, res: Response) {
    if (!boards) return res.status(400).json({ message: "No boards found" });
    res.json(boards);
  }

  async createItem(req: Request, res: Response) {
    if (!req?.body)
      return res.status(400).json({ message: "Board details are required." });
    const lastBoard: BoardI = boards[boards.length - 1];
    const { name, color, description } = req.body;
    const newBoard = {
      id: _.isEmpty(boards) ? 1 : lastBoard.id + 1,
      name,
      color,
      description,
      createdAt: new Date().toISOString(),
    };
    setBoards([...boards, newBoard]);
    res.status(201).json(newBoard);
  }

  async updateItem(req: Request, res: Response) {
    const { boardId } = req.params;
    const board: BoardI = boards.find(({ id }) => id === Number(boardId));
    if (!board) {
      return res.status(400).json({ message: `Board ID ${boardId} not found` });
    }
    const { name, color, description } = req.body;
    if (name) board.name = name;
    if (color) board.color = color;
    if (description) board.description = description;
    const filteredArray: BoardI[] = boards.filter(
      ({ id }) => id !== Number(boardId)
    );
    const unsortedArray: BoardI[] = [...filteredArray, board];
    setBoards(
      unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    );
    res.json(board);
  }

  async deleteItem(req: Request, res: Response) {
    const { boardId } = req.params;
    const board: BoardI = boards.find(({ id }) => id === Number(boardId));
    if (!board) {
      return res.status(400).json({ message: `Board ID ${boardId} not found` });
    }
    const filteredArray: BoardI[] = boards.filter(({ id }) => id !== board.id);
    setBoards([...filteredArray]);
    res.json(board);
  }

  async getItem(req: Request, res: Response) {
    const { boardId } = req.params;
    const board: BoardI = boards.find(({ id }) => id === Number(boardId));
    if (!board) {
      return res.status(400).json({ message: `Board ID ${boardId} not found` });
    }
    res.json(board);
  }
}
