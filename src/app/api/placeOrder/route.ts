import connectDB from "@/app/db/mongodb/connectdb";
import orders from "@/app/models/OrderShcema";
import { NextResponse } from "next/server";

interface OrderInfo {
  Name: string;
  email: string;
  address: string;
  amount: number;
  cod: boolean;
  is_paid: boolean;
}

export async function POST(Request: Request) {
  const body: OrderInfo = await Request.json();

  await connectDB();

  const newOrder = await orders.create({
    Name: body.Name,
    email: body.email,
    address: body.address,
    amount: body.amount,
    cod: body.cod,
    is_paid: body.is_paid,
  });

  return NextResponse.json({
    message: "Your Order Was Placed Successfully!!",
  });
}
