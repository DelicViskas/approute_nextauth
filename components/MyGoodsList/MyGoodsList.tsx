import { Goods } from "@prisma/client";
import MyGood from "./MyGood";


export type GoodsandFav = Goods & {
  isFavorite?: boolean
}

// export type Good = {
//   image: string,
//   title: string,
//   price: number,
//   id: number
// }

export default function MyGoodsList({ data } : {data : GoodsandFav[]}) {

  return <>
    {data.map(good =>
      <MyGood good={good} key={good.title} />
    )}
  </>

}