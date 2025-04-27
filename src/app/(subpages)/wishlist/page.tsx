"use client";
import React, { useEffect, useState } from "react";
import Mapper from "@/components/Mapper";
import { useSession } from "next-auth/react";
import { ProductInterface } from "@/types";
import Link from "next/link";
import Loader from "@/components/Loader";

const Page = () => {
  const { data: session } = useSession();
  const [showLoader, setshowLoader] = useState(true);
  const [wishlistProducts, setwishlistProducts] =
    useState<ProductInterface[]>();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      customer_id: session?.user.customer_id,
    });

    fetch("http://localhost:3000/api/wishlist", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setwishlistProducts(result);
        setshowLoader(false);
      })

      .catch((error) => console.error(error));
  }, [session]);

  return (
    <div className=" mt-10 w-full h-full">
      <>
        {wishlistProducts && wishlistProducts[0] ? (
          <div>
            <Mapper cards={wishlistProducts} Title="Your Wishlist" />
          </div>
        ) : (
          <>
            {showLoader ? (
              <Loader />
            ) : (
              <div className="h-full w-full my-30 flex items-center flex-col gap-5">
                <div className=" flex justify-center items-center font-bold text-3xl text-center">
                  No Products In Your Wishlist
                </div>
                <Link href={"/"}>
                  <button className="bg-[#DB4444] pointer text-white px-4 py-2 rounded text-sm">
                    Back To Home Page
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default Page;