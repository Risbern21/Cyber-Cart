import React from "react";
import Image from "next/image";
import SellForm from "@/components/sell/SellForm";

export default function App() {
  return (
    <div className="py-10 flex justify-between items-center">
      <Image
        src={"/Sell.png"}
        alt="transaction pic"
        width={700}
        height={700}
      ></Image>
      <div className="flex flex-col w-3/4 jusity-center items-center gap-5">
        <h1 className="font-semibold text-3xl">Enter Your Product Details</h1>
        <SellForm />
      </div>
    </div>
  );
}
