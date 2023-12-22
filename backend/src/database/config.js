import { config } from "dotenv";
config();

export default {
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT
};
