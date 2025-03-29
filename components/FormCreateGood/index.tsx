"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./index.module.css";
import ButtonIcon from "../Button/Button-icon";
import Button from "../Button/Button";
import Image from "next/image";
import { Good } from "../GoodList/GoodList";
import removeIcon from "@/public/closegray.svg";
import { goodsURL } from "@/swr/fetcher";


export default function FormCreateGood({ good, onClose, saveEditGood }: { good?: Good, onClose?: () => void, saveEditGood?: (formData: FormData) => Promise<void> }) {
  const [title, setTitle] = useState(good?.title || '');
  const [price, setPrice] = useState(good?.price || '');
  const [description, setDescription] = useState(good?.description || '');
  // const [categoryId, setCategoryId] = useState("");
  // const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(good?.image || null);
  const [error, setError] = useState("");
  // const categories = useContext();
  const router = useRouter();

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    // setImage(null);
    setPreview(null);
  };

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    // if (!preview) {
    //   setError("Добавьте изображение");
    //   return;
    // }

    const formData = new FormData(event.target as HTMLFormElement);
    if (preview) formData.append('image', preview);

    try {
      if (saveEditGood) await saveEditGood(formData);
      else {
        const res = await fetch(goodsURL, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Ошибка при добавлении товара");
        router.push("/mygoods");
      }
    } catch {
      setError("Ошибка сервера. Попробуйте позже.");
    }
  };

  return <form className={classes.form} onSubmit={submitForm}>
    {good && <ButtonIcon onClick={onClose} width={30} height={50} src={removeIcon} title="удалить" alt="удалить" />}
    {error && <p>{error}</p>}
    <input type="hidden" name="id" value={good?.id} />
    {!preview &&
      <>
        <label htmlFor="upload" className={classes.label}>
          Выберите файл
        </label>
        <input
          id="upload"
          type="file"
          accept="image/*"
          className={classes.upload}
          onChange={uploadImage} />
      </>}
    <div className={classes.filePreview}>
      {preview &&
        <>
          <Image width={220} height={330} src={preview} alt="Превью" />
          <ButtonIcon src={removeIcon} height={50} width={24} title="close" alt="close" onClick={removeImage} />
        </>}
    </div>
    <label>
      Заголовок:
      <input minLength={3} type="text" name="title" value={title} onChange={(event) => setTitle(event.target.value)} required />
    </label>

    <label>
      Цена (₽):
      <input className={classes.price} type="number" name="price" value={price} onChange={(event) => setPrice(event.target.value)} required />
    </label>

    {/* <label>
      Категория:
      <select name="categoryId" value={categoryId} onChange={(event) => setCategoryId(event.target.value)} required>
        <option value="">Выберите категорию</option>
        {categories?.map((cat) =>
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        )}
      </select>
    </label> */}

    <label>
      Описание:
      <textarea minLength={10} maxLength={300} name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
    </label>

    <Button >{saveEditGood ? 'Сохранить изменения' : 'Разместить объявление'}</Button>
  </form>
}