import { auth } from "@/auth";
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";

export default async function HeaderButton() {
  const session = await auth();
  return session ? (
    <SignOut className="p-2 font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500" />
  ) : (
    <SignIn className="p-2 font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500" />
  );
}
