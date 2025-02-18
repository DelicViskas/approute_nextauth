"use client"
import useSWR from "swr";
import GoodsList from "../GoodsList/GoodsList";
import { Goods } from "@prisma/client";
import { fetcher, goodsURL } from "@/swr/fetcher";
import Loading from "@/app/loading";

export default function GetAllGoods() {
  const { data, isLoading } = useSWR<Goods[]>(goodsURL, fetcher)
  console.log(data);
  
  if (isLoading) return <Loading />
  if (data) return <GoodsList data={data}/>
  return <h1>Ошибка загрузки данных...</h1>
}
