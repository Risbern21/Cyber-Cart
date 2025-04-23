import pool from "../config/db.js";

export const getCartByIdSerivce = async (cart_id) => {
  const queryText = `SELECT total FROM cart WHERE cart_id = $1`;

  const result = await pool.query(queryText, [cart_id]);
  return result.rows[0];
};
