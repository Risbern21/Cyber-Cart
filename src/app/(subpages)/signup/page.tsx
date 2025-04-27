import React from "react";
import Image from "next/image";
import SignupForm from "@/components/signup/SignupForm";

const Page = () => {
  return (
    <div className="py-10 flex justify-between items-center">
      <Image
        src={"/loginPageAssets/login.png"}
        alt="phone and cart pic"
        width={700}
        height={700}
      ></Image>
      <div className="flex flex-col w-3/4 jusity-center items-center gap-5">
        <h1 className="font-semibold text-3xl">Create An Account</h1>
        <SignupForm />
      </div>
    </div>
  );
};

export default Page;
