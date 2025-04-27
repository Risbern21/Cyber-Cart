import pool from "../config/pgdb.js";

export const getCartByIdSerivce = async (customer_id) => {
  const queryText = `SELECT SUM("productPrice") from products WHERE product_id = ANY(
    SELECT unnest(product_ids) FROM cart WHERE customer_id = $1
        )`;

  const result = await pool.query(queryText, [customer_id]);
  return result.rows[0];
};
