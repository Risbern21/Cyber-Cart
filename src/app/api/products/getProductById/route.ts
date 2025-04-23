import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db/pgsql/connectdb";
import { errorInterface, ProductInterface } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const product_id = searchParams.get("product_id");

  const queryText = "SELECT * FROM products WHERE product_id=$1";

  try {
    const result = await pool.query<ProductInterface>(queryText, [product_id]);

    if (result.rows.length != 0)
      return NextResponse.json({ ...result.rows[0] }, { status: 200 });

    return NextResponse.json({ message: "product not found" }, { status: 404 });
  } catch (error) {
    console.log(error);
    return NextResponse.json<errorInterface>({ error: error }, { status: 500 });
  }
}
