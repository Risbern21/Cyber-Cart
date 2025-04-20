import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db/pgsql/connectdb";
import { errorInterface } from "@/types";

export async function POST(Request: NextRequest) {
  const body: { customer_id: string } = await Request.json();

  try {
    const queryText =
      "SELECT * FROM products WHERE product_id = ANY(SELECT unnest(product_ids) FROM wishlist WHERE customer_id = $1)";

    const wishlistProducts = await pool.query(queryText, [body.customer_id]);
    return NextResponse.json(wishlistProducts.rows);
  } catch (error) {
    console.error("Error fetching wishlist products:", error);
    return NextResponse.json({ error: "Failed to fetch wishlist products" });
  }
}

export async function PUT(Request: NextRequest) {
  const body: {
    customer_id: string;
    product_id: string;
  } = await Request.json();
  // console.log(body);
  try {
    const result = await pool.query(
      `UPDATE wishlist SET product_ids = array_append(product_ids,$2) WHERE customer_id=$1`,
      [body.customer_id, body.product_id]
    );
    // console.log(result.rows[0]);
    return NextResponse.json({ message: "updated your wishlist" });
  } catch (error) {
    console.log(error);
    return NextResponse.json<errorInterface>({ error: "an error occurred" });
  }
}

export async function GET() {
  const result = await pool.query(`SELECT * FROM wishlist`);
  console.log(result.rows);
  if (result.rows.length > 0) return NextResponse.json(result.rows);
  return NextResponse.json<errorInterface>({ error: "update req" });
}
