// types/next-auth.d.ts
import { User as DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email: string;
    };
    accessToken?: string;
  }

  interface User extends DefaultUser {
    id: string; // Ensure id is string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string;
      name?: string;
      email: string;
    };
    accessToken?: string;
  }
}