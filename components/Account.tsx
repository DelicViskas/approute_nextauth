import { auth } from "@/auth";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

export default async function Account() {
  const session = await auth();

  if (session?.user) {
    return <div className="center">
        {/* Signed in as {session.user?.name} ({session.user?.email}) <br /> */}
        {session.user?.image && <img src={session.user?.image} style={{ width: '50px', borderRadius: '50%' }} />}
        <span>{session.user?.name}</span>
        <SignOut/>
      </div>
  }
  return <>
    <SignIn />
  </>

}