import { auth } from "@/auth";
import GetAllGoods from "@/components/GetAllGoods/GetAllGoods";
import { SessionProvider } from "next-auth/react";

export default async function Home() {
  const session = await auth();
  // if (session?.user.role === "ADMIN") return <h1>YOU ADMIN</h1>
  return <SessionProvider><GetAllGoods session={session}/></SessionProvider>
}
