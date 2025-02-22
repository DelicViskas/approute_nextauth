"use client";

import { myGoodsURL, fetcher } from "@/swr/fetcher";

import GoodsList from "@/components/GoodsList/GoodsList";
import useSWR from "swr";
import Loading from "@/app/loading";


// другое отображение для mygoods

export default function GetMyGoods() {
  const { data, error, isLoading } = useSWR(myGoodsURL, fetcher);
  
  if (isLoading) return <Loading />
  if (data?.length > 0) return <><GoodsList  data={data} /></>
  if (error) return <h1>Ошибка загрузки данных...</h1>
  return <h1>Добавьте товары</h1>
}