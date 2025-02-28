import classes from "./skeleton.module.css";

export default function SkeletonGrid({num}:{num: number}) {
  return Array.from({length: num}, () => <div className={`${classes.skeletonGrid} noscroll`} key={num + Math.random()}>
  <div className={classes.div}></div>
  <span className={classes.long}></span>
  <span className={classes.short}></span>
</div >)
}
