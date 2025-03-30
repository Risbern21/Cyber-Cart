import React from "react";
import AccountForm from "@/components/account/AccountForm";

const page = () => {
    return (
        <div className="px-20 py-10">
            <div className="flex justify-between">
                <div className="text">
                    <span className="text-[#4D4D4D]">Home / </span>My Account
                </div>
                <div className="space-x-2">
                    <span>Welcome!</span>
                    <span className="text-[#D33333]">RAAND</span>
                </div>
            </div>
            <div className="mt-10 flex gap-5">
                <section className="w-1/3 shadow-sm rounded p-5">
                    <ul>
                        <li>
                            <h1 className="my-3 font-semibold">Manage My Account</h1>
                            <ul className="flex flex-col gap-1 pl-5">
                                <li className="text-[#7F7F7F] text-sm hover:text-[#D33333] w-fit">My Profile</li>
                                <li className="text-[#7F7F7F] text-sm hover:text-[#D33333] w-fit">Address Book</li>
                                <li className="text-[#7F7F7F] text-sm hover:text-[#D33333] w-fit">My Payment Options</li>
                            </ul>
                        </li>
                        <li>
                            <h1 className="my-3 font-semibold">My Orders</h1>
                            <ul className="flex flex-col gap-1 pl-5">
                                <li className="text-[#7F7F7F] text-sm hover:text-[#D33333] w-fit">My Returns</li>
                                <li className="text-[#7F7F7F] text-sm hover:text-[#D33333] w-fit">My Cancellations</li>
                            </ul>
                        </li>
                        <li className="my-3 font-semibold">My Wishlist</li>
                    </ul>
                </section>
                <AccountForm />
            </div>
        </div>
    );
};

export default page;
