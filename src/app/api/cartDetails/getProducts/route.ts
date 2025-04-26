import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db/pgsql/connectdb";
import { errorInterface, ProductInterface } from "@/types";

export async function POST(req: NextRequest) {
  const body: { customer_id: string } = await req.json();
  // console.log(customer_id);
  const queryText = `SELECT * FROM products
                        WHERE product_id = ANY (
                                            SELECT unnest(product_ids)
                                            FROM cart WHERE customer_id = $1)`;
  try {
    const cart = await pool.query<ProductInterface[]>(queryText, [
      body.customer_id,
    ]);

    // console.log(cart);

    if (cart.rows.length != 0)
      return NextResponse.json(cart.rows, { status: 200 });
    return NextResponse.json(null, { status: 404 });
  } catch (error) {
    console.log("error occurred : ", error);
    return NextResponse.json<errorInterface>(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}