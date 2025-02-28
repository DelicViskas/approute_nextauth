"use client";

import { myGoodsURL, fetcher } from "@/swr/fetcher";


import useSWR from "swr";
import Loading from "@/app/mygoods/loading";
import MyGoodsList from "../MyGoodsList/MyGoodsList";


// другое отображение для mygoods

export default function GetMyGoods() {
  const { data, error, isLoading } = useSWR(myGoodsURL, fetcher);
  console.log(data);
  
  
  if (isLoading) return <Loading />
  if (data?.length > 0) return <><MyGoodsList data={data} /></>
  if (error) return <h1>Ошибка загрузки данных...</h1>
  return <h1>Добавьте товары</h1>
}