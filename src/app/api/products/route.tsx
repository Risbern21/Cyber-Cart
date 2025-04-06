import pool from "@/app/db/pgsql/connectdb";

export interface ProductInterface {
  product_id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  sellerName: string;
  discount: number;
  sizes: string[];
  colors: string[];
  description: string;
  category: string;
}

export async function POST(Request: Request) {
  const body: ProductInterface = await Request.json();
  const queryText = `INSERT INTO products (product_id,"productName","productImage","productPrice",discount,description,category,"sellerName",sizes,colors)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;

  const queryValues: (number | string | string[])[] = [
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

  const newProduct = await pool.query(queryText, queryValues);

  if (newProduct) {
    return Response.json({
      message: "Your product was listed!",
      ...newProduct.rows[0],
    });
  }
  return Response.json({
    error: "There was an error",
  });
}
