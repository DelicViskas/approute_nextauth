import { auth } from "@/auth";
import GoodsList from "@/components/GoodList/GoodList";
import { goodsURL } from "@/swr/fetcher";




export default async function Home() {
  const session = await auth();


  return <GoodsList session={session} url={goodsURL} />
}
