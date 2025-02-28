import { Goods } from "@prisma/client";

import Good from "../Good/Good";
import { Session } from "next-auth";

export type GoodsandFav = Goods & {
  isFavorite?: boolean
}

// export type Good = {
//   image: string,
//   title: string,
//   price: number,
//   id: number
// }

export default function GoodsList({ data, session }: { data: GoodsandFav[],session?: Session | null }) {
  let goodsList:GoodsandFav[];
  if (!session) {
    const favorites: GoodsandFav[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    goodsList = data.map((good) => {
      const favorite = favorites.find(g => g.id === good.id)
      return favorite ? { ...favorite } : good;
    })
  } else {
    goodsList = data;
  }

  return <>
    {goodsList.map(good =>
      <Good session={session} good={good} key={good.title} />
    )}
  </>

}