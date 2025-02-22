import Image from "next/image";
import classes from "./SkeletonGrid.module.css";
import heart from '@/public/heart.svg'

export default function SkeletonGrid({num}:{num: number}) {
  return Array.from({length: num}, () => <div className={`${classes.skeleton} noscroll`} key={num + Math.random()}>
  <div className={classes.div}></div>
  <span className={classes.long}></span>
  <span className={classes.short}></span>
  <Image src={heart} width={24} height={24} alt=""/>
</div >)
}
