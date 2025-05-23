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
import { showSideSectionContext } from "./context/context";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setshowDropdown] = useState(false);
  const [selected, setSelected] = useState<number>(1);
  const [showSideSection, setshowSideSection] = useState(false);

  return (
    <showSideSectionContext.Provider
      value={{ showSideSection, setshowSideSection }}
    >
      <div className="sticky top-0 z-50">
        <div className="flex justify-between px-5 lg:px-20 relative lg:pt-5 py-3  lg:py-4 items-center bordergray bg-white text-black">
          <Link href={"/"}>
            <div
              onClick={() => setSelected(1)}
              className="text-foreground font-semibold lg:text-2xl cursor-pointer text-xl"
            >
              CyberCart
            </div>
          </Link>
          <ul className="ml-4 lg:ml-0 gap-0 lg:gap-3 flex items-center text-xs lg:text-base ">
            <Link
              onClick={() => setSelected(1)}
              href={"/"}
              className="hidden sm:inline-flex"
            >
              <li className="p-2 rounded-xl relative underline-offset-4 ">
                Home
                <div
                  className="h-1 rounded-full"
                  style={{
                    backgroundColor: selected == 1 ? "#7F7F7F" : "white",
                  }}
                />
              </li>
            </Link>
            <Link
              onClick={() => setSelected(2)}
              href={"/contact"}
              className="hidden sm:inline-flex"
            >
              <li className="p-2 rounded-xl relative underline-offset-4 ">
                Contact
                <div
                  className="h-1 bg-[#7F7F7F] rounded-full"
                  style={{
                    backgroundColor: selected == 2 ? "#7F7F7F" : "white",
                  }}
                />
              </li>
            </Link>
            <Link
              onClick={() => setSelected(3)}
              href={"/about"}
              className="hidden sm:inline-flex"
            >
              <li className="p-2 rounded-xl relative underline-offset-4 decoration-3 ">
                About
                <div
                  className="h-1 bg-[#7F7F7F] rounded-full"
                  style={{
                    backgroundColor: selected == 3 ? "#7F7F7F" : "white",
                  }}
                />
              </li>
            </Link>
          </ul>
          <div className="gap-4 items-center flex">
            {!session && (
              <Link href={"/login"}>
                <div className="py-2 my-1 px-4 border border-[#B3B3B3] rounded-lg relative underline-offset-4 text-base hover:bg-[#D33333] hover:text-white">
                  Log In
                </div>
              </Link>
            )}
            {session && (
              <div onClick={() => setSelected(0)}>
                <div className="flex gap-4 items-center">
                  <Link
                    href={"/search"}
                    className="p-2 hover:bg-[#F5F5F5] rounded-full"
                  >
                    <Search strokeWidth={1.5} />
                  </Link>
                  <Link className="hidden sm:inline-flex" href={"/wishlist"}>
                    <Heart strokeWidth={1.5} fill="#D33333" />
                  </Link>
                  <Link
                    href={"/cart/cartpage"}
                    className="hidden sm:inline-flex p-2 hover:bg-[#F5F5F5] rounded-full"
                  >
                    <ShoppingCart strokeWidth={1.5} />
                  </Link>
                  <span className="cursor-pointer peer">
                    <CircleUserRound
                      strokeWidth={1.5}
                      onBlur={() => setshowDropdown(!showDropdown)}
                      onClick={() => setshowDropdown(!showDropdown)}
                    />
                  </span>
                  <span className="text-black hidden peer-hover:inline-block z-40 bg-[#F5F5F5] absolute right-10 top-15 p-2 rounded">
                    {session.user.name}
                  </span>
                  <span>
                    <AlignJustify
                      className="sm:hidden cursor-pointer"
                      onClick={() => setshowSideSection(!showSideSection)}
                    />
                    <SideSection />
                  </span>
                </div>
                <div
                  id="dropdownHover"
                  className={`absolute right-15 sm:right-8 lg:right-23 top-13 sm:top-15 ${
                    showDropdown ? "inline-block" : "hidden"
                  } bg-[#2e082e83] divide-gray-100 rounded-lg shadow-sm backdrop-blur-3xl`}
                >
                  <ul
                    className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 relative"
                    aria-labelledby="dropdownHoverButton"
                  >
                    <li className="z-20 w-fit top-0 left-0 p-0.5 rounded-lg hover:bg-[#2e082e83]">
                      <X onClick={() => setshowDropdown(false)} />
                    </li>
                    <li>
                      <Link
                        href="/account"
                        className="flex p-2 py-2 hover:bg-[#2e082e83] dark:hover:text-white text-left items-center gap-2 w-50"
                      >
                        <User />
                        <span>Manage My Account</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/orders/${session.user.customer_id}`}
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
                    <li
                      onClick={() => {
                        signOut();
                      }}
                    >
                      <button className="flex items-center gap-2 p-2 py-2 hover:bg-[#2e082e83] dark:hover:text-white text-left w-50 pointer rounded-b-lg">
                        <LogOut />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </showSideSectionContext.Provider>
  );
};

export default Navbar;
