"use client"
import useSWR from "swr";
import GoodsList, { Good } from "../GoodsList/GoodsList";
import { fetcher, goodsURL } from "@/swr/fetcher";
import Loading from "@/app/loading";
import { Session } from "next-auth";

export default function GetAllGoods({ session }: { session: Session | null }) {
  const { data, isLoading } = useSWR<Good[]>(goodsURL, fetcher)

  if (isLoading) return <Loading />
  if (data) {
    const favorites: Good[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const upData = session ? data : data.map(good => ({
      ...good,
      isFavorite: favorites.some(fav => fav.id === good.id)
    }))


    return <GoodsList session={session} data={upData} favPage={false}/>
  }
  return <h1>Ошибка загрузки данных...</h1>
}
