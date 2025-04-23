import pkg from 'pg'
import dotenv from 'dotenv'
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PGDB_USER,
  host: process.env.PGDB_HOST,
  database: process.env.PGDB_NAME,
  password: process.env.PGDB_PASSWORD,
  port: process.env.PGDB_PORT,
});

pool.on("connect", () => {
  console.log("connected to pgsql");
});

export default pool;