import pool from "@/app/db/pgsql/connectdb";
import { type NextRequest, NextResponse } from "next/server";
import { QueryResult } from "pg";

interface cartBody {
  customer_id: number;
  products: number[];
}

interface cart extends cartBody {
  cart_id: number;
  created_at: Date;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const customer_id = searchParams.get("customer_id");
  console.log(customer_id);
  const queryText = "SELECT * FROM cart WHERE customer_id = $1";
  try {
    const cart = await pool.query(queryText, [customer_id]);
    return NextResponse.json(cart.rows[0]);
  } catch (error) {
    console.log("error occurred : ", error);
    return NextResponse.json({
      message: error,
    });
  }
}

export async function POST(req: Request) {
  const body: cartBody = await req.json();

  try {
    const newCart = await pool.query(
      "INSERT INTO cart (customer_id,products) VALUES ($1,$2) RETURNING *",
      [body.customer_id, body.products]
    );
    return NextResponse.json(newCart.rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function PUT(req: Request) {
  const body: cartBody = await req.json();
  const fetchQueryText = "SELECT * FROM cart WHERE customer_id = $1";
  const UpdateQueryText = `UPDATE cart SET products = $2 WHERE customer_id=$1 RETURNING *`;
  try {
    const oldCart: QueryResult<cart> = await pool.query(fetchQueryText, [
      body.customer_id,
    ]);
    oldCart.rows[0].products.push(body.products[body.products.length - 1]);
    const newCart = await pool.query(UpdateQueryText, [
      body.customer_id,
      oldCart.rows[0].products,
    ]);
    return NextResponse.json(newCart.rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
