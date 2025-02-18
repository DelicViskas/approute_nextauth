import Image from "next/image";
import logo from '@/public/logo.svg'
import cards from '@/public/cards.svg'
import envelope from '@/public/envelope.svg'
import favorites from '@/public/favorites.svg'
import classes from "./Header.module.css";
import Link from "next/link";
import ButtonIcon from "../Button/Button-icon";
import Account from "../Account/Account";
import { auth } from "@/auth";


export default async function Header() {
  const session = await auth();

  return <header className={classes.header}>
    <div>
      <Link className={classes.logo} href={'/'}>
        <Image height={50} width={135} src={logo} alt="logo" />
      </Link>
      {/* <div className={classes.search}>
        <button>Все категории</button>
        <input type="text" />
      </div> */}
      <div className={classes.btnGroup}>
        {session && <>
          <Link href='/mynotices'>
            <ButtonIcon><Image src={cards} height={50} width={24} title="мои объявления" alt="мои объявления" /></ButtonIcon>
          </Link>
          <Link href='/messages'>
            <ButtonIcon><Image src={envelope} height={50} width={24}  title="мои сообщения" alt="мои сообщения" /></ButtonIcon>
          </Link>
        </>}
        <Link href='/favorites'>
          <ButtonIcon><Image src={favorites} height={50} width={24}  title="избранное" alt="избранное" /></ButtonIcon>
        </Link>
        <Account />
      </div>
    </div>
  </header>
}