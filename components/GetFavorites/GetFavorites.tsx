"use client";

import GoodsList, { Good } from "@/components/GoodsList/GoodsList";
import { fetcher, favoritesURL } from "@/swr/fetcher";
import useSWR from "swr";
import Loading from "@/app/loading";
import { Session } from "next-auth";
import { useEffect, useState } from "react";


export default function GetFavorites({ session }: { session: Session | null }) {
  const { data, error, isLoading } = useSWR(favoritesURL, fetcher);
  const [upData, setUpData] = useState<Good[]>([]);

  useEffect(() => {
    const updateData = () => {
      if (!session) {
        const savedFavorites = localStorage.getItem('favorites');
        setUpData(savedFavorites ? JSON.parse(savedFavorites) : []);
      } else {
        setUpData(data || []);
      }
    };

    window.addEventListener('storage', updateData);
    updateData();
  }, [session, data]);
  


  if (isLoading) return <Loading />
  if (error) return <h1>Ошибка загрузки данных...</h1>
  if (upData.length) return <GoodsList session={session} data={upData} favPage={true} />
  return <h1>Добавьте товары в избранное</h1>
}