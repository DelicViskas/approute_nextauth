import classes from "./myGoodCard.module.css";

import removeIcon from "@/public/closegray.svg";
import editIcon from "@/public/edit.svg";
import ButtonIcon from "../Button/Button-icon";
import { myGoodsURL } from "@/swr/fetcher";
import { useState } from "react";
import PopUpWindow from "../PopUpWindow/PopUpWindow";
import Confirm from "../ConfirmWindow";
import { mutate } from "swr";
import { Good } from "../GoodList/GoodList";
import FormCreateGood from "../FormCreateGood";




export default function MyGood({ good }: { good: Good }) {
  const [popupConfirmActive, setPopupConfirmActive] = useState(false);
  const [popupEditActive, setPopupEditActive] = useState(false);
  const { id, description, createdAt, image, title, price } = good;
  const removeGood = async () => {
    try {
      mutate(myGoodsURL, (goods: Good[] = []) => goods.filter(g => g.id !== id), false)
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
      hideRemoveConfirmWindow();
      mutate(myGoodsURL);
    }
  };
  const saveEditGood = async (formData: FormData) => {
    try {
      mutate(myGoodsURL, (goods: Good[] = []) => goods.map(g => g.id === good.id ? {...g, ...Object.fromEntries(formData)} : g), false)
      const res = await fetch(myGoodsURL, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) throw new Error("Ошибка редактирования");
    } catch (error) {
      console.error(error);
    }finally {
      hideEditWindow()
      mutate(myGoodsURL)
    }
  };
  const showRemoveConfirmWindow = () => {
    setPopupConfirmActive(true)
  }
  const hideRemoveConfirmWindow = () => {
    setPopupConfirmActive(false)
  }
  const showEditWindow = () => {
    setPopupEditActive(true)
  }
  const hideEditWindow = () => {
    setPopupEditActive(false)
  }


  return <>
    <div className={`${classes.good}`}>
      <img className={classes.preview} src={image} height={300} width={133} alt={`Фото ${title}`} />
      <div className={classes.goodInfo}>
        <span className={classes.title}>{title}</span>
        <span className={classes.price}>{price} ₽</span>
        <span className={classes.description}>{description}</span>
        <span className={classes.created}>Создано: {new Date(createdAt).toLocaleDateString("ru-ru")}</span>
      </div>
      <div className={classes.btnGroup}>
        <ButtonIcon onClick={showEditWindow} width={30} height={50} src={editIcon} title="редактировать" alt="редактировать" />
        <ButtonIcon onClick={showRemoveConfirmWindow} width={30} height={50} src={removeIcon} title="удалить" alt="удалить" />

      </div>
    </div>
    {popupConfirmActive && <PopUpWindow onClose={hideRemoveConfirmWindow}><Confirm text="Вы действительно хотите удалить объявление?" onOk={removeGood} onCancel={hideRemoveConfirmWindow} /></PopUpWindow>}
    {popupEditActive && <PopUpWindow onClose={hideEditWindow}><FormCreateGood good={good} onClose={hideEditWindow} saveEditGood={saveEditGood}/></PopUpWindow>}

  </>
}
