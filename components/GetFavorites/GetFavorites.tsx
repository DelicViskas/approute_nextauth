"use client";

import GoodsList, { Good } from "@/components/GoodsList/GoodsList";
import { fetcher, favoritesURL } from "@/swr/fetcher";
import useSWR from "swr";
import Loading from "@/app/loading";
import { Session } from "next-auth";

export default function GetFavorites({ session }: { session: Session | null }) {
  const { data, error, isLoading } = useSWR(favoritesURL, fetcher);
  const upData: Good[] = session? data : JSON.parse(localStorage.getItem('favorites') || '[]')
  if (isLoading) return <Loading />
  if (error) return <h1>Ошибка загрузки данных...</h1>
  if (upData.length) return <GoodsList session={session} data={upData} favPage={true}/>
  return <h1>Добавьте товары в избранное</h1>
}