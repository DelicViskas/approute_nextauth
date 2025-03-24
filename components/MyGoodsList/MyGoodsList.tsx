import { Goods } from "@prisma/client";
import MyGood from "./myGoodCard";


export default function MyGoodsList({ data } : {data : Goods[]}) {

  return <>
    {data.map(good =>
      <MyGood good={good} key={good.title} />
    )}
  </>

}