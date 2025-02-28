import { Fragment } from "react";
import classes from "./skeleton.module.css";

export default function SkeletonFlex({num}:{num: number}) {
  return Array.from({length: num}, () =><Fragment key={num + Math.random()}>
  <div className={`${classes.skeletonFlex} noscroll`}>
  <div className={classes.image}></div>
  <div className={classes.desc}>
    <span className={classes.title}></span>
    <span className={classes.price}></span>
    <span className={classes.description}></span>
    <span className={classes.created}></span>
  </div>
  </div>
  <hr/></Fragment>)
}


