"use client";

import { mynoticesURL, fetcher } from "@/swr/fetcher";

import GoodsList from "@/components/GoodsList/GoodsList";

// import { useSession } from "next-auth/react";
import useSWR from "swr";

import Loading from "../loading";


export default function Home() {
  const { data, error, isLoading } = useSWR(mynoticesURL, fetcher);
  console.log(data);

  // const session = useSession();

  // if(!session.data) return <h1>Войдите</h1>
  if (isLoading) return <Loading />
  if (data?.length > 0) return <><GoodsList data={data} /></>
  if (error) return <h1>Ошибка загрузки данных...</h1>
  return <h1>Добавьте товары</h1>

}