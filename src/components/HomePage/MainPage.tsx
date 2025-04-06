"use client";
import React, { ReactNode, Suspense, useEffect, useState } from "react";
import { ProductInterface } from "@/app/api/products/route";
import TopFooter from "../TopFooter";
import TopSection from "./TopSection";
import Mapper from "../Mapper";
import TopCardSection from "../TopCardSection";
import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  TvMinimalPlay,
  Watch,
  Camera,
  Headset,
  Gamepad2,
} from "lucide-react";

const MainPage = () => {
  const [products, setproducts] = useState<ProductInterface[]>();
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("http://localhost:3000/api/searchProducts", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => setproducts(result))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="px-5 lg:px-20 capitalize">
      <TopSection />
      <div className="flex flex-col gap-5">
        <div className="border-b border-b-[#B3B3B3] mt-5">
          {products && (
            <Mapper
              cards={products.slice(0, 10)}
              Title="Today's"
              Type="Flash Sale"
              date="2025-4-3"
            />
          )}
        </div>
        <div className="border-b border-b-[#B3B3B3]">
          <TopCardSection
            Title="Categories"
            Type="Browse By Categories"
            scrollLeft={() => {}}
            scrollRight={() => {}}
          />
          <ul className="flex gap-5 h-full m-5 overflow-x-auto">
            <li className="shadow-sm flex flex-col items-center justify-center w-3/4 lg:w-1/7 gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <Smartphone strokeWidth={1.5} />
              <h6 className="text-sm text-center">Phones</h6>
            </li>
            <li className="shadow-sm flex flex-col items-center justify-center w-3/4 lg:w-1/7 gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <TvMinimalPlay strokeWidth={1.5} />
              <h6 className="text-sm text-center">PC's & Laptops</h6>
            </li>
            <li className="shadow-sm flex flex-col items-center justify-center w-3/4 lg:w-1/7 gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <Watch strokeWidth={1.5} />
              <h6 className="text-sm text-center">Watches</h6>
            </li>
            <li className="shadow-sm flex flex-col items-center justify-center w-3/4 lg:w-1/7 gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <Camera strokeWidth={1.5} />
              <h6 className="text-sm text-center">Photography</h6>
            </li>
            <li className="shadow-sm flex flex-col items-center justify-center w-3/4 lg:w-1/7 gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <Headset strokeWidth={1.5} />
              <h6 className="text-sm text-center">Headsets & Earphones</h6>
            </li>
            <li className="shadow-sm flex flex-col items-center justify-center w-3/4 lg:w-1/7 gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <Gamepad2 strokeWidth={1.5} />
              <h6 className="text-sm text-center">Gaming</h6>
            </li>
          </ul>
        </div>
        <div className="mt-5">
          {products && (
            <Mapper
              cards={products.slice(10, 20)}
              Title="This Month's"
              Type="Best Selling Products"
            />
          )}
        </div>
        <Link href={"products/speaker"}>
          <Suspense fallback={<div className="w-40 h-40 text-xl">Loading...</div>}>
            <Image
              className="mx-auto object-center object-contain mt-5"
              src={"/speaker.png"}
              alt="speaker png"
              width={800}
              height={500}
            ></Image>
          </Suspense>
        </Link>
        <div className="mt-5">
          {products && (
            <Mapper
              cards={products.slice(20, 40)}
              Title="Explore"
              Type="Our Products"
            />
          )}
        </div>
        <div>
          <TopCardSection
            Title="Featured"
            Type="New Arrivals"
            scrollLeft={() => {}}
            scrollRight={() => {}}
          />
          <Link href={"products/speaker"}>
            <Suspense fallback={<div className="w-40 h-40 text-xl text-red-800">Loading...</div>}>
              <Image
                className="mx-auto object-center object-contain mt-5"
                src={"/ps5.png"}
                alt="ps5++ png"
                width={800}
                height={500}
              ></Image>
            </Suspense>
          </Link>
        </div>
      </div>
      <TopFooter />
    </div>
  );
};

export default MainPage;
