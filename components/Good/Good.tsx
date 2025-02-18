import classes from "./good.module.css";
import { favoritesURL } from "@/swr/fetcher";
import ButtonIcon from "../Button/Button-icon";
import Image from "next/image";
import heart from '@/public/heart.svg'
import heartred from '@/public/heart-red.svg'
import { Goods } from "@prisma/client";

type GoodsandFav = Goods & {
  isFavorite?: boolean
}

export default function Good({ good }: { good: GoodsandFav }) {
  // console.log(good);
  const { image, title, price, isFavorite } = good;
  const addFavorites = async () => {
    await fetch(favoritesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(good)
    });
  }
  
  
  return <div className={`${classes.good} cursor-pointer`}>
    <img src={image} height={300} alt={`Фото ${title}`} />
    <a className={classes.title}>{title}</a>
    <ButtonIcon><Image onClick={addFavorites} src={isFavorite? heartred : heart } height={24} width={24} title="избранное" alt="избранное" /></ButtonIcon>
    <span className={classes.price}>{price} ₽</span>
  </div>
}
