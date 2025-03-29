import Button from "../Button/Button";
import classes from "./index.module.css";

export default function Confirm({ text, onOk, onCancel }: { text: string, onOk: () => void | Promise<void>, onCancel: () => void }) {
  return <div className={classes.confirm}>
    <span>{text}</span>
    <Button onClick={onOk}>OK</Button>
    <Button onClick={onCancel}>CANCEL</Button>
  </div>
}