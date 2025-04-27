import connectDB from "@/lib/db/mongodb/connectdb";
import pool from "@/lib/db/pgsql/connectdb";
import orders from "@/app/models/OrderShcema";
import { NextRequest, NextResponse } from "next/server";
import { ProductInterface, OrderInfo, errorInterface } from "@/types";

export async function GET(Request: NextRequest) {
  const reqUrl = Request.url;
  const { searchParams } = new URL(reqUrl);
  const customer_id = searchParams.get("customer_id");

  try {
    await connectDB();

    const orderProducts: { product_id: string }[] = await orders.find(
      {
        customer_id: customer_id,
        isPaid: true,
      },
      { product_id: 1, _id: 0 }
    );

    const product_ids: string[] = orderProducts.map(
      (orderProduct) => orderProduct.product_id
    );

    // console.log(product_ids);

    const fetchProductsQuery = `SELECT * FROM products WHERE product_id = ANY($1)`;

    const result = await pool.query(fetchProductsQuery, [product_ids]);

    if (result) return NextResponse.json([...result.rows], { status: 200 });

    return NextResponse.json({
      status: 404,
      message: "No Orders Found",
    });
    // return NextResponse.json([...product_ids], { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json<errorInterface>(
      {
        error: "Error fetching orders",
      },
      { status: 500 }
    );
  }
}
