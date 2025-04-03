import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      customer_id: string;
      name: string;
      email: string;
    };
  }
}
