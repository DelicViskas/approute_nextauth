import classes from "./Button.module.css";

export default function Button({onClick,  classname, children} : {onClick?: (event: React.FormEvent)=>void, children: string, classname?: string}) {
  return <button onClick={onClick} className={`${classes.btn} ${classname}`}>{children}</button>
}