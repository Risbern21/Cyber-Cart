"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const SignupForm = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Name"
        {...register("name", { required: true, maxLength: 80 })}
        className="border-b-2 border-b-[#B3B3B3] px-4 py-2"
      />
      <input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: true,
          min: 5,
          pattern: /^\S+@\S+$/i,
        })}
        className="border-b-2 border-b-[#B3B3B3] px-4 py-2"
      />
      <input
        type="Password"
        placeholder="Password"
        {...register("password", { required: true, min: 8, maxLength: 20 })}
        className="border-b-2 border-b-[#B3B3B3] px-4 py-2"
      />

      <input
        type="submit"
        value={"Create Account"}
        className="bg-[#DB4444] text-white p-2 rounded text-sm mt-5"
      />
      <button className="flex gap-2 border border-[#B3B3B3] p-2 rounded-sm justify-center items-center pointer">
        <Image
          src={"/Google.svg"}
          alt="google logo"
          width={15}
          height={15}
        ></Image>
        <span className="text-sm">Sign Up With Google</span>
      </button>
      <div className="text-[#4D4D4D] text-center">
        Already Have An Account?{" "}
        <span className="underline underline-offset-6">Log in</span>
      </div>
    </form>
  );
};

export default SignupForm;
