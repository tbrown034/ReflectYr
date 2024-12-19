import SignIn from "./sign-in";
import SignOut from "./sign-out";
import { auth } from "@/auth.js";

export default async function SignInAndOut() {
  const session = await auth();

  const button = session ? <SignOut /> : <SignIn />;

  return <div>{button}</div>;
}
