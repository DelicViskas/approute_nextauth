import NextAuth, { Session, User } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/prisma"
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { JWT } from "next-auth/jwt";

type CustomUser = User & {
  role?: string
}
type CustomSession = Session & {
  role?: string
}
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
          if ('1' === credentials?.username )
            return await prismaDB.user.findFirst({ where: { id: 'cm7dds9dm0000xf4kacz3bp3i' } });
          if ('admin' === credentials?.username )
            return await prismaDB.user.findFirst({ where: { id: 'cm7ddsa5u0005xf4ktvtekkv7' } });
          
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: CustomUser}) {
      if (user) {
        token.id = user.id;
        token.role = user?.role; 
      }
      
      return token;
    },
    async session({ session, token }: { token: JWT; session: CustomSession}) {
      if (session.user ){
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      // console.log("session:", session.user);
      return session;
    },
  }
})