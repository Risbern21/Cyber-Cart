import pool from "@/lib/db/pgsql/connectdb";

export async function createWishlistTable() {
  const queryText = `CREATE TABLE IF NOT EXISTS wishlist(
    customer_id VARCHAR,
    wishlist_id SERIAL NOT NULL PRIMARY KEY,
    product_ids VARCHAR[],
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(customer_id)
)`;

  try {
    pool.query(queryText);
    console.log("created wishlist table");
  } catch (error) {
    console.log("error occurred :", error);
  }
}

export default createWishlistTable;