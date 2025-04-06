import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/db/pgsql/connectdb";

export async function GET(Request: NextRequest) {
  const { searchParams } = new URL(Request.url);
  const customer_id = searchParams.get("customer_id");

  const queryText = "SELECT * FROM wishlist WHERE customer_id = $1";

  const wishlistProducts = await pool.query(queryText, [customer_id]);
  return NextResponse.json({ ...wishlistProducts.rows });
}
