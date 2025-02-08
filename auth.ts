import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/prisma"
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import Google from "next-auth/providers/google"
import Yandex from "next-auth/providers/yandex"
import Vk from "next-auth/providers/vk"
// import GitHub from "next-auth/providers/github"


const prismaDB = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    // GitHub,
    Yandex,
    Vk,
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

        if ('1' === credentials?.username && '1' === credentials.password) {
          const user = await prismaDB.user.findFirst({ where: { id: '1' } });
          console.log('authorize user=', user);
          return user;
        }
        return null;
      }
    })
  ]
  
})