import ButtonIcon from "../Button/Button-icon";

import heart from '@/public/heart.svg'
import heartred from '@/public/heart-red.svg'
import classes from "./GoodCard.module.css";
import { Session } from "next-auth";
import { Good } from "./GoodList";




export default function GoodCard({ good, toggleFav, session }: { good: Good, toggleFav: () => void, session: Session | null }) {
  const { image, title, price, isFavorite } = good;

  return <div className={`${classes.good} cursor-pointer`}>
    <img src={image} height={300} alt={`Фото ${title}`} />
    <a className={classes.title}>{title}</a>
    {session && <ButtonIcon onClick={toggleFav} src={isFavorite ? heartred : heart} height={24} width={24} title="избранное" alt="избранное" />}
    <span className={classes.price}>{price} ₽</span>
  </div>
}