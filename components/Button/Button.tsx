import classes from "./Button.module.css";

export default function Button({onClick, children} : {onClick: ()=>void, children: string}) {
  return <button onClick={onClick} className={classes.btn}>{children}</button>
}