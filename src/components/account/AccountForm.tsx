"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  currentpassword: string;
  newpassword: string;
  confirmpassword: string;
};

export default function AccountForm() {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-3 w-full sm:w-2/3 shadow-sm rounded p-5"
    >
      <h1 className="text-[#D33333]">Edit Your Details</h1>
      <div className="flex flex-col space-y-4 mb-5">
        <span className="w-full space-y-2">
          <h2>First Name:</h2>
          <input
            type="text"
            placeholder="Firstname"
            {...register("firstname", { required: true, maxLength: 80 })}
            className="bg-[#F5F5F5] rounded text-black p-4 w-full"
          />
        </span>
        <span className="flex space-x-4">
          <span className="w-1/2 space-y-2">
            <h2>Email:</h2>
            <input
              type="text"
              placeholder="Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              className="bg-[#F5F5F5] rounded text-black p-4 w-full"
            />
          </span>
          <span className="w-1/2 space-y-2">
            <h2>Address:</h2>
            <input
              type="text"
              placeholder="Address"
              {...register("address", { required: true })}
              className="bg-[#F5F5F5] rounded text-black p-4 w-full"
            />
          </span>
        </span>
      </div>
      <h2>Password Changes:</h2>
      <input
        type="password"
        placeholder="Current Password"
        {...register("currentpassword", { required: true, maxLength: 15 })}
        className="bg-[#F5F5F5] rounded text-black p-4 w-full"
      />
      <input
        type="password"
        placeholder="New Password"
        {...register("newpassword", { required: true, maxLength: 15 })}
        className="bg-[#F5F5F5] rounded text-black p-4 w-full"
      />
      <input
        type="password"
        placeholder="Cofirm New Password"
        {...register("confirmpassword", { required: true, maxLength: 15 })}
        className="bg-[#F5F5F5] rounded text-black p-4 w-full"
      />
      <div className="w-fit self-end space-x-4">
        <button className="hover:bg-[#F5F5F5] px-5 py-2 rounded pointer">
          Cancel
        </button>
        <input
          type="submit"
          className="bg-[#d33333] text-white  px-5 py-2 rounded text-sm"
          value={"Save Changes"}
        />
      </div>
    </form>
  );
}
