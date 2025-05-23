import pool from "@/lib/db/pgsql/connectdb";

const createCartTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS cart(
    customer_id INT,
    cart_id SERIAL NOT NULL PRIMARY KEY,
    total INT,
    product_ids VARCHAR[],
    quantity INT[],
    subTotal INT NOT NULl,
    isPaid BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
)`;

  try {
    pool.query(queryText);
    console.log("cart table created successfully");
  } catch (error) {
    console.log("error occurred : ", error);
  }
};

export default createCartTable;
