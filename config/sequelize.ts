import { Sequelize } from "sequelize";
import logger from "./logger";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "trello_postgres",
  username: "postgres",
  password: process.env.POSTGRES_PASS,
  logging: (msg) => logger.info(msg),
});

sequelize
  .authenticate()
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

export { sequelize };
