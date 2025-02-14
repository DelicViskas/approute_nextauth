// import GoodsList from "@/components/GoodsList";
// import { prisma } from "@/prisma/prisma";

import { auth } from "@/auth";
import SignIn from "@/components/Account/SignIn";
import GoodsList, { Good } from "@/components/GoodsList";
// import { prisma } from "@/prisma/prisma";
// import {  Goods } from "@prisma/client";

type shortGood =  {
  goods : Good
  id: number;
  accountId: string;
  goodsId: number;
}


export default async function Home() {
  const
    response = await fetch('https://approute-nextauth.vercel.app/api/favorites'),
    favorites = await response.json();
    // goods = await prisma.goods.findMany();
    // console.log(favorites);
    const session = await auth();
    // const
    //     favorites = await prisma.favorites.findMany({
    //       where: {
    //         accountId: session?.user?.id,
    //       },
    //       include: {
    //         goods: {
    //           select: {
    //             title: true,
    //             price: true,
    //             image: true,
    //           },
    //         },
    //       },
    //     });
    const favoritess = favorites.map((good: shortGood )=> {
      return good.goods
    })
    // console.log(favorites);
    
    
  return (<>
    {!session && <SignIn><button>войти</button></SignIn>}
    {!favorites && session && <h1>добавьте товары в корзину</h1>}
    {favorites && <GoodsList goods={favoritess} />}
  </>
  );
}