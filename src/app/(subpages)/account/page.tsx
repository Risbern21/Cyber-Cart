"use client";
import React, { use } from "react";
import AccountForm from "@/components/account/AccountForm";
import Link from "next/link";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  console.log(session?.user);
  return (
    <div className="px-5 sm:px-20 py-10 text-xs sm:text-base">
      <div className="flex justify-between">
        <div>
          <span className="text-[#4D4D4D]">Home / </span>My Account
        </div>
        <div className="space-x-2">
          <span>Welcome!</span>
          <span className="text-[#D33333]">{session?.user?.name}</span>
        </div>
      </div>
      <div className="flex gap-5 flex-col sm:flex-row mt-5">
        <section className="w-full sm:w-1/3 shadow-sm rounded p-5">
          <ul>
            <li>
              <h1 className="mb-3 font-semibold">Manage My Account</h1>
              <ul className="flex flex-col gap-1 pl-5">
                <li className="text-[#7F7F7F] text-sm hover:text-[#D33333] w-fit">
                  My Profile
                </li>
                <li className="text-[#7F7F7F] text-sm hover:text-[#D33333] w-fit">
                  Address Book
                </li>
                <li className="text-[#7F7F7F] text-sm hover:text-[#D33333] w-fit">
                  My Payment Options
                </li>
              </ul>
            </li>
            <li>
              <Link href={"/cart/cartpage"}>
                <h1 className="my-3 font-semibold">My Orders</h1>
              </Link>
              <ul className="flex flex-col gap-1 pl-5">
                <li className="text-[#7F7F7F] text-sm hover:text-[#D33333] w-fit">
                  My Returns
                </li>
                <li className="text-[#7F7F7F] text-sm hover:text-[#D33333] w-fit">
                  My Cancellations
                </li>
              </ul>
            </li>
            <Link href={"/wishlist"}>
              <li className="my-3 font-semibold">My Wishlist</li>
            </Link>
          </ul>
        </section>
        <AccountForm />
      </div>
    </div>
  );
};

export default page;
