import pool from "@/lib/db/pgsql/connectdb";
import { type NextRequest, NextResponse } from "next/server";
import { errorInterface, ProductInterface } from "@/types";

interface bodyInterface {
  customer_id: number;
  product_id: string;
}

export interface cart {
  customer_id: number;
  product_ids: string[];
  cart_id: string;
  created_at: Date;
}

// export async function POST(req: Request) {
//   const body: cart = await req.json();

//   try {
//     const newCart = await pool.query(
//       "INSERT INTO cart (customer_id,products) VALUES ($1,$2) RETURNING *",
//       [body.customer_id, body.product_ids]
//     );
//     return NextResponse.json(newCart.rows[0]);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json<errorInterface>({ error: error });
//   }
// }

export async function PUT(req: Request) {
  const body: bodyInterface = await req.json();
  const UpdateQueryText = `UPDATE cart SET
   product_ids = array_append(product_ids,$2)
   WHERE customer_id = $1 
   AND $2 <> ALL (product_ids) RETURNING 1`;

  try {
    const result = await pool.query(UpdateQueryText, [
      body.customer_id,
      body.product_id,
    ]);

    if (result.rows.length !== 0)
      return NextResponse.json({ message: "updated your cart" },{status:200});

    return NextResponse.json({ message: "product already in cart" },{status:400});
  } catch (error) {
    console.log(error);
    return NextResponse.json<errorInterface>({ error: "an error occured " },{status:500});
  }
}

export async function GET() {
  const result = await pool.query("SELECT * FROM cart");
  return NextResponse.json({ ...result.rows });
}
