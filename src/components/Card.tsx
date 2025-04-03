"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import { Trash2, ShoppingCart, Eye, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "sonner";

interface card {
  productName: string;
  productImage: string;
  productPrice: number;
  discount: number;
}

const Card = ({ productName, productImage, productPrice, discount }: card) => {
  const { data: session } = useSession();
  const router = useRouter();
  const AddItemToCart = (productName: string) => {
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // const raw = JSON.stringify({
    //   customer_id: session?.user,
    //   products: product_id,
    // });
    // fetch("http://localhost:3000/api/cartDetails/?customer_id=5", {
    //   method: "PUT",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // })
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error(error));
  };

  return (
    <>
      <Toaster richColors={true} />
      <div className="flex flex-col gap-2 relative group">
        <Link href={`/products/${productName}`} className="inline-block ">
          <div className="w-35 h-35 lg:w-50 lg:h-50 rounded px-8 py-4 bg-[#F5F5F5] relative flex justify-center items-center ">
            <div className="text-white font-extralight px-2 py-1 bg-[#DB4444] w-fit rounded-md text-xs absolute top-1 left-1">
              -{discount}%
            </div>
            <Image
              className="object-contain object-center"
              src={`${productImage}`}
              alt={"product image"}
              width={150}
              height={150}
            ></Image>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <h2 className="text-xs">{productName.replaceAll("%20"," ")}</h2>
            <div className="text-xs flex gap-2">
              <span className="text-[#DB4444]">
                ₹{Math.round(productPrice - (40 / productPrice) * 100)}
              </span>
              <span className="line-through text-[#3D3D3D]">
                ₹{productPrice}
              </span>
            </div>
          </div>
        </Link>
        <button
          onClick={() => {
            if (session) {
              toast.success("Item Added To Cart");
              AddItemToCart(productName);
            } else {
              toast.error("You Need To Login Before Placing Items In The Cart");
            }
          }}
          className="z-40 absolute bottom-9 bg-black rounded-b justify-center text-white text-xs items-center gap-2 w-35 h-7 lg:w-50 pointer hidden group-hover:inline-flex"
        >
          <ShoppingCart strokeWidth={2} width={15} />
          <span>Add To Cart</span>
        </button>
      </div>
    </>
  );
};

export default Card;
