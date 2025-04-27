"use client";
import React, { useState } from "react";
import AccountForm from "@/components/account/AccountForm";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { createPortal } from "react-dom";
import { toast, Toaster } from "sonner";

interface modalProps {
  onClose: () => void;
  Affirm: () => void;
}

const Page = () => {
  const { data: session } = useSession();
  const [showModal, setshowModal] = useState(false);

  const deleteAccount = () => {
    const customer_id = session?.user.customer_id;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      customer_id: customer_id,
    });

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/account`, {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result: { message: string }) =>
        toast(result.message, { duration: 2000 })
      )
      .catch((error) => console.error(error));
    signOut();
    setshowModal(false);
  };

  const Modal = ({ onClose, Affirm }: modalProps) => {
    return createPortal(
      <div className="fixed inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="border border-[#B3B3B3] bg-background/20 backdrop-blur-[6px] rounded navbutton px-4 xs:px-10 sm:px-16 py-8 text-center space-y-8">
          <p className="text-xs sm:text-base">
            Do you really want to delete your account?
          </p>
          <div className="flex items-center justify-center gap-x-8">
            <button
              onClick={() => Affirm()}
              className="px-4 py-2 bg-background border border-[#B3B3B3] rounded-md text-xs sm:text-base hover:bg-[#D33333] hover:text-white"
            >
              Yes
            </button>
            <button
              onClick={() => onClose()}
              className="px-4 py-2 bg-background border border-[#B3B3B3] rounded-md text-xs sm:text-base hover:bg-[#D33333] hover:text-white"
            >
              No
            </button>
          </div>
        </div>
      </div>,
      document.getElementById("modal")!
    );
  };

  return (
    <div className="text-xs sm:text-base">
      <Toaster richColors={true} />
      {showModal && (
        <Modal
          onClose={() => setshowModal(false)}
          Affirm={() => deleteAccount()}
        />
      )}
      {session?.user.customer_id ? (
        <>
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
              <ul className="flex sm:flex-col justify-between">
                <li>
                  <h1 className="mb-3 font-semibold hover:bg-[#F5F5F5] w-fit rounded-md px-1 py-2">
                    Manage My Account
                  </h1>
                  <ul className="flex flex-col gap-1 sm:pl-5">
                    <li className="text-[#7F7F7F] pointer text-xs sm:text-sm hover:text-[#D33333] w-fit">
                      My Profile
                    </li>
                    <li className="text-[#7F7F7F] pointer text-xs sm:text-sm hover:text-[#D33333] w-fit">
                      Address Book
                    </li>
                    <li className="text-[#7F7F7F] pointer text-xs sm:text-sm hover:text-[#D33333] w-fit">
                      My Payment Options
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href={"/cart/cartpage"}>
                    <h1 className="font-semibold hover:bg-[#F5F5F5] w-fit rounded-md px-1 py-2">
                      My Orders
                    </h1>
                  </Link>
                  <ul className="flex flex-col gap-1 sm:pl-5">
                    <li className="text-[#7F7F7F] pointer text-xs sm:text-sm hover:text-[#D33333] w-fit">
                      My Returns
                    </li>
                    <li className="text-[#7F7F7F] pointer text-xs sm:text-sm hover:text-[#D33333] w-fit">
                      My Cancellations
                    </li>
                  </ul>
                </li>
                <li className="my-3 font-semibold hover:bg-[#F5F5F5] rounded-md px-1 py-2 w-fit">
                  <Link href={"/wishlist"}>My Wishlist</Link>
                </li>
                <li>
                  <button
                    className="pointer font-semibold hover:bg-[#F5F5F5] rounded-md px-1 py-2"
                    onClick={() => {
                      setshowModal(true);
                    }}
                  >
                    Delete My Account
                  </button>
                </li>
              </ul>
            </section>
            <AccountForm />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center w-full h-full my-30">
          <Link href={"/login"} className="underline text-black">
            Create new account
          </Link>
          <Link href={"/"}>
            <button className="bg-[#DB4444] pointer text-white px-4 py-2 rounded text-sm mt-5">
              Back To Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
