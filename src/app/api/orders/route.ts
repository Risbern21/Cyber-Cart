import connectDB from "@/lib/db/mongodb/connectdb";
import orders from "@/app/models/OrderShcema";
import User from "@/app/models/UserSchema";
import { NextResponse, NextRequest } from "next/server";
import pool from "@/lib/db/pgsql/connectdb";
import { errorInterface, OrderInfo } from "@/types";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export async function POST(Request: NextRequest) {
  const body: OrderInfo = await Request.json();

  try {
    await connectDB();

    const newOrder: OrderInfo = await orders.create({
      oid: body.oid,
      customer_id: body.customer_id,
      product_id: body.product_id,
      productQuantity: body.productQuantity,
      name: body.name,
      email: body.email,
      address: body.address,
      amount: body.amount,
      // cod: body.cod,
      // is_paid: body.is_paid,
    });

    if (newOrder)
      return NextResponse.json(
        {
          message: "Your Order Was Placed Successfully!!",
        },
        { status: 201 }
      );
    return NextResponse.json(
      {
        error: "An error occurred while placing the order",
      },
      { status: 404 }
    );
  } catch (error) {
    console.log("Error creating order:", error);
    return NextResponse.json<errorInterface>(
      {
        error: "internal error",
      },
      { status: 500 }
    );
  }
}

// export async function PUT(Request: NextRequest) {
//   try {
//     const result = await pool.query(`SELECT customer_id,product_ids from cart`);
//     if (result) return NextResponse.json({ ...result.rows }, { status: 200 });
//     return NextResponse.json({ message: "not found" }, { status: 404 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json<errorInterface>(
//       {
//         error: error,
//       },
//       { status: 500 }
//     );
//   }
// }
