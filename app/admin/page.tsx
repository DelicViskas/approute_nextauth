import { auth } from "@/auth";
import AdminPanel from "@/components/Admin";


export default async function Home() {
  const session = await auth();


  return <AdminPanel session={session}/>
}