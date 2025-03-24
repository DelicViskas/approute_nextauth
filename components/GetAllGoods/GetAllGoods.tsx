"use client"
import useSWR from "swr";
import GoodsList, { Good } from "../GoodsList/GoodsList";
import { fetcher, goodsURL } from "@/swr/fetcher";
import Loading from "@/app/loading";
import { Session } from "next-auth";
import { useEffect, useState } from "react";


export default function GetAllGoods({ session }: { session: Session | null }) {
  const { data, isLoading } = useSWR<Good[]>(goodsURL, fetcher)
  const [upData, setUpData] = useState<Good[]>([]);

  useEffect(() => {
    const updateData = () => {
      if (!session) {
        const favorites: Good[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        const updata = data?.map(good => ({
          ...good,
          isFavorite: favorites.some(fav => fav.id === good.id)
        })) || []
        setUpData(updata)
      } else {
        setUpData(data || []);
      }
    };

    window.addEventListener('storage', updateData);
    updateData();
  }, [session, data]);


  if (isLoading) return <Loading />
  if (upData) return <GoodsList session={session} data={upData} favPage={false} />
  return <h1>Ошибка загрузки данных...</h1>
}
