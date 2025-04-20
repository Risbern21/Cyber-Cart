import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db/mongodb/connectdb";
import User from "@/app/models/UserSchema";
import { v4 as uuidv4 } from "uuid";
import pool from "@/lib/db/pgsql/connectdb";
import { UserData } from "@/types";

type user = {
  customer_id: string;
  name: string;
  email: string;
};

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials, email }) {
      if (account?.provider == "github" || "google") {
        await connectDB();

        const db_user = await User.findOne({ email: user?.email });
        if (!db_user) {
          const result: UserData = await User.create({
            customer_id: uuidv4(),
            name: user?.name,
            email: user?.email,
            address: "",
          });

          try {
            const newCart = await pool.query(
              "INSERT INTO cart (customer_id,product_ids) VALUES ($1,$2) RETURNING *",
              [result.customer_id, []]
            );
          } catch (error) {
            console.log(error);
          }
        }
        return true;
      }
      return false;
    },
    async session({ session, user, token }) {
      await connectDB();
      const currentUser: user | null = await User.findOne({
        email: session.user?.email,
      });
      if (currentUser) {
        session.user.customer_id = currentUser?.customer_id;
        session.user.name = currentUser.name;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
