"use client";
import React from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession, signIn, signOut } from "next-auth/react";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div className="bg-[#DB4444] rounded p-2 text-white">
          Signed in as {session.user?.email}
        </div>
        <button
          className="w-fit hover:bg-[#DB4444] rounded p-2 border border-[#B3B3B3] hover:border-none hover:text-white"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h1 className="font-semibold text-3xl mb-5">Login to CyberCart</h1>
      <button
        onClick={() => signIn("google")}
        className="w-fit text-sm gap-2 border pointer border-[#B3B3B3] px-4 py-2.5 font-medium hover:bg-[#bfbebe] rounded-lg text-center inline-flex items-center"
      >
        <Image
          src={"/Google.svg"}
          alt="google logo"
          width={15}
          height={15}
        ></Image>
        <span className="text-sm">Sign In With Google</span>
      </button>
      <button
        onClick={() => signIn("github")}
        type="button"
        className="w-fit text-white bg-[#24292F] pointer hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30"
      >
        <svg
          className="w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
            clipRule="evenodd"
          />
        </svg>
        Sign in with Github
      </button>
    </div>
  );
};

export default LoginForm;
