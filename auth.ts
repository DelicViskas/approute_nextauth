import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/prisma"
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import Google from "next-auth/providers/google"
// import Yandex from "next-auth/providers/yandex"
// import Vk from "next-auth/providers/vk"
import GitHub from "next-auth/providers/github"


const prismaDB = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GitHub,
    Google,
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        console.log('credentials', credentials);
        switch (true) {
          case ('1' === credentials?.username && '1' === credentials.password):
            return await prismaDB.user.findFirst({ where: { id: 'cm74ro0ft0000xfxrx6beyudf' } });
          case ('2' === credentials?.username && '2' === credentials.password):
            return await prismaDB.user.findFirst({ where: { id: 'cm74ro0ft0001xfxrg0y1b6xd' } });
          case ('3' === credentials?.username && '3' === credentials.password):
            return await prismaDB.user.findFirst({ where: { id: 'cm74ro0ft0002xfxrji7w69q4' } });
          case ('4' === credentials?.username && '4' === credentials.password):
            return await prismaDB.user.findFirst({ where: { id: 'cm74ro0ft0004xfxrbwe9jdbs' } });
          case ('5' === credentials?.username && '5' === credentials.password):
            return await prismaDB.user.findFirst({ where: { id: 'cm74ro0ft0003xfxrfd9rlzq8' } });
        }
 
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
      }
      // console.log("jwt:", token);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      // console.log("session:", session.user);
      return session;
    },
  }
})