import { Pool } from "pg";
export const pool = new Pool({
  user: "postgres",
  password: process.env.POSTGRES_PASS,
  host: "localhost",
  port: 5432,
  database: "trello_postgres",
});
