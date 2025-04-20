import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: String(process.env.PGDB_USER),
  host: String(process.env.PGDB_HOST),
  database: String(process.env.PGDB_NAME),
  password: String(process.env.PGDB_PASSWORD),
  port: Number(process.env.PGDB_PORT),
});

pool.on("connect", () => {
  console.log("connected to pgsql");
});

export default pool;
