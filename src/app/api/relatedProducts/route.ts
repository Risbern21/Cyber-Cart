import { ProductInterface } from "../products/route";
import pool from "@/app/db/pgsql/connectdb";
import { NextResponse } from "next/server";
import { QueryResult } from "pg";

type productName = {
  category: string;
};

type card = {
  product_id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  discount: number;
  stars: number;
  reviews: number;
  sizes: Array<string>;
  colors: Array<string>;
  description: string;
};

export async function GET(Request: Request) {
  const { searchParams } = new URL(Request.url);
  const category = searchParams.get("category") as string;

  // console.log(category);

  const queryText = "SELECT * FROM products WHERE category = $1";

  const relatedProducts = await pool.query<ProductInterface>(queryText, [
    category,
  ]);
  // console.log(relatedProducts.rows);
  if (relatedProducts.rows.length > 0) {
    return NextResponse.json(relatedProducts.rows);
  }
  // console.log(relatedProducts.rows);
  return NextResponse.json(null);
}

export async function PUT(Request: Request) {
  const product =
    await pool.query(`CREATE TABLE "wishlist" (customer_id VARCHAR(255),
    product_ids VARCHAR[]`);

  if (product) {
    return Response.json({ ...product.rows });
  } else {
    return Response.json(null);
  }
}
