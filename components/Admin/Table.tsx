import { Categories, User } from "@prisma/client";
import { Good } from "../GoodList/GoodList";
import classes from "./Table.module.css";
import { fetcher } from "@/swr/fetcher";
import useSWR, { mutate } from "swr";
import Spinner from "../Spinner";
import ErrorPage from "@/app/error";
import Button from "../Button/Button";
import { useState } from "react";

export default function Table({ url }: { url: string }) {
  const { data, error, isLoading } = useSWR<User[] | Categories[] | Good[]>(url, fetcher);
  const [idDel, setidDel] = useState<string | number | null>(null)
  console.log(
    data
  );
  const delObj = async (id: string | number) => {
    setidDel(id)

    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error("Ошибка удаления записи");
    } catch (error) {
      console.error(error);
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutate(url, (data?: any) => data.filter((obj: any) => obj.id !== id), true);
      setidDel(null);
    }
  }


  if (isLoading) return <Spinner />
  if (error) return <ErrorPage error={error} />
  if (data) return <table className={classes.table}>

    <thead>
      <tr>
        {Object.keys(data[0]).map(key => <th key={key}>{key}</th>)}
        <th></th>
      </tr>
    </thead>
    <tbody>
      {data.map((obj) => (
        <tr key={obj.id}>
          {Object.keys(data[0]).map(key => {
            let value = obj[key as keyof typeof obj]
            if (key === 'createdAt' || key === 'updatedAt')
              value = (new Date(value)).toLocaleDateString();
            return <td title={String(value)} key={obj.id + key}>{value}</td>
          })}
          <td>{obj.id === idDel ? <Spinner /> : <Button onClick={() => delObj(obj.id)}>❌</Button>}</td>
        </tr>
      ))}
    </tbody>
  </table>;
}