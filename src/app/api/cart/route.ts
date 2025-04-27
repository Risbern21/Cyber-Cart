import pool from "@/lib/db/pgsql/connectdb";
import { NextRequest, NextResponse } from "next/server";
import { errorInterface } from "@/types";

interface bodyInterface {
  customer_id: number;
  product_id: string;
  productPrice: number;
}

export interface cart {
  customer_id: number;
  product_ids: string[];
  cart_id: string;
  created_at: Date;
}

export async function PUT(req: NextRequest) {
  const body: bodyInterface = await req.json();
  const UpdateQueryText = `UPDATE cart SET
   product_ids = array_append(product_ids,$2) , "subTotal"="subTotal"+$3 WHERE customer_id = $1 
   AND $2 <> ALL (product_ids) RETURNING 1`;

  try {
    const result = await pool.query(UpdateQueryText, [
      body.customer_id,
      body.product_id,
      body.productPrice,
    ]);

    if (result.rows.length !== 0)
      return NextResponse.json(
        { message: "updated your cart" },
        { status: 200 }
      );

    return NextResponse.json(
      { message: "product already in cart" },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json<errorInterface>(
      { error: "an error occured " },
      { status: 500 }
    );
  }
}
