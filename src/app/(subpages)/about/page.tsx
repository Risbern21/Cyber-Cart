import React from "react";
import {
  Store,
  LucideCircleDollarSign,
  ShoppingBag,
  Wallet,
  Instagram,
  Twitter,
  Facebook,
  FacebookIcon,
} from "lucide-react";
import Image from "next/image";
import TopFooter from "@/components/TopFooter";

const page = () => {
  return (
    <div className="lg:px-0 capitalize">
      <div className="">
        <span className="text-[#4D4D4D]">Home / </span>About
      </div>
      <div className="flex justify-between gap-10 lg:gap-20 flex-col lg:flex-row items-center lg:items-start">
        <div className="text-left w-full lg:w-1/3 flex flex-col sm:mt-20">
          <h1 className="text-3xl font-bold my-5 text-center sm:text-left">
            Our Story
          </h1>
          <p className="text-sm">
            Launced in 2015, CyberCart is South Asia’s premium online shopping
            makterplace with an active presence in India. Supported by wide
            range of tailored marketing, data and service solutions, CyberCart
            has 10,500 sellers and 300 brands and serves 3 million customers
            across the region.
            <br />
            <br />
            CyberCart has more than 1 Million products to offer,and is growing
            at a very fast rate. CyberCart offers a diverse assotment in
            categories ranging from consumer to sellers.
          </p>
        </div>
        <Image
          src={"/aboutPageAssets/SideImage.png"}
          alt="SideImage"
          width={600}
          height={600}
          className="object-contain object-center"
        ></Image>
      </div>
      <div className="flex py-10 lg:p-20 gap-5 w-full flex-col flex-wrap lg:flex-nowrap sm:flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center w-3/4 sm:w-1/4 lg:w-1/3 gap-5 border border-[#B3B3B3] rounded py-8 px-4  hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
          <span className="bg-black p-2 w-fit rounded-full outline-6 outline-[#C1C1C1] group-hover:bg-white text-white group-hover:text-black">
            <Store strokeWidth={1.5} />
          </span>
          <h2 className="text-center text-sm sm:text-2xl font-bold">10.5K</h2>
          <h6 className="text-sm text-center">active sellers</h6>
        </div>
        <div className="flex flex-col items-center justify-center w-3/4 sm:w-1/4 lg:w-1/3 gap-5 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
          <span className="bg-black p-2 w-fit rounded-full outline-6 outline-[#C1C1C1] group-hover:bg-white text-white group-hover:text-black">
            <LucideCircleDollarSign strokeWidth={1.5} />
          </span>
          <h2 className="text-center text-sm sm:text-2xl font-bold">33K </h2>
          <h6 className="text-sm text-center">Monthly product sales</h6>
        </div>
        <div className="flex flex-col items-center justify-center  sm w-3/4 sm:w-1/4 lg:w-1/3 gap-5 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
          <span className="bg-black p-2 w-fit rounded-full outline-6 outline-[#C1C1C1] group-hover:bg-white text-white group-hover:text-black">
            <ShoppingBag strokeWidth={1.5} />
          </span>
          <h2 className="text-center text-sm sm:text-2xl font-bold">45.5K</h2>
          <h6 className="text-sm text-center">Active Customers</h6>
        </div>
        <div className="flex flex-col items-center justify-center w-3/4 sm:w-1/4 lg:w-1/3 gap-5 border border-[#B3B3B3] rounded py-8 px-4 hover:bg-[#DB4444] hover:shadow-lg group text-black hover:text-white">
          <span className="bg-black p-2 w-fit rounded-full outline-6 outline-[#C1C1C1] group-hover:bg-white text-white group-hover:text-black">
            <Wallet strokeWidth={1.5} />
          </span>
          <h2 className="text-center text-sm sm:text-2xl font-bold">25K </h2>
          <h6 className="text-sm text-center">Anual gross sales</h6>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-evenly gap-5">
        <div className="flex flex-col gap-3">
          <Image
            src={"/aboutPageAssets/Personnel/Founder.jpg"}
            alt="employees image"
            width={300}
            height={300}
            className="rounded object-contain object-center"
          ></Image>
          <span className="font-semibold">Jhong Xina</span>
          <span className="text-xs font-extralight">Founder and chairman</span>
          <span className="flex gap-3">
            <Twitter width={15} height={15} />
            <Instagram width={15} height={15} />
            <FacebookIcon width={15} height={15} />
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <Image
            src={"/aboutPageAssets/Personnel/Md.jpg"}
            alt="employees image"
            width={300}
            height={300}
            className="rounded object-contain object-center"
          ></Image>
          <span className="font-semibold">Pikachu</span>
          <span className="text-xs font-extralight">Investor</span>
          <span className="flex gap-3">
            <Twitter width={15} height={15} />
            <Instagram width={15} height={15} />
            <FacebookIcon width={15} height={15} />
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <Image
            src={"/aboutPageAssets/Personnel/PD.jpg"}
            alt="employees image"
            width={300}
            height={300}
            className="rounded object-contain object-center"
          ></Image>
          <span className="font-semibold">Bauna Badmosh</span>
          <span className="text-xs font-extralight">Managing Director</span>
          <span className="flex gap-3">
            <Twitter width={15} height={15} />
            <Instagram width={15} height={15} />
            <FacebookIcon width={15} height={15} />
          </span>
        </div>
      </div>
      <TopFooter />
    </div>
  );
};

export default page;
