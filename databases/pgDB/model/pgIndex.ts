import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "trello_postgres",
  username: "postgres",
  password: process.env.POSTGRES_PASS,
});

sequelize
  .authenticate()
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

export { sequelize };
