import products from "@/app/models/ProductShcema";
import connectDB from "@/app/db/mongodb/connectdb";

type productName = {
  category: string;
};

type card = {
  product_id:string;
  productName: string;
  productImage: string;
  productPrice: number;
  discount: number;
  stars: number;
  reviews:number;
  sizes: Array<string>;
  colors: Array<string>;
  description: string;
};

export async function POST(Request: Request) {
  const body: productName = await Request.json();

  await connectDB();

  const db_Products: card[] | null = await products.find({
    category: body.category,
  });

  if (db_Products) {
    return Response.json(db_Products);
  }
  return Response.json({ message: "Product not found" });
}
