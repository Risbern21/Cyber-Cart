import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/UserSchema";
import connectDB from "@/app/db/mongodb/connectdb";

interface UserData {
  customer_id: string;
  name: string;
  email: string;
  address: string;
}

export async function POST(Request: NextRequest) {
  const body: UserData = await Request.json();
  console.log(body);

  await connectDB();

  const updatedUser = await User.findOneAndUpdate<UserData>(
    { customer_id: body.customer_id },
    { address: body.address, name: body.name },
    { new: true }
  );

  if (updatedUser) return NextResponse.json(updatedUser);

  return NextResponse.json({ message: "user not found" });
}
