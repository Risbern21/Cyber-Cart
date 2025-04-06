"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/myOrders/Loader";
import Image from "next/image";

interface userOrdersInterface {
  product_id: number;
  productName: string;
  productImage: string;
  productPrice: number;
  productQuantity: number;
}

const page = () => {
  const { data: session } = useSession();
  const [userOrders, setuserOrders] = useState<userOrdersInterface[]>();
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(
      `http://localhost:3000/api/orders/?customer_id=${session?.user.customer_id}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) => setuserOrders(result))
      .catch((error) => console.error(error));
  }, [session]);

  // console.log(userOrders);

  return (
    <div>
      {userOrders ? (
        <div className="px-5 sm:px-20 py-10">
          <h1 className="my-3 text-xl">Your Orders</h1>
          <ul className="flex flex-col gap-3">
            {userOrders.map((userOrder, index) => {
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
                  {/* <span>{userOrder.productQuantity}</span> */}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default page;
