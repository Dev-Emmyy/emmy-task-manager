// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions, type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/libs/prisma";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Define auth options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id.toString(), // Convert numeric ID to string
          email: user.email ?? "",
          name: user.name ?? undefined, // Convert null to undefined
        };
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email ?? "",
          name: user.name ?? undefined,
        };
        token.accessToken = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET as string,
          { expiresIn: "7h" }
        );
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (token.user) {
        session.user = token.user;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Export the handler for App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };