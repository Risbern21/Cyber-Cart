import { errorInterface, ProductInterface } from "@/types";
import pool from "@/lib/db/pgsql/connectdb";
import { BaseNextResponse } from "next/dist/server/base-http";
import { NextResponse } from "next/server";
import { QueryResult } from "pg";

type productName = {
  category: string;
};

export async function GET(Request: Request) {
  const { searchParams } = new URL(Request.url);
  const category = searchParams.get("category") as string;

  // console.log(category);

  try {
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
  } catch (error) {
    console.log(error);
    return NextResponse.json<errorInterface>({ error: "Error fetching related products" });
  }
}

export async function PUT(Request: Request) {
  try {
    const product =
      await pool.query(`CREATE TABLE "wishlist" (customer_id VARCHAR(255),
    product_ids VARCHAR[]`);

    if (product) {
      return NextResponse.json({ ...product.rows });
    } else {
      return NextResponse.json(null);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json<errorInterface>({ error: "Error creating table" });
  }
}
