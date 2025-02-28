import classes from "./myGoodCard.module.css";
import { GoodsandFav } from "../GoodsList/GoodsList";



export default function MyGood({ good } : {good: GoodsandFav}) {
  const { description,created, image, title, price } = good;

  return <><div className={`${classes.good}`}>
    <img src={image} height={300} alt={`Фото ${title}`} />
    <div>
      <span className={classes.title}>{title}</span>
      <span className={classes.price}>{price} ₽</span>
      <span className={classes.description}>{description}</span>
      <span className={classes.created}>Создано: {new Date(created).toLocaleDateString("ru-ru")}</span>
    </div>
    <button>Удалить</button>
    <button>Редактировать</button>
  </div>
    <hr /></>
}
