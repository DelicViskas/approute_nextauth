// import { Goods } from "@prisma/client";
import Good from "./Good";

export type Good = {
  image: string, 
  title: string, 
  price: number
}

export default function GoodsList({goods} : {goods: Good[]}) {
  // console.log(goods);
  
  return <>
    {goods.map(good => 
      <Good good={good} key={good.title}/>
    )}
    </>
  
}