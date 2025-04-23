import { NextResponse, NextRequest } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(Request: NextRequest) {
  try {
    const order = await razorpay.orders.create({
      amount: 100 * 100,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });
    console.log(order.id);

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "error occurred while creating order" },
      { status: 500 }
    );
  }
}
