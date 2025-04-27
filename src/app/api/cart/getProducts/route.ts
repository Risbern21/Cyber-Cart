import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db/pgsql/connectdb";
import { errorInterface, ProductInterface } from "@/types";

export async function GET(req: NextRequest) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const customer_id = searchParams.get("customer_id");
  //
  const queryText = `SELECT * FROM products
                        WHERE product_id = ANY (
                                            SELECT unnest(product_ids)
                                            FROM cart WHERE customer_id = $1)`;
  try {
    const cart = await pool.query<ProductInterface[]>(queryText, [customer_id]);

    const cartSubTotal = await pool.query<{ subTotal: number }>(
      `SELECT "subTotal" FROM cart WHERE customer_id = $1`,
      [customer_id]
    );

    if (cart.rows.length != 0)
      return NextResponse.json({
        cartProducts: [...cart.rows],
        subTotal: cartSubTotal.rows[0].subTotal,
        status: 200,
      });
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
