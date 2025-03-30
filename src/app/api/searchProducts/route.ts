import products from "@/app/models/ProductShcema";
import connectDB from "@/app/db/connectdb";

type productName = {
  cardName: string;
};

type card = {
  cardName: string;
  cardLink: string;
  cardPrice: number;
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

  const db_Product: card | null = await products.findOne({
    cardName: body.cardName,
  });

  if (db_Product) {
    return Response.json({
      messsge: "hello",
      cardName: db_Product.cardName,
      cardLink: db_Product.cardLink,
      cardPrice: db_Product.cardPrice,
      discount: db_Product.discount,
      stars: db_Product.stars,
      sizes: db_Product.sizes,
      colors: db_Product.colors,
      description: db_Product.description,
    });
  }
  return Response.json({ message: "Product not found" });
}
