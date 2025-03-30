"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { Toaster, toast } from "sonner";

type FormValues = {
  to_name: string;
  from_name: string;
  message: string;
  reply_to: string;
};

const ContactForm = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const { register, handleSubmit } = useForm<FormValues>();

  const sendEmail = (params: FormValues) => {
    const toastId = toast.loading("Sending Your Message,Please Wait...");
    emailjs
      .send(
        `${process.env.NEXT_PUBLIC_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`,
        params,
        {
          publicKey: `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
          limitRate: {
            throttle: 5000,
          },
        }
      )
      .then(
        () => {
          toast.success(
            "We've received your message!!,We will get back to you soon",
            {
              id: toastId,
              duration: 2000,
            }
          );
        },
        (error) => {
          toast.error("Oops something went wrong :(", {
            id: toastId,
            duration: 2000,
          });
        }
      );
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const templateParams: FormValues = {
      to_name: "Cyber Cart",
      from_name: data.to_name,
      reply_to: data.reply_to,
      message: data.message,
    };
    sendEmail(templateParams);
  };
  return (
    <div className="w-full lg:w-3/4 shadow-sm rounded p-5">
      <Toaster richColors={true} />
      <form
        ref={form}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Your Name*"
            {...register("to_name", { required: true, maxLength: 80 })}
            className="bg-[#F5F5F5] rounded text-black w-1/2 lg:w-1/3 p-4"
          />
          <input
            type="text"
            placeholder="Your Email*"
            {...register("reply_to", { required: true, pattern: /^\S+@\S+$/i })}
            className="bg-[#F5F5F5] rounded text-black w-1/2 lg:w-1/3 p-4"
          />
        </div>
        <textarea
          placeholder="Your Message*"
          {...register("message", {
            required: true,
            min: 5,
            maxLength: 300,
          })}
          className="bg-[#F5F5F5] rounded text-black w-full p-4 resize-none h-50"
        />
        <input
          type="submit"
          className="bg-[#d33333] text-white  w-fit px-5 py-2 rounded text-sm self-end"
          value={"Send Message"}
        />
      </form>
    </div>
  );
};

export default ContactForm;
