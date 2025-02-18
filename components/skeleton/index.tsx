import Image from "next/image";
import classes from "./index.module.css";
import heart from '@/public/heart.svg'

export default function Skeleton() {
  return <div className={classes.skeleton}>
    <div className={classes.div}></div>
    <span className={classes.long}></span>
    <span className={classes.short}></span>
    <Image src={heart} width={24} height={24} alt=""/>
  </div >
}
