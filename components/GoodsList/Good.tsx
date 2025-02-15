import type { Good } from "./index";
import classes  from "./good.module.css";
import { favoritesURL } from "@/swr/fetcher";

export default function Good({good} : {good: Good}) {
  const  {image, title, price, id} = good;
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
    <img src={image} width={200} height={300} alt={`Фото ${title}`} />
    <a className={classes.title}>{title}</a>
    <button onClick={addFavorites}>Добавить в избранное{id}</button>
    <span className={classes.price}>{price} ₽</span>
    </div>
}