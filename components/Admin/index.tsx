'use client'
import classes from "./Table.module.css";
import { adminCategoriesURL, adminGoodsURL, adminUsersURL } from "@/swr/fetcher";
import { useEffect, useState } from "react";
import Table from "./Table";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

const tableLinks = {
  Users: adminUsersURL,
  Categories: adminCategoriesURL,
  Goods: adminGoodsURL,
}
type TableName = keyof typeof tableLinks;

export default function AdminPanel({ session }: { session: Session | null }) {
  const [activeTable, setActiveTable] = useState<TableName | null>(null);
  const router = useRouter();

  const role: string = session?.user?.role;

  useEffect(() => {
    if (role !== 'ADMIN')
      return router.push('/');
  }, [router, role])

  const onClick = (name: TableName) => {
    setActiveTable(name);
  }

  if (role !== 'ADMIN') return null;

  return <>
    <div className={classes.adminPanel}>
      <div className={classes.exit}><Button onClick={()=> router.push('/')}>Выйти</Button></div>
      <div></div>
      <div className={classes.btnGroup}>
          {Object.keys(tableLinks).map(name => {
            const isActive = name === activeTable;
            return <button className={isActive ? classes.active : ''} onClick={() => onClick(name as TableName)} key={name}>
              {name}
            </button>
          })}
        
      </div>
      <div className={classes.data}>{activeTable && <Table url={tableLinks[activeTable]} />}</div>
    </div>
  </>
}
