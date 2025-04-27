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
