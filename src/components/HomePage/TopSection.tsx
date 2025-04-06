"use client";
import React from "react";
import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRef } from "react";

const SideSection = () => {
  const [selected, setselected] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   setInterval(() => {
  //     setselected((prev) => {
  //       if (prev < 3) {
  //         return prev + 1;
  //       } else if (prev < 1) return prev - 1;
  //       else return prev;
  //     });
  //   }, 5000);
  // }, [selected]);

  const handleRightClick = () => {
    setselected((prev) => {
      if (prev < 4) {
        return prev + 1;
      } else return prev;
    });
  };
  const handleLeftClick = () => {
    setselected((prev) => {
      if (prev > 1) {
        return prev - 1;
      } else return prev;
    });
  };

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
      <div
        ref={carouselRef}
        className="w-full flex justify-center items-center gap-5 relative"
      >
        <div
          onClick={() => handleLeftClick()}
          className="p-2 bg-[#F5F5F5] hover:bg-[#B3B3B3] w-fit h-fit rounded-full"
        >
          <MoveLeft />
        </div>
        <div className="absolute bottom-30 left-[35%] text-white flex gap-2 underline-offset-6 underline -translate-x-22 translate-y-18 pointer">
          Shop Now
        </div>
        <div>
          <Image
            style={{
              display: selected === 1 ? "block" : "none",
              animation: "fadeIn 2.5s linear",
            }}
            className="object-contain object-center"
            src={"/TopSectionAssets/iphone.jpg"}
            alt="iphone 16 ad"
            width={500}
            height={500}
            priority
          ></Image>
          <Image
            style={{ display: selected === 2 ? "block" : "none" }}
            className="object-contain object-center hidden"
            src={"/TopSectionAssets/samsungs25ultra.avif"}
            alt="iphone 16 ad"
            width={500}
            height={500}
            priority
          ></Image>
          <Image
            style={{ display: selected === 3 ? "block" : "none" }}
            className="object-contain object-center"
            src={"/TopSectionAssets/ON.jpg"}
            alt="iphone 16 ad"
            width={500}
            height={500}
            priority
          ></Image>
          <Image
            style={{ display: selected === 4 ? "block" : "none" }}
            className="object-contain object-center aspect-video"
            src={"/TopSectionAssets/keyboard.jpg"}
            alt="iphone 16 ad"
            width={500}
            height={500}
            priority
          ></Image>
          <div className="flex gap-1 absolute bottom-10 left-[40%] translate-x-12">
            <div
              style={{
                backgroundColor: selected === 1 ? "#B3B3B3" : "#F5F5F5",
              }}
              className="w-1 sm:w-3 h-1 sm:h-3 rounded-full"
            />
            <div
              style={{
                backgroundColor: selected === 2 ? "#B3B3B3" : "#F5F5F5",
              }}
              className="w-1 sm:w-3 h-1 sm:h-3 rounded-full"
            />
            <div
              style={{
                backgroundColor: selected === 3 ? "#B3B3B3" : "#F5F5F5",
              }}
              className="w-1 sm:w-3 h-1 sm:h-3 rounded-full"
            />
            <div
              style={{
                backgroundColor: selected === 4 ? "#B3B3B3" : "#F5F5F5",
              }}
              className="w-1 sm:w-3 h-1 sm:h-3 rounded-full"
            />
          </div>
        </div>
        <div
          onClick={() => handleRightClick()}
          className="p-2 bg-[#F5F5F5] hover:bg-[#B3B3B3] w-fit h-fit rounded-full"
        >
          <MoveRight />
        </div>
      </div>
    </div>
  );
};

export default SideSection;
