import { Messages } from "@prisma/client";
import classes from "./MessageCard.module.css";

export default function MessageCard({ message }: { message: Messages }) {
  const {text, createdAt} = message;
  return <div className={classes.msg}>

    <img src="https://dummyimage.com/100" className={classes.icon}>{}</img>
    <div>
      <h2>Bvz</h2>
      <p>{text}</p>
    </div>
    <span>{createdAt.toLocaleDateString('ru-RU')}</span>
  </div>;
}