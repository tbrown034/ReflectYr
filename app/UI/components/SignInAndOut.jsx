import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { auth } from "@/auth.js";

export default async function SignInAndOut() {
  const session = await auth(); // Server-side session retrieval
  const button = session ? <SignOut /> : <SignIn />;

  return (
    <div className="flex items-center justify-center">
      <div className="p-4 border-2 border-gray-600 rounded-lg">{button}</div>
    </div>
  );
}
