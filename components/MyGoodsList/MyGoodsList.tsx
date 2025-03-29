"use client";

import { myGoodsURL, fetcher } from "@/swr/fetcher";


import useSWR from "swr";
import Loading from "@/app/mygoods/loading";
import MyGood from "../MyGoodsList/myGoodCard";
import { Goods } from "@prisma/client";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import ErrorPage from "@/app/error";


export default function MyGoodsList() {
  const { data, error, isLoading } = useSWR<Goods[]>(myGoodsURL, fetcher);
  const router = useRouter();
  if (isLoading) return <Loading />;
  if (error) return <ErrorPage  error={error}/>
  if (data?.length === 0) 
    return <div className="center">
      <Button onClick={()=> router.push('/creategood')}>Создать объявление</Button>  
    </div>

  
  return <>
      {data?.map((good) => (
        <MyGood key={good.id} good={good}
        />
      ))}
    </>

}