import { ReactElement } from "react";
import classes from "./Button-icon.module.css";

export default function ButtonIcon({type,children}:{type?: "submit" | "reset" | "button" | undefined, children?: ReactElement}) {
  return <button type={type? type : undefined} className={classes.btnIcon}>{children}</button>
}