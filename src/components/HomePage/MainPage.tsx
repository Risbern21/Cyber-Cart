"use client";
import React, { ReactNode, Suspense, useEffect, useState } from "react";
import { ProductInterface } from "@/types";
import TopFooter from "../TopFooter";
import TopSection from "./TopSection";
import Mapper from "../Mapper";
import TopCardSection from "../TopCardSection";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  Smartphone,
  TvMinimalPlay,
  Watch,
  Camera,
  Headset,
  Gamepad2,
  Shirt,
  LucideBike,
  Dumbbell,
  BicepsFlexed,
} from "lucide-react";

const MainPage = () => {
  const ref = useRef<HTMLUListElement>(null);
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

  const scrollLeft = () => {
    ref.current?.scrollBy({ left: -400, behavior: "smooth" });
  };
  const scrollRight = () => {
    ref.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

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
            scrollLeft={() => scrollLeft()}
            scrollRight={() => scrollRight()}
          />
          <ul
            ref={ref}
            className="flex gap-5 my-5 overflow-x-scroll w-full cardcontainer"
          >
            <li className="shadow-sm flex flex-col items-center justify-center h-35 sm:h-auto w-50 sm:px-10 relative  gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <Smartphone strokeWidth={1.5} />
              <h6 className="text-xs sm:text-sm text-center">Phones</h6>
            </li>
            <li className="shadow-sm flex flex-col items-center justify-center h-35 sm:h-auto w-50 sm:px-10 relative gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <TvMinimalPlay strokeWidth={1.5} />
              <h6 className="text-xs sm:text-sm text-center">PC's & Laptops</h6>
            </li>
            <li className="shadow-sm flex flex-col items-center justify-center h-35 sm:h-auto w-50 sm:px-10 relative gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <Watch strokeWidth={1.5} />
              <h6 className="text-xs sm:text-sm text-center">Watches</h6>
            </li>
            <li className="shadow-sm flex flex-col items-center justify-center h-35 sm:h-auto w-50 sm:px-10 relative gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <Camera strokeWidth={1.5} />
              <h6 className="text-xs sm:text-sm text-center">Photography</h6>
            </li>
            <li className="shadow-sm flex flex-col items-center justify-center h-35 sm:h-auto w-50 sm:px-10 relative gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <Headset strokeWidth={1.5} />
              <h6 className="text-xs sm:text-sm text-center">
                Headsets & Earphones
              </h6>
            </li>
            <li className="shadow-sm flex flex-col items-center justify-center h-35 sm:h-auto w-50 sm:px-10 relative gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <Gamepad2 strokeWidth={1.5} />
              <h6 className="text-xs sm:text-sm text-center">Gaming</h6>
            </li>
            <li className="shadow-sm flex flex-col items-center justify-center h-35 sm:h-auto w-50 sm:px-10 relative gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <Shirt strokeWidth={1.5} />
              <h6 className="text-xs sm:text-sm text-center">Fashion</h6>
            </li>
            <li className="shadow-sm flex flex-col items-center justify-center h-35 sm:h-auto w-50 sm:px-10 relative gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <LucideBike strokeWidth={1.5} />
              <h6 className="text-xs sm:text-sm text-center">Bicycles</h6>
            </li>
            <li className="shadow-sm flex flex-col items-center justify-center h-35 sm:h-auto w-50 sm:px-10 relative gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <Dumbbell strokeWidth={1.5} />
              <h6 className="text-xs sm:text-sm text-center">
                Fitness Equipment
              </h6>
            </li>
            <li className="shadow-sm flex flex-col items-center justify-center h-35 sm:h-auto w-50 sm:px-10 relative gap-2 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
              <BicepsFlexed strokeWidth={1.5} />
              <h6 className="text-xs sm:text-sm text-center">Fitness</h6>
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
          <Image
            className="mx-auto object-center object-contain mt-5"
            src={"/homePageAssets/speaker.png"}
            alt="speaker png"
            width={800}
            height={500}
          ></Image>
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
            showBtns={false}
            scrollLeft={() => {}}
            scrollRight={() => {}}
          />
          <Link href={"products/fb3bf94a-a045-4e7e-b7d4-71a2d9ea712f"}>
            <Image
              className="mx-auto object-center object-contain mt-5"
              src={"/homePageAssets/ps5.png"}
              alt="ps5++ png"
              width={800}
              height={500}
            ></Image>
          </Link>
        </div>
      </div>
      <TopFooter />
    </div>
  );
};

export default MainPage;
