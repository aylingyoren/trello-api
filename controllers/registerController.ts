import { Request, Response } from "express";
import fs from "fs";
const fsPromises = fs.promises;
import path from "path";
import bcrypt from "bcrypt";
let users = require("../model/users.json");
import ROLES from "../config/roles";
import logger from "../config/logger";
import { User } from "../types/User";

const setUsers = (data: User[]) => (users = data);

const handleNewUser = async (req: Request, res: Response) => {
  const { name, pwd } = req.body;
  const duplicate: User = users.find(({ userName }) => userName === name);
  if (duplicate)
    return res.status(409).json({ message: `User ${name} already exists.` });
  try {
    const hashedPwd: string = await bcrypt.hash(pwd, 10);
    const newUser: User = {
      userName: name,
      roles: { User: ROLES.USER },
      password: hashedPwd,
    };
    setUsers([...users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(users)
    );
    res.status(201).json({ success: `New user ${name} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export default handleNewUser;
