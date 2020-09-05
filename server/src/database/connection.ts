import knex from "knex";
import path from "path";
import { attachPaginate } from "knex-paginate";

attachPaginate();

const db = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "database.sqlite"),
  },
  useNullAsDefault: true,
});

export default db;
