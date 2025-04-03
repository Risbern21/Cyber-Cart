import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/app/db/mongodb/connectdb";
import User from "@/app/models/UserSchema";
import { v4 as uuidv4 } from "uuid";

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

        const db_user = await User.findOne({ name: user?.name });
        if (!db_user) {
          await User.create({
            customer_id: uuidv4(),
            name: user?.name,
            email: user?.email,
          });
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
        (session.user as user).customer_id = currentUser?.customer_id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
