import connectDB from "@/lib/db/mongodb/connectdb";
import pool from "@/lib/db/pgsql/connectdb";
import orders from "@/app/models/OrderShcema";
import { NextRequest, NextResponse } from "next/server";
import { ProductInterface, OrderInfo, errorInterface } from "@/types";

export async function POST(Request: NextRequest) {
  const body: { customer_id: String } = await Request.json();
  // console.log(customer_id)

  try {
    await connectDB();

    const userOrders: OrderInfo[] = await orders.find({
      customer_id: body.customer_id,
      is_paid: true,
    });
    // console.log(userOrders);

    let product_ids: string[] = [];
    if (userOrders) {
      product_ids = Array.from(
        userOrders.map((userOrder) => {
          return userOrder.product_id.replaceAll('"', " ").trim();
        })
      );
    }
    // console.log(product_ids);
    const queryText = `SELECT * FROM products WHERE product_id = ANY($1)`;
    const result = await pool.query<ProductInterface>(queryText, [product_ids]);

    if (result) return NextResponse.json({ ...result.rows });
    return NextResponse.json(null);
  } catch (error) {
    console.log(error);
    return NextResponse.json<errorInterface>({
      error: "Error fetching orders",
    });
  }
}
