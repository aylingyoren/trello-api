import { UserDatabase, UserDBType } from "./UserDatabase";
import { Database, DBType } from "./Database";
import { UserMongoDB } from "../databases/mongoDB/UserMongoDB";
import { BoardMongoDB } from "../databases/mongoDB/BoardMongoDB";
import { CardMongoDB } from "../databases/mongoDB/CardMongoDB";
import { UserPG } from "../databases/pgDB/UserPG";
import { BoardPG } from "../databases/pgDB/BoardPG";
import { CardPG } from "../databases/pgDB/CardPG";
import { UserFileDB } from "../databases/fileDB/UserFileDB";
import { BoardFileDB } from "../databases/fileDB/BoardFileDB";
import { CardFileDB } from "../databases/fileDB/CardFileDB";

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
