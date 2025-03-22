import { Goods } from "@prisma/client";

import Good from "../Good/Good";
import { Session } from "next-auth";

export type Good = Goods & {
  isFavorite?: boolean
}

export default function GoodsList({ data, session, favPage }: { data: Good[], session?: Session | null, favPage?: boolean }) {


  return <div className="grid">
    {data.map(good =>
      <Good session={session} good={good} key={good.title} favPage={favPage}/>
    )}
  </div>

}