"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import Carousel from "../Carousel";
import { useState } from "react";
import { useRef } from "react";

const SideSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex justify-between ">
      <ul className="border-r border-r-[#B3B3B3] flex-col w-[30%] px-2 py-4 hidden lg:inline-flex">
        <li className="flex justify-between w-full hover:bg-gray-100 px-2 py-1 rounded-md">
          <span>Women&apos;s Fashion</span>
          <ChevronRight />
        </li>
        <li className="flex justify-between w-full hover:bg-gray-100 px-2 py-1 rounded-md">
          <span>Men&apos;s Fashion</span>
          <ChevronRight />
        </li>
        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">Electronic&apos;s</li>
        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
          Home & Lifestyle
        </li>
        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">Medicine</li>
        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
          Sports & Outdoor
        </li>
        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
          Baby&apos;s & Toy&apos;s
        </li>
        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
          Groceries & Pet&apos;s
        </li>
        <li className="hover:bg-gray-100 px-2 py-1 rounded-md">
          Health & Beauty
        </li>
      </ul>
      <div
        ref={carouselRef}
        className="w-full flex justify-center items-center gap-5 relative py-5"
      >
        <div className="absolute bottom-30 left-[35%] text-white flex gap-2 underline-offset-6 underline -translate-x-22 translate-y-18 pointer">
          Shop Now
        </div>
        <Carousel
          images={[
            "/TopSectionAssets/samsungs25ultra.avif",
            "/TopSectionAssets/5090.jpg",
            "/TopSectionAssets/iphone.jpg",
            "/TopSectionAssets/ON.jpg",
            "/TopSectionAssets/keyboard.jpg",
          ]}
        />
        
      </div>
    </div>
  );
};

export default SideSection;
