import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/UserSchema";
import connectDB from "@/lib/db/mongodb/connectdb";
import { UserData } from "@/types";
import pool from "@/lib/db/pgsql/connectdb";

export async function POST(Request: NextRequest) {
  const body: UserData = await Request.json();
  // console.log(body);

  try {
    await connectDB();

    const updatedUser = await User.findOneAndUpdate<UserData>(
      { customer_id: body.customer_id },
      { address: body.address, name: body.name },
      { new: true }
    );
    if (updatedUser)
      return NextResponse.json(
        { message: "updated your details" },
        { status: 200 }
      );
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred try again later" },
      { status: 500 }
    );
  }
}

export async function DELETE(Request: NextRequest) {
  const body: { customer_id: string } = await Request.json();
  try {
    const deletedUserMdb = await User.deleteOne({
      customer_id: body.customer_id,
    });

    const deleteQuery = `DELETE FROM cart WHERE customer_id=$1 RETURNING *`;

    const deletedUserPg = await pool.query(deleteQuery, [body.customer_id]);
    if (deletedUserMdb.deletedCount != 0 && deletedUserPg.rows.length != 0)
      return NextResponse.json(
        {
          message: "Successfully deleted your account",
        },
        { status: 200 }
      );
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}