import pool from "@/lib/db/pgsql/connectdb";
import { errorInterface } from "@/types";
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

  try {
    const db_products = await pool.query<product>(queryText);

    return NextResponse.json([...db_products.rows], { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json<errorInterface>(
      { error: "An error occured" },
      { status: 500 }
    );
  }
}

export async function POST(Request: NextRequest) {
  const body: { product_id: string } = await Request.json();
  try {
    const queryText = `SELECT * FROM products WHERE product_id = $1`;
    const dbProduct = await pool.query(queryText, [body.product_id]);
    if (dbProduct)
      return NextResponse.json({ ...dbProduct.rows[0] }, { status: 200 });
    return NextResponse.json({ message: "product not found" }, { status: 404 });
  } catch (error) {
    console.log(error);
    return NextResponse.json<errorInterface>(
      { error: "An error occured" },
      { status: 500 }
    );
  }
}
