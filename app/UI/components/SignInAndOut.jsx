import SignIn from "./sign-in";
import SignOut from "./sign-out";
import { auth } from "@/auth.js";

export default async function SignInAndOut() {
  const session = await auth();

  const button = session ? <SignOut /> : <SignIn />;

  return (
    <div className="flex">
      <div className="p-2 border-2 border-black rounded-xl">{button}</div>
    </div>
  );
}
