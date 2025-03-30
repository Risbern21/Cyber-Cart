import connectDB from "@/app/db/connectdb";
import orders from "@/app/models/OrderShcema";

interface OrderInfo {
  Name: string;
  mobileNumber: number;
  email: string;
  address: string;
  optionalAddress?: string;
  townCity: string;
  amount: number;
  cod: boolean;
  is_paid: boolean;
}

export async function POST(Request: Request) {
  const body: OrderInfo = await Request.json();

  await connectDB();

  const newOrder = await orders.create({
    Name: body.Name,
    mobileNumber: body.mobileNumber,
    email: body.email,
    address: body.address,
    optionalAddress: body.optionalAddress,
    townCity: body.townCity,
    amount: body.amount,
    cod: body.cod,
    is_paid: body.is_paid,
  });

  return Response.json({
    message: "Your Order Was Placed Successfully!!",
  });
}
