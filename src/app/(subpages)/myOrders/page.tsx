"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";

interface userOrdersInterface {
  product_id: number;
  productName: string;
  productImage: string;
  productPrice: number;
  productQuantity: number;
}

const page = () => {
  const { data: session } = useSession();
  const [showloader, setshowloader] = useState(true);
  const [userOrders, setuserOrders] = useState<userOrdersInterface[] | null>(
    null
  );
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      customer_id: session?.user?.customer_id,
    });

    if (session) {
      fetch(`http://localhost:3000/api/orders/getOrders`, {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((result) => setuserOrders(result))
        .catch((error) => console.error(error));
    }
    setshowloader(false);
  }, [session]);

  console.log(userOrders);

  return (
    <div>
      {userOrders && userOrders[0] ? (
        <div className="">
          <h1 className="my-3 text-xl">Your Orders</h1>
          <ul className="flex flex-col gap-3">
            {userOrders?.map((userOrder, index) => {
              return (
                <li
                  key={index}
                  className="shadow-sm rounded p-2 flex justify-between items-center hover:shadow-lg"
                >
                  <span className="flex gap-3 items-center">
                    <h2>{userOrder.productName}</h2>
                    <Image
                      src={userOrder.productImage}
                      alt="product image"
                      width={80}
                      height={80}
                      className="rounded"
                    ></Image>
                  </span>
                  <span>₹{userOrder.productPrice}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <>
          {showloader ? (
            <Loader />
          ) : (
            <div className="flex flex-col items-center justify-center my-30">
              <p className="text-3xl sm:text-5xl">You Have No Orders</p>
              <Link href={"/"}>
                <button className="bg-[#DB4444] pointer text-white px-4 py-2 rounded text-sm mt-5">
                  Back To Home
                </button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default page;
