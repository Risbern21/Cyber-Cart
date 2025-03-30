"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Search,
  Heart,
  ShoppingCart,
  CircleUserRound,
  User,
  ShoppingBag,
  CircleX,
  Star,
  LogOut,
  X,
  AlignJustify,
} from "lucide-react";
import SideSection from "./SideSection";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setshowDropdown] = useState(false);
  const [selected, setSelected] = useState(1);
  const [showSideSection, setshowSideSection] = useState(false);

  return (
    <div className="flex justify-between px-5 lg:px-20  lg:pt-5 py-3  lg:py-4 items-center bordergray bg-white z-50 text-black">
      <Link href={"/"}>
        <div className="text-foreground font-semibold lg:text-2xl cursor-pointer text-xl">
          CyberCart
        </div>
      </Link>
      <ul className="ml-4 lg:ml-0 gap-0 lg:gap-3 hidden sm:flex items-center text-xs lg:text-base">
        <Link href={"/"}>
          <li
            onClick={() => setSelected(1)}
            className="p-2 rounded-xl relative underline-offset-4"
          >
            Home
            <div
              className="h-1 bg-[#7F7F7F] rounded-full"
              style={{
                display: selected === 1 ? "block" : "none",
                animation: "ease-in-out 2s",
              }}
            />
          </li>
        </Link>
        <Link href={"/contact"}>
          <li
            onClick={() => setSelected(2)}
            className="p-2 rounded-xl relative underline-offset-4"
          >
            Contact
            <div
              className="h-1 bg-[#7F7F7F] rounded-full"
              style={{
                display: selected === 2 ? "block" : "none",
                animation: "ease-in-out 2s",
              }}
            />
          </li>
        </Link>
        <Link href={"/about"}>
          <li
            onClick={() => setSelected(3)}
            className="p-2 rounded-xl relative underline-offset-4 decoration-3 "
          >
            About
            <div
              className="h-1 bg-[#7F7F7F] rounded-full"
              style={{ display: selected === 3 ? "block" : "none" }}
            />
          </li>
        </Link>
        {session ? (
          <></>
        ) : (
          <Link href={"/login"}>
            <li
              onClick={() => setSelected(4)}
              className="p-2 rounded-xl relative underline-offset-4"
            >
              Log In
              <div
                className="h-1 bg-[#7F7F7F] rounded-full"
                style={{
                  display: selected === 4 ? "block" : "none",
                  animation: "ease-in-out 2s",
                }}
              />
            </li>
          </Link>
        )}
      </ul>
      <div className="flex gap-4 items-center">
        <div className="px-2 rounded-md hidden md:inline-flex bg-[#F5F5F5] items-center">
          <input
            type="text"
            className="focus:none pl-1 pr-5 md:pl-2 md:pr-10 py-2 focus:outline-none text-foreground"
            placeholder="What are you looking for?"
          />
          <span>
            <Search strokeWidth={1.5} />
          </span>
        </div>
        {session && (
          <div className="relative">
            <div className="flex gap-4">
              <Link className="hidden sm:inline-flex" href={"/wishlist"}>
                <Heart strokeWidth={1.5} />
              </Link>
              <Link href={"/cart/cartpage"} className="hidden sm:inline-flex">
                <ShoppingCart strokeWidth={1.5} />
              </Link>
              <span className="cursor-pointer">
                <CircleUserRound
                  strokeWidth={1.5}
                  onClick={() => setshowDropdown(!showDropdown)}
                />
              </span>
              <span>
                <AlignJustify
                  className="sm:hidden"
                  onClick={() => setshowSideSection(!showSideSection)}
                />
              </span>
            </div>
            <div
              onBlur={() => setshowDropdown(!showDropdown)}
              id="dropdownHover"
              className={`absolute right-0 top-8 ${
                showDropdown ? "inline-block" : "hidden"
              } bg-[#2e082e83] divide-gray-100 rounded-lg shadow-sm backdrop-blur-3xl`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200 relative"
                aria-labelledby="dropdownHoverButton"
              >
                <li className="z-20 absolute top-0 right-0 p-0.5 rounded-lg hover:bg-[#2e082e83]">
                  <X onClick={() => setshowDropdown(false)} />
                </li>
                <li>
                  <Link
                    href="/login"
                    className="flex p-2 py-2 hover:bg-[#2e082e83] dark:hover:text-white text-left items-center gap-2 w-50"
                  >
                    <User />
                    <span>Manage My Account</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-2 p-2 py-2 hover:bg-[#2e082e83] dark:hover:text-white text-left w-50"
                  >
                    <ShoppingBag />
                    <span>My Orders</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-2 p-2 py-2 hover:bg-[#2e082e83] dark:hover:text-white text-left w-50"
                  >
                    <CircleX />
                    <span>My Cancellations</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sell"
                    className="flex items-center gap-2 p-2 py-2 hover:bg-[#2e082e83] dark:hover:text-white text-left w-50"
                  >
                    <Star />
                    <span>Sell Products</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 p-2 py-2 hover:bg-[#2e082e83] dark:hover:text-white text-left w-50 pointer"
                  >
                    <LogOut />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {showSideSection && <SideSection showMyself={showSideSection} />}
    </div>
  );
};

export default Navbar;
