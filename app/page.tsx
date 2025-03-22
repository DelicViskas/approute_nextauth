import { auth } from "@/auth";
import GetAllGoods from "@/components/GetAllGoods/GetAllGoods";


export default async function Home() {
  const session = await auth();

  return <GetAllGoods session={session}/>
}
