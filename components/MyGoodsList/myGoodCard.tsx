import classes from "./myGoodCard.module.css";
import { Good } from "../GoodsList/GoodsList";
import removeIcon from "@/public/close.svg";
import editIcon from "@/public/edit.svg";
import ButtonIcon from "../Button/Button-icon";
import { myGoodsURL } from "@/swr/fetcher";
import { useState } from "react";
import PopUpWindow from "../PopUpWindow/PopUpWindow";
import Confirm from "../Confirm";
import { mutate } from "swr";




export default function MyGood({ good }: { good: Good }) {
  const [popupConfirmActive, setPopupConfirmActive] = useState(false);
  // const [popupEditActive, setPopupEditActive] = useState(false);
  const { id, description, created, image, title, price } = good;
  const removeGood = async () => {
    try {
      mutate(myGoodsURL,(goods: Good[] = []) => goods.filter(g => g.id !== id), false)
      const res = await fetch(myGoodsURL, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error("Ошибка удаления");
    } catch (error) {
      console.error(error);
    } finally {
      setPopupConfirmActive(false);
      mutate(myGoodsURL)
    }
  };
  const onRemoveBtn = () => {
    setPopupConfirmActive(true)
  }
  // const editGood = event => {

  // };

  return <>
    <div className={`${classes.good}`}>
      <img className={classes.preview} src={image} height={300} width={133} alt={`Фото ${title}`} />
      <div className={classes.goodInfo}>
        <span className={classes.title}>{title}</span>
        <span className={classes.price}>{price} ₽</span>
        <span className={classes.description}>{description}</span>
        <span className={classes.created}>Создано: {new Date(created).toLocaleDateString("ru-ru")}</span>
      </div>
      <div className={classes.btnGroup}>
        <ButtonIcon width={30} height={50} src={editIcon} title="редактировать" alt="редактировать" />
        <ButtonIcon onClick={onRemoveBtn} width={30} height={50} src={removeIcon} title="удалить" alt="удалить" />

      </div>
    </div>
    {popupConfirmActive && <PopUpWindow onClose={() => setPopupConfirmActive(false)}><Confirm text="Вы действительно хотите удалить объявление?" onOk={removeGood} onCancel={() => setPopupConfirmActive(false)} /></PopUpWindow>}
    {/* {popupEditActive && <PopUpWindow onClose={() => setPopupEditActive(false)}></PopUpWindow>} */}

  </>
}
