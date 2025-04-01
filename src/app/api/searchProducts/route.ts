import products from "@/app/models/ProductShcema";
import connectDB from "@/app/db/mongodb/connectdb";

type productName = {
  productName: string;
};

type card = {
  product_id:string,
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

  const db_Product: card | null = await products.findOne({
    productName: body.productName,
  });

  if (db_Product) {
    return Response.json({
      messsge: "hello",
      product_id:db_Product.product_id,
      productName: db_Product.productName,
      productImage: db_Product.productImage,
      productPrice: db_Product.productPrice,
      discount: db_Product.discount,
      stars: db_Product.stars,
      sizes: db_Product.sizes,
      colors: db_Product.colors,
      description: db_Product.description,
    });
  }
  return Response.json({ message: "Product not found" });
}
