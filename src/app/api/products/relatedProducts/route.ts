import { errorInterface, ProductInterface } from "@/types";
import pool from "@/lib/db/pgsql/connectdb";
import { NextResponse } from "next/server";

export async function GET(Request: Request) {
  const { searchParams } = new URL(Request.url);
  const category = searchParams.get("category") as string;

  // console.log(category);

  try {
    const queryText = "SELECT * FROM products WHERE category = $1";

    const relatedProducts = await pool.query<ProductInterface>(queryText, [
      category,
    ]);
    // console.log(relatedProducts.rows);
    if (relatedProducts.rows.length > 0) {
      return NextResponse.json([...relatedProducts.rows], { status: 200 });
    }
    // console.log(relatedProducts.rows);
    return NextResponse.json(null, { status: 404 });
  } catch (error) {
    console.log(error);
    return NextResponse.json<errorInterface>(
      { error: "Error fetching related products" },
      { status: 500 }
    );
  }
}

// export async function PUT(Request: Request) {
//   try {
//     const product =
//       await pool.query(`CREATE TABLE "wishlist" (customer_id VARCHAR(255),
//     product_ids VARCHAR[]`);

//     if (product) {
//       return NextResponse.json({ ...product.rows },{status:200});
//     } else {
//       return NextResponse.json(null,{status:404});
//     }
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json<errorInterface>({ error: "Error creating table" },{status:200});
//   }
// }
