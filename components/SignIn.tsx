import { signIn } from "@/auth"
import Image from "next/image"
import signInImg from '@/public/signInImg.svg'
import ButtonIcon from "./Button/Button-icon"

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <ButtonIcon type="submit"><Image src={signInImg} title="профиль" alt="профиль" /></ButtonIcon>
    </form>
  )
}