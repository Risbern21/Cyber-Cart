import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db/pgsql/connectdb";
import { errorInterface } from "@/types";

export async function POST(Request: NextRequest) {
  const body: { customer_id: string } = await Request.json();

  try {
    const queryText =
      "SELECT * FROM products WHERE product_id = ANY(SELECT unnest(product_ids) FROM wishlist WHERE customer_id = $1)";

    const wishlistProducts = await pool.query(queryText, [body.customer_id]);
    return NextResponse.json([ ...wishlistProducts.rows ], { status: 200 });
  } catch (error) {
    console.error("Error fetching wishlist products:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist products" },
      { status: 500 }
    );
  }
}

export async function PUT(Request: NextRequest) {
  const body: {
    customer_id: string;
    product_id: string;
  } = await Request.json();
  // console.log(body);
  try {
    const result = await pool.query(
      `UPDATE wishlist SET product_ids = array_append(product_ids,$2) WHERE customer_id=$1`,
      [body.customer_id, body.product_id]
    );
    // console.log(result.rows[0]);
    return NextResponse.json(
      { message: "updated your wishlist" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json<errorInterface>(
      { error: "an error occurred" },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   const result = await pool.query(
//     `INSERT INTO wishlist (customer_id,product_ids) VALUES ($1,$2)`,
//     ["77810539-5f46-4c24-b42a-aa3057436aa2", []]
//   );
//   // console.log(result.rows);
//   if (result.rows.length > 0) return NextResponse.json(result.rows);
//   return NextResponse.json<errorInterface>({ error: "update req" });
// }
