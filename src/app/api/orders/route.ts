import connectDB from "@/app/db/mongodb/connectdb";
import orders from "@/app/models/OrderShcema";
import { NextResponse, NextRequest } from "next/server";
import products from "@/app/models/ProductShcema";
import pool from "@/app/db/pgsql/connectdb";
import { QueryResult } from "pg";

interface OrderInfo {
  customer_id: string;
  product_id: string;
  productQuantity: number;
  Name: string;
  email: string;
  address: string;
  amount: number;
  cod: boolean;
  is_paid: boolean;
}

type productInfo = {
  product_id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  discount: number;
};

export async function GET(Request: NextRequest) {
  const reqUrl = Request.url;
  const { searchParams } = new URL(reqUrl);
  const customer_id = searchParams.get("customer_id");
  // console.log(customer_id)

  await connectDB();

  const userOrders: OrderInfo[] = await orders.find({
    customer_id: customer_id,
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
  console.log(product_ids);
  const queryText = `SELECT * FROM products WHERE product_id = ANY($1)`;
  const result = await pool.query<productInfo>(queryText, [product_ids]);
  // console.log(result.rows);
  return NextResponse.json(result.rows);
}

export async function POST(Request: NextRequest) {
  const body: OrderInfo = await Request.json();

  await connectDB();

  const newOrder: OrderInfo = await orders.create({
    customer_id: body.customer_id,
    product_id: body.product_id,
    productQuantity: body.productQuantity,
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

export async function PUT(Request: NextRequest) {
  const result = await pool.query(
    `SELECT * FROM products
    `
  );
  return NextResponse.json(result.rows);
}
