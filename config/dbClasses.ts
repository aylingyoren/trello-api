import { UserDatabase, UserDBType } from "./UserDatabase";
import { Database, DBType } from "./Database";
import { UserMongoDB } from "../databases/UserMongoDB";
import { BoardMongoDB } from "../databases/BoardMongoDB";
import { CardMongoDB } from "../databases/CardMongoDB";
import { UserPG } from "../databases/UserPG";
import { BoardPG } from "../databases/BoardPG";
import { CardPG } from "../databases/CardPG";
import { UserFileDB } from "../databases/UserFileDB";
import { BoardFileDB } from "../databases/BoardFileDB";
import { CardFileDB } from "../databases/CardFileDB";

let userDbClass: UserDBType;
let boardDbClass: DBType;
let cardDbClass: DBType;

switch (process.env.DATABASE) {
  case "MONGO":
    userDbClass = new UserDatabase(new UserMongoDB());
    boardDbClass = new Database(new BoardMongoDB());
    cardDbClass = new Database(new CardMongoDB());
    break;
  case "POSTGRES":
    userDbClass = new UserDatabase(new UserPG());
    boardDbClass = new Database(new BoardPG());
    cardDbClass = new Database(new CardPG());
    break;
  case "FILE":
    userDbClass = new UserDatabase(new UserFileDB());
    boardDbClass = new Database(new BoardFileDB());
    cardDbClass = new Database(new CardFileDB());
    break;
  default:
    throw new Error("Something went wrong with env");
}

export { userDbClass, boardDbClass, cardDbClass };
