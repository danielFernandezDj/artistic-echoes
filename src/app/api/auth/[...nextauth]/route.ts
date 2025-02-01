import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      authorization: { params: { scope: "read:user user:email" } },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session && session.user) {
        (session.user as {id: string}).id = token.sub ?? "";
      }
      return session;
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.email = profile.email;
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
