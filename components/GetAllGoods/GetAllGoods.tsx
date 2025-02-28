"use client"
import useSWR from "swr";
import GoodsList from "../GoodsList/GoodsList";
import { Goods } from "@prisma/client";
import { fetcher, goodsURL } from "@/swr/fetcher";
import Loading from "@/app/loading";
import { Session } from "next-auth";

export default function GetAllGoods({session}: {session: Session | null}) {
  const { data, isLoading } = useSWR<Goods[]>(goodsURL, fetcher)
  console.log(data);
  
  if (isLoading) return <Loading />
  if (data) return <div className="grid"><GoodsList session={session} data={data}/></div>
  return <h1>Ошибка загрузки данных...</h1>
}
