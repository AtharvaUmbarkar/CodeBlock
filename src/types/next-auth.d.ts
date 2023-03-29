import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    expires: string;
    user: {
      name: string;
      email: string;
      image: string;
      id: string;
      provider: string;
    };
    sessionToken: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: boolean | null,
  }
}
