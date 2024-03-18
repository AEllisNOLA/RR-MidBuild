import NextAuth, { Account, Profile, User } from 'next-auth';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import UserModel from '@/models/User';
import connectDb from '@/utils/connectDb';
import { Adapter } from 'next-auth/adapters';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Name',
          type: "text"
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        await connectDb();
        const user = await UserModel.findOne({ email: credentials!.email });
        if (!user) {
          throw new Error("That e-mail address is not registered.")
        }
        const passwordCheck = await bcrypt.compare(credentials!.password, user.password
        )
        if(!passwordCheck) {
          ("Password is not correct");
        }
        return user;
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async session({ session, user, token }: {
      session: any; user: any; token: JWT;
    }) {
      if (session.user) {
        session.user.provider = token.provider;

      }
      return session
    },




    async jwt({ token, user, account, profile, isNewUser }: {
      token: JWT;
      user?: User | Adapter | undefined;
      account?: Account | null | undefined;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }) {
      if (user) {
        token.provider = account!.provider
      }
      return token;
    }
  }
})