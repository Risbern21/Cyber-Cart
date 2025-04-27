import pool from "@/lib/db/pgsql/connectdb";
import { NextResponse, NextRequest } from "next/server";
import { errorInterface, ProductInterface } from "@/types";

export async function POST(Request: Request) {
  const body: ProductInterface = await Request.json();
  const queryText = `INSERT INTO products (product_id,"productName","productImage","productPrice",discount,description,category,"sellerName",sizes,colors)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;

  // console.log(body.discount)

  const queryValues: (number | string | string[] | undefined)[] = [
    body.product_id,
    body.productName,
    body.productImage,
    body.productPrice,
    body.discount,
    body.description,
    body.category,
    body.sellerName,
    body.sizes,
    body.colors,
  ];

  try {
    const newProduct = await pool.query(queryText, queryValues);

    if (newProduct) {
      return NextResponse.json(
        {
          message: "Your product was listed!",
          ...newProduct.rows[0],
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json<errorInterface>(
      {
        error: "There was an error",
      },
      { status: 500 }
    );
  }
}

export async function GET(Request: NextRequest) {
  const reqUrl = Request.url;
  const { searchParams } = new URL(reqUrl);
  const productName = searchParams.get("productName");

  const queryText = `SELECT * FROM products WHERE category ILIKE $1 OR "productName" ILIKE $1`;

  try {
    const products = await pool.query<ProductInterface[]>(queryText, [
      productName,
    ]);
    // console.log(products.rows);
    if (products.rows.length > 0) {
      return NextResponse.json([...products.rows], { status: 200 });
    }
    return NextResponse.json(
      { message: "No such product not found" },
      { status: 404 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json<errorInterface>(
      { error: "An error occured" },
      { status: 500 }
    );
  }
}