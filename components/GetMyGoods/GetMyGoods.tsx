"use client";

import { myGoodsURL, fetcher } from "@/swr/fetcher";


import useSWR from "swr";
import Loading from "@/app/mygoods/loading";
import MyGood from "../MyGoodsList/myGoodCard";
import { Goods } from "@prisma/client";




export default function GetMyGoods() {
  const { data, error, isLoading } = useSWR<Goods[]>(myGoodsURL, fetcher);

  if (isLoading) return <Loading />;
  if (error) return <h1>Ошибка загрузки данных...</h1>;
  if (data?.length === 0) return <h1>Добавьте товары</h1>;

  
  return <>
      {data?.map((good) => (
        <MyGood key={good.id} good={good}
        />
      ))}
    </>
}

