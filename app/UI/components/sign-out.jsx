import { signOut } from "@/auth.js";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <div type="submit">Sign Out</div>
    </form>
  );
}
