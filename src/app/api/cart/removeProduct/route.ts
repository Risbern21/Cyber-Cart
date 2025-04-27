import pool from "@/lib/db/pgsql/connectdb";
import { NextRequest, NextResponse } from "next/server";

interface removeInterface {
  product_ids: string[];
  customer_id: string;
}

export async function PUT(Request: NextRequest) {
  const body: removeInterface = await Request.json();

  try {
    const queryText = `UPDATE cart SET product_ids = $1 WHERE customer_id = $2 
    RETURNING *`;

    // console.log(body);

    const result = await pool.query(queryText, [
      body.product_ids,
      body.customer_id,
    ]);

    if (result.rowCount !== 0)
      return NextResponse.json({
        status: 200,
        message: "updated your cart",
      });

    return NextResponse.json({
      status: 400,
      message: "either cart not found or cartproducts dont exist",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "something went wrong",
    });
  }
}
