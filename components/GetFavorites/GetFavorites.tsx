"use client";

import GoodsList, { GoodsandFav } from "@/components/GoodsList/GoodsList";
import { fetcher, favoritesURL } from "@/swr/fetcher";
// import { useSession } from "next-auth/react";
import useSWR from "swr";
import Loading from "@/app/loading";
import { Session } from "next-auth";
// import { signIn } from "next-auth/react";
// import classes from "./GetFavorites.module.css";

export default function GetFavorites({session}: {session: Session | null}) {
  const { data, error, isLoading } = useSWR(favoritesURL, fetcher);
  if(!session) {
    const favorites: GoodsandFav[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    return <GoodsList session={session} data={favorites} />
  }


  // if(!session) return <button className={classes.sigin} onClick={()=> signIn()}>войти</button>
  if (isLoading) return <Loading />
  if (data?.length > 0) return <GoodsList session={session} data={data} />
  if (error) return <h1>Ошибка загрузки данных...</h1>
  return <h1>Добавьте товары в корзину</h1>
}