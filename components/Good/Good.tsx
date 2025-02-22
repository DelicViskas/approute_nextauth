import classes from "./good.module.css";
import { favoritesURL } from "@/swr/fetcher";
import ButtonIcon from "../Button/Button-icon";
import heart from '@/public/heart.svg'
import heartred from '@/public/heart-red.svg'
import { GoodsandFav } from "../GoodsList/GoodsList";
import { Session } from "next-auth";



export default function Good({ good, session }: { good: GoodsandFav, session?: Session | null }) {
  const { image, title, price, isFavorite } = good;

  const addFavorites = async () => {
    if (session) {
      await fetch(favoritesURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(good)
      });
    } else {
      let favorites: GoodsandFav[] = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (favorites.some(g => good.id === g.id)) {
        favorites = favorites.filter(g => good.id !== g.id)
      } else {
        good.isFavorite = !isFavorite
        favorites.push(good);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }


  return <div className={`${classes.good} cursor-pointer`}>
    <img src={image} height={300} alt={`Фото ${title}`} />
    <a className={classes.title}>{title}</a>
    <ButtonIcon onClick={addFavorites} src={isFavorite ? heartred : heart} height={24} width={24} title="избранное" alt="избранное" ></ButtonIcon>
    <span className={classes.price}>{price} ₽</span>
  </div>
}
