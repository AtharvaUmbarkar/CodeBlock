import NextAuth, { NextAuthOptions } from "next-auth";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "src/lib/mongodb";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "database",
    maxAge: 3600 * 24 * 5,
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  theme: {
    colorScheme: "light",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
};
export default NextAuth(authOptions);
