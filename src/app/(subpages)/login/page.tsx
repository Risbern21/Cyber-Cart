import React from "react";
import Image from "next/image";
import LoginForm from "@/components/login/LoginForm";

const page = () => {
  return (
    <div className="py-20 lg:py-10 flex flex-col-reverse lg:flex-row gap-20 items-center justify-between ">
      <Image
        src={"/loginPageAssets/login.png"}
        alt="phone and cart pic"
        width={700}
        height={700}
      ></Image>
      <div className="flex flex-col w-3/4 jusity-center items-center gap-5">
        <LoginForm/>
      </div>
    </div>
  );
};

export default page;
