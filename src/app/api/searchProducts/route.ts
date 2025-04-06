import pool from "@/app/db/pgsql/connectdb";
import { NextRequest, NextResponse } from "next/server";

type product = {
  product_id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  discount: number;
  sizes: Array<string>;
  colors: Array<string>;
  description: string;
};

export async function GET() {
  const queryText = `SELECT * FROM products`;

  const db_products = await pool.query<product>(queryText);

  return NextResponse.json(db_products.rows);
}

export async function POST(Request: NextRequest) {
  const body: { product_id: string } = await Request.json();
  const queryText = `SELECT * FROM products WHERE product_id = $1`;
  const dbProduct = await pool.query(queryText, [body.product_id]);
  if (dbProduct) return NextResponse.json({ ...dbProduct.rows[0] });
  return NextResponse.json({ error: "404 product not found" });
}
