"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "sonner";
import { ProductInterface } from "@/types";

const Card = ({
  product_id,
  productName,
  productImage,
  productPrice,
  discount,
  description,
  colors,
  sizes,
  category,
}: ProductInterface) => {
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(sizes, colors,productName);
  return (
    <>
      <Toaster richColors={true} />
      <div className="flex flex-col gap-2 relative group">
        <Link
          href={`/products/${product_id}`}
          className="inline-block "
        >
          <div className="w-35 h-35 lg:w-50 lg:h-50 rounded px-8 py-4 bg-[#F5F5F5] relative flex justify-center items-center ">
            <div className="text-white font-extralight px-2 py-1 bg-[#DB4444] w-fit rounded-md text-xs absolute top-1 left-1">
              - {discount}%
            </div>
            <Image
              className="object-contain object-center max-h-40"
              src={`${productImage}`}
              alt={"product image"}
              width={150}
              height={150}
            ></Image>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <h2 className="text-xs">{productName.replaceAll("%20", " ")}</h2>
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
      </div>
    </>
  );
};

export default Card;
