import NextAuth, { NextAuthOptions } from "next-auth";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "src/lib/mongodb";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      id: "google",
      name: "Google",
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      id: "github",
      name: "Github",
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
      let response: any = await fetch(
        process.env.ROOT_URL + "/api/auth/get-current-provider",
        {
          method: "POST",
          body: JSON.stringify({ id: user.id }),
          headers: { "Content-Type": "application/json" },
        }
      );
      response = await response.json();

      session.user.id = user.id;
      session.user.provider = response.provider;
      return session;
    },
    async signIn({ account, user }) {
      let response: any = await fetch(
        process.env.ROOT_URL + "/api/user/create-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            authID: user.id,
            name: user.name,
            email: user.email,
            profilePictureLink: user.image,
            provider: account?.provider,
            providerAccountID: account?.providerAccountId,
          }),
        }
      );
      response = await response.json();
      return user ? true : false;
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
