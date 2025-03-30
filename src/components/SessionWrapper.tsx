"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type SessionProps = {
  children: ReactNode;
};

export default function SessionWrapper({ children }: SessionProps) {
  return <SessionProvider>{children}</SessionProvider>;
}