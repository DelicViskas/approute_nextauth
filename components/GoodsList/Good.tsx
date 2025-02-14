// import { Goods } from "@prisma/client";
// import Image from "next/image";
import type { Good } from "./index";
import classes  from "./good.module.css";

export default function Good({good} : {good: Good}) {
  const  {image, title, price} = good;
  // console.log(price);
  
  return <div className={`${classes.good} cursor-pointer`}>
    <img src={image} width={200} height={300} alt={`Фото ${title}`} />
    <a className={classes.title}>{title}</a>
    {/* <button></button> */}
    <span className={classes.price}>{price} ₽</span>
    </div>
}