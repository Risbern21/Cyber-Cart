"use client";
import React from "react";
import { ChevronRight, MoveRight } from "lucide-react";
import Image from "next/image";
import ControlledCarousel from "../Carousel";

const SideSection = () => {
  return (
    <div className="flex justify-between my-5">
      <ul className="border-r border-r-[#B3B3B3] flex-col w-[30%] px-2 py-4 hidden lg:inline-flex">
        <li className="flex justify-between w-full hover:bg-gray-100 px-2 py-1 rounded-md">
          <span>Women's Fashion</span>
          <ChevronRight />
        </li>
        <li className="flex justify-between w-full hover:bg-gray-100 px-2 py-1 rounded-md">
          <span>Men's Fashion</span>
          <ChevronRight />
        </li>
        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">Electronic's</li>
        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
          Home & Lifestyle
        </li>
        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">Medicine</li>
        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
          Sports & Outdoor
        </li>
        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
          Baby's & Toy's
        </li>
        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
          Groceries & Pet's
        </li>
        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
          Health & Beauty
        </li>
      </ul>
      <div className="w-full flex justify-center">
        <div className="absolute top-1/2 left-1/2 text-white flex gap-2 underline-offset-6 underline -translate-x-22 translate-y-18">
          Shop Now
          <MoveRight />
        </div>

        <Image
          className="object-contain object-center"
          src={"/TopSectionAssets/iphone.jpg"}
          alt="iphone 16 ad"
          width={500}
          height={500}
        ></Image>
        <Image
          className="object-contain object-center hidden"
          src={"/TopSectionAssets/samsungs25ultra.avif"}
          alt="iphone 16 ad"
          width={500}
          height={500}
        ></Image>
        <Image
          className="object-contain object-center hidden"
          src={"/TopSectionAssets/ON.jpg"}
          alt="iphone 16 ad"
          width={500}
          height={500}
        ></Image>
        <Image
          className="object-contain object-center hidden"
          src={"/TopSectionAssets/keyboard hidden.jpg"}
          alt="iphone 16 ad"
          width={500}
          height={500}
        ></Image>
      </div>
    </div>
  );
};

export default SideSection;
