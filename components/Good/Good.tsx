import classes from "./good.module.css";
import { favoritesURL, goodsURL } from "@/swr/fetcher";
import ButtonIcon from "../Button/Button-icon";
import heart from '@/public/heart.svg'
import heartred from '@/public/heart-red.svg'
import { Session } from "next-auth";
import { mutate } from "swr";
import type { Good } from "../GoodsList/GoodsList";



export default function Good({ good, session, favPage }: { good: Good, session?: Session | null, favPage?: boolean }) {
  const { id, image, title, price, isFavorite } = good;

  const toggleFav = async () => {
    if (session) {
      mutate(
        favPage ? favoritesURL : goodsURL,
        favPage ?(goods: Good[] = []) => goods.filter(g => g.id !== good.id) : (goods: Good[] = []) => goods.map(good =>
          good.id === id ? {
            ...good,
            isFavorite: !isFavorite
          } : good),
        false);
      try {
        const method = isFavorite ? "DELETE" : "POST";
        const res = await fetch(favoritesURL, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id)
        });
        if (!res.ok) throw new Error("Ошибка обновления избранного");
      } catch (error) {
        console.error(error);
      } finally {
        mutate(favPage ? favoritesURL : goodsURL);
      }
    } else {
      let favorites: Good[] = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (favorites.some(g => id === g.id)) {
        favorites = favorites.filter(g => id !== g.id)
      } else {
        favorites.push({ ...good, isFavorite: !isFavorite });
      }
      localStorage.setItem('favorites', JSON.stringify(favorites))

      mutate(
        favPage ? favoritesURL : goodsURL,
        favPage ? favorites : (data: Good[] = []) => data.map(good =>
        ({
          ...good,
          isFavorite: favorites.length ? favorites.some(fav => fav.id === good.id) : isFavorite
        }))
        , false);
    }
  }


  return <div className={`${classes.good} cursor-pointer`}>
    <img src={image} height={300} alt={`Фото ${title}`} />
    <a className={classes.title}>{title}</a>
    <ButtonIcon onClick={toggleFav} src={isFavorite ? heartred : heart} height={24} width={24} title="избранное" alt="избранное" ></ButtonIcon>
    <span className={classes.price}>{price} ₽</span>
  </div>
}
