
import { auth } from "@/auth";
import GetFavorites from "@/components/GetFavorites/GetFavorites";


export default async function Home() {
  const session = await auth();

  return <GetFavorites session={session}/>
}