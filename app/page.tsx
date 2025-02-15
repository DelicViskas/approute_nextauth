"use client";
import GoodsList from "@/components/GoodsList";
import { fetcher, goodsURL } from "@/swr/fetcher";
import { Goods } from "@prisma/client";
import useSWR from "swr";




export default function Home() {
  const {data, isLoading} = useSWR<Goods[]>(goodsURL, fetcher)

  if(isLoading) return <h1>Загрузка данных...</h1>
  if(data) return <GoodsList goods={data} />
  return <h1>Ошибка загрузки данных...</h1>
}
