import NextAuth from "next-auth"
import { DefaultJWT } from 'next-auth/jwt';

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      provider: string;
    }
  }
}