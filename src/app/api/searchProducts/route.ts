// import products from "@/app/models/ProductShcema";
// import connectDB from "@/app/db/mongodb/connectdb";
import pool from "@/app/db/pgsql/connectdb";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

type product = {
  product_id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  discount: number;
  sizes: Array<string>;
  colors: Array<string>;
  description: string;
};

export async function GET() {
  // await connectDB();

  // const db_Product: card | null = await products.findOne({
  //   productName: body.productName,
  // });

  // if (db_Product) {
  //   return Response.json({
  //     messsge: "hello",
  //     product_id:db_Product.product_id,
  //     productName: db_Product.productName,
  //     productImage: db_Product.productImage,
  //     productPrice: db_Product.productPrice,
  //     discount: db_Product.discount,
  //     stars: db_Product.stars,
  //     sizes: db_Product.sizes,
  //     colors: db_Product.colors,
  //     description: db_Product.description,
  //   });
  // }
  const queryText = `SELECT * FROM products LIMIT(15)`;

  const db_products = await pool.query<product>(queryText);

  return NextResponse.json(db_products.rows);
}

export async function POST(Request: NextRequest) {
  const body: { product_id: string } = await Request.json();
  const queryText = `SELECT * FROM products WHERE product_id = $1`;

  const dbProduct = await pool.query(queryText, [body.product_id]);
  if (dbProduct) return NextResponse.json({...dbProduct.rows[0]});
  return NextResponse.json({ error: "404 product not found" });
}
