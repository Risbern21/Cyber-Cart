import products from "@/app/models/ProductShcema";
import connectDB from "@/app/db/connectdb";
import { error } from "console";

interface ProductInterface {
  cardName: String;
  cardLink: String;
  cardPrice: Number;
  sellerName: String;
  discount: Number;
  stars: Number;
  sizes: String;
  colors: String;
  description: String;
  category: String;
}

export async function POST(Request: Request) {
  const body: ProductInterface = await Request.json();

  await connectDB();

  const is_created: ProductInterface = await products.create({
    cardName: body.cardName,
    cardLink: body.cardLink,
    cardPrice: body.cardPrice,
    sellerName: body.sellerName,
    discount: 0,
    stars: 0,
    sizes: body.sizes,
    colors: body.colors,
    description: body.description,
    category: body.category,
  });

  if (is_created) {
    return Response.json({
      message: "Your Product Has Been Listed!",
    });
  }
  return Response.json({
    error: "There was an error",
  });
}
