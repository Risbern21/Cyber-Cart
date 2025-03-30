import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/app/db/connectdb";
import User from "@/app/models/UserSchema";

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
            name: user?.name,
            email: user?.email,
          });
        }
        return true;
      }
      return false;
    },
    // async session({ session, user, token }) {
    //     await connectDB();

    //     const currentUser = await User.findOne({ name: session.user?.name });
    //     if(!currentUser){

    //     }
    //   return session;
    // },
  },
});

export { handler as GET, handler as POST };
