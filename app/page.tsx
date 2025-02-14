import GoodsList from "@/components/GoodsList";
// import { prisma } from "@/prisma/prisma";



export default async function Home() {
  const
    responce = await fetch('https://approute-nextauth.vercel.app/api/goods/'),
    goods = await responce.json();
    // goods = await prisma.goods.findMany();
    // console.log(goods);
    
  return (<>
    {goods && <GoodsList goods={goods} />}
  </>
  );
}
