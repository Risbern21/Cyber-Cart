"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import { Trash2, ShoppingCart, Eye, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "sonner";

interface card {
  product_id:string;
  productName: string;
  productImage: string;
  productPrice: number;
  stars?: number;
  reviews: number;
  discount: number;
  eye: boolean;
}

const Card = ({
  product_id,
  productName,
  productImage,
  productPrice,
  stars,
  reviews,
  discount,
  eye,
}: card) => {
  const { data: session } = useSession();
  const router = useRouter();

  const AddItemToCart = (productName: string) => {};

  return (
    <>
      <Toaster richColors={true} />
      <div className="flex flex-col gap-2 relative">
        <Link href={`/products/${productName}`} className="inline-block">
          <div className="w-35 h-35 lg:w-50 lg:h-50 rounded px-8 py-4 bg-[#F5F5F5] relative flex justify-center items-center">
            <div className="text-white font-extralight px-2 py-1 bg-[#DB4444] w-fit rounded-md text-xs absolute top-1 left-1">
              -{discount}%
            </div>
            {eye ? (
              <Trash2
                strokeWidth={1.5}
                className="absolute top-1 p-1 right-1 bg-white rounded-full"
              />
            ) : (
              <Eye
                strokeWidth={1.5}
                className="absolute top-1 p-1 right-1 bg-white rounded-full"
              />
            )}
            <Image
              className="object-contain object-center"
              src={`${productImage}`}
              alt={"product image"}
              width={150}
              height={150}
            ></Image>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <h2 className="text-xs">{productName}</h2>
            <div className="text-xs flex gap-2">
              <span className="text-[#DB4444]">
                ₹{Math.round(productPrice - (40 / productPrice) * 100)}
              </span>
              <span className="line-through text-[#3D3D3D]">₹{productPrice}</span>
            </div>
            <span className="flex gap-1 items-center text-xs text-[#3D3D3D]">
              {stars && (
                <Star stroke="none" fill="yellow" width={15} height={15} />
              )}
              <span>({reviews})</span>
            </span>
          </div>
        </Link>
        <span
          onClick={() => {
            if (session) {
              toast.success("Item Added To Cart");
              AddItemToCart(productName);
            } else {
              toast.error("You Need To Login Before Placing Items In The Cart");
            }
          }}
          className="z-40 inline-flex absolute bottom-14 bg-black rounded-b justify-center text-white text-xs items-center gap-2 w-35 h-7 lg:w-50 pointer"
        >
          <ShoppingCart strokeWidth={2} width={15} />
          <span>Add To Cart</span>
        </span>
      </div>
    </>
  );
};

export default Card;
