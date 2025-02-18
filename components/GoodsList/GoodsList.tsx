import { Goods } from "@prisma/client";
import Good from "../Good/Good";


// export type Good = {
//   image: string,
//   title: string,
//   price: number,
//   id: number
// }

export default function GoodsList({data} : {data: Goods[]}) {
 return <>
    {data.map(good =>
      <Good good={good} key={good.title} />
    )}
  </>

}