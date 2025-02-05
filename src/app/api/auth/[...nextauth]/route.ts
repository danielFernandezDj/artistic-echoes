import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        // Find user in the database
        const user = await prisma.userAuth.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Verify password (assuming passwords are hashed in DB)
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Incorrect password");
        }

        // Return user object for session
        return { id: user.id, email: user.email };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session && session.user) {
        (session.user as { id: string }).id = token.sub ?? "";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
