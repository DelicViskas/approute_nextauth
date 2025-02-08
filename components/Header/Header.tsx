import Image from "next/image";
import logo from '@/public/logo.svg'
import cards from '@/public/cards.svg'
import envelope from '@/public/envelope.svg'
import heart from '@/public/heart.svg'
import classes  from "./Header.module.css";
import Link from "next/link";
import ButtonIcon from "../Button/Button-icon";
import Account from "../Account";


export default function Header() {
  return <header className={classes.header}>
    <div>
      <Link className={classes.logo} href={'/'}>
        <Image  src={logo} alt="logo" />
      </Link>
      <div className={classes.search}>
        <button>Все категории</button>
        <input type="text" />
      </div>
      <div className={classes.btnGroup}>
        <ButtonIcon ><Image src={cards} title="мои объявления" alt="мои объявления" /></ButtonIcon>
        <ButtonIcon><Image src={envelope} title="мои сообщения" alt="мои сообщения" /></ButtonIcon>
        <ButtonIcon><Image src={heart} title="избранное" alt="избранное" /></ButtonIcon>
        <Account />
      </div>
    </div>
  </header>
}