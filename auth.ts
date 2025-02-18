import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/prisma"
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import Google from "next-auth/providers/google"
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
          if ('1' === credentials?.username && '1' === credentials.password)
            return await prismaDB.user.findFirst({ where: { id: 'cm74ro0ft0000xfxrx6beyudf' } });
          
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) 
        token.id = user.id; 
      console.log(user);
      
      // console.log("jwt:", token);
      return token;
    },
    async session({ session, token }) {
      if (session.user)
        session.user.id = token.id as string;
      // console.log("session:", session.user);
      return session;
    },
  }
})