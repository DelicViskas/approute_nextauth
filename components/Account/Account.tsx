import { auth } from "@/auth";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import Image from "next/image";
import classes from "./Account.module.css";
import iconPlaceh from '@/public/iconPlaceh.svg'
import ButtonIcon from "../Button/Button-icon";
import signInImg from '@/public/signInImg.svg'

export default async function Account() {
  const session = await auth();

  if (session?.user) {
    return <div className={classes.account}> {/* ссылка на профиль  */}
      <Image className={classes.userIcon} src={session.user?.image? session.user.image : iconPlaceh} alt='user icon' width={50} height={50} />
      <span>{session.user?.name}</span>
      <SignOut />
    </div>
  }
  return <>
    <SignIn><ButtonIcon width={24}height={50} src={signInImg} title="профиль" alt="профиль"></ButtonIcon></SignIn>
  </>

}