"use client"
import { Goods } from "@prisma/client";

import { countFavorites, favoritesURL, fetcher, goodsURL } from "@/swr/fetcher";
import Loading from "@/app/loading";
import useSWR, { mutate } from "swr";
import { Session } from "next-auth";
import GoodCard from "./GoodCard";
import ErrorPage from "@/app/error";
export type Good = Goods & {
  isFavorite?: boolean
}
export default function GoodsList({ url, session }: { url: string, session: Session | null }) {
  const { data, error, isLoading } = useSWR<Good[]>(url, fetcher);
  if(!data && url === goodsURL)  mutate(favoritesURL,undefined,false)

  
  const toggleFav = async (good: Good) => {
    const { id, isFavorite } = good;
    if (session) {
      mutate(
        countFavorites,
        (count: number = 0) => isFavorite ? count - 1 : count + 1,
        false)
      mutate(
        url,
        (goods: Good[] = []) => goods.map(good =>
          good.id === id ? {
            ...good,
            isFavorite: !isFavorite
          } : good),
        false)

      try {
        const method = isFavorite ? "DELETE" : "POST";
        const res = await fetch(favoritesURL, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id)
        });
        if (!res.ok) throw new  Error("Ошибка обновления избранного");
      } catch (error) {
        console.error(error);
      }
      if(url === goodsURL) {
        mutate(url)
        mutate(favoritesURL,undefined,false)
      } else {
        mutate(goodsURL,undefined,false)
      }
      mutate(countFavorites)
    }
  }

  if (isLoading) return <Loading />
  if (error) return <ErrorPage  error={error}/>
  if (data?.length) return <div className="grid">
    {data.map(good =>
      <GoodCard good={good} key={good.title} session={session} toggleFav={() => toggleFav(good)} />
    )}
  </div>
  if (url === favoritesURL) 
    return <div className="center">
      <h3>Нет товаров в избранном</h3>
    </div>

}