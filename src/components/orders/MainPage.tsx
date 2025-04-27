"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import Mapper from "../Mapper";
import Link from "next/link";
import { ProductInterface } from "@/types";

interface mainPageProps {
  customer_id: string;
}

const MainPage = ({ customer_id }: mainPageProps) => {
  const { data: session } = useSession();
  const [showloader, setshowloader] = useState(true);
  const [userOrders, setuserOrders] = useState<ProductInterface[]>();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (session) {
      fetch(
        `http://localhost:3000/api/orders/getOrders?customer_id=${customer_id}`,
        {
          method: "GET",
          headers: myHeaders,
          // body: raw,
          redirect: "follow",
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setuserOrders(result);
          setshowloader(false);
        })
        .catch((error) => console.error(error));
    }
  }, [session]);

  return (
    <div>
      {userOrders && userOrders[0] ? (
        <Mapper cards={userOrders} Title="Yours Orders" />
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

export default MainPage;
