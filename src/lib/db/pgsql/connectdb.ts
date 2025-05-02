import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.PGDB_CONNECTION_STRING!,
});

pool.on("connect", () => {
  console.log("connected to pgsql");
});

export default pool;
