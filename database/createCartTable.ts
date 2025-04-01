import pool from "@/app/db/pgsql/connectdb";

const createCartTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS cart(
    customer_id INT,
    cart_id SERIAL NOT NULL PRIMARY KEY,
    products INT[],
    created_at TIMESTAMP DEFAULT NOW()
)`;

  try {
    pool.query(queryText);
    // console.log("cart table created");
  } catch (error) {
    console.log("error occurred : ", error);
  }
};

export default createCartTable;
