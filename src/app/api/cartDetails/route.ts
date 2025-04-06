import pool from "@/app/db/pgsql/connectdb";
import { type NextRequest, NextResponse } from "next/server";
import { QueryResult } from "pg";

interface bodyInterface {
  customer_id: number;
  product_id: string;
}

export interface cart {
  customer_id: number;
  product_ids: string[];
  cart_id: string;
  created_at: Date;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const customer_id = searchParams.get("customer_id");
  // console.log(customer_id);
  const queryText = `SELECT * FROM products
                      WHERE product_id = ANY (
                                          SELECT unnest(product_ids)
                                          FROM cart WHERE customer_id = $1)`;
  try {
    const cart = await pool.query(queryText, [customer_id]);
    return NextResponse.json({ message: "updated your cart", ...cart.rows });
  } catch (error) {
    console.log("error occurred : ", error);
    return NextResponse.json({
      message: error,
    });
  }
}

export async function POST(req: Request) {
  const body: cart = await req.json();

  try {
    const newCart = await pool.query(
      "INSERT INTO cart (customer_id,products) VALUES ($1,$2) RETURNING *",
      [body.customer_id, body.product_ids]
    );
    return NextResponse.json(newCart.rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function PUT(req: Request) {
  const body: bodyInterface = await req.json();
  const fetchQueryText = "SELECT * FROM cart WHERE customer_id = $1";
  const UpdateQueryText = `UPDATE cart SET product_ids = $2 WHERE customer_id=$1 RETURNING *`;
  try {
    const oldCart: QueryResult<cart> = await pool.query(fetchQueryText, [
      body.customer_id,
    ]);
    if (!oldCart.rows[0].product_ids.includes(body.product_id)) {
      oldCart.rows[0].product_ids.push(body.product_id);
      const newCart = await pool.query(UpdateQueryText, [
        body.customer_id,
        oldCart.rows[0].product_ids,
      ]);
      return NextResponse.json({ message: "updated your cart" });
    }
    return NextResponse.json({ message: "product already in cart" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
