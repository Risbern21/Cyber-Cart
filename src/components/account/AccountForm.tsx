"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "sonner";

type FormValues = {
  name: string;
  email: string;
  address: string;
};

export default function AccountForm() {
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    localStorage.setItem(
      "billingDetails",
      JSON.stringify({
        customer_id: session?.user.customer_id,
        name: data.name,
        address: data.address,
        email: session?.user.email,
      })
    );

    // console.log("hello");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      customer_id: session?.user.customer_id,
      name: data.name,
      address: data.address,
    });

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/account`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result: { message: string }) => {
        // console.log(result);
        toast.success(result.message, {
          duration: 2000,
        });
      })
      .catch((error) => console.error(error));

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-3 w-full sm:w-2/3 shadow-sm rounded p-5"
    >
      <Toaster richColors={true} />
      <h1 className="text-[#D33333]">Edit Your Details</h1>
      <div className="flex flex-col space-y-4 mb-5">
        <span className="w-full space-y-2">
          <h2>First Name:</h2>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true, maxLength: 80 })}
            className="bg-[#F5F5F5] rounded text-black p-4 w-full"
          />
        </span>
        <span className="w-full space-y-2">
          <h2>Address:</h2>
          <input
            type="text"
            placeholder="Address"
            {...register("address", { required: true })}
            className="bg-[#F5F5F5] rounded text-black p-4 w-full"
          />
        </span>
      </div>
      <div className="w-fit self-end space-x-4">
        <button className="hover:bg-[#F5F5F5] px-5 py-2 rounded pointer">
          Cancel
        </button>
        <input
          type="submit"
          className="bg-[#d33333] text-white pointer px-5 py-2 rounded text-sm"
          value={"Save Changes"}
        />
      </div>
    </form>
  );
}
