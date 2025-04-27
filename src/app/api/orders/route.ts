import connectDB from "@/lib/db/mongodb/connectdb";
import orders from "@/app/models/OrderShcema";
import { NextResponse, NextRequest } from "next/server";
import { errorInterface, OrderInfo } from "@/types";

export async function POST(Request: NextRequest) {
  const body: OrderInfo = await Request.json();

  try {
    await connectDB();

    const newOrder: OrderInfo = await orders.create({
      customer_id: body.customer_id,
      product_id: body.product_id,
      productQuantity: body.productQuantity,
      name: body.name,
      email: body.email,
      address: body.address,
      amount: body.amount,
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