import { signOut } from "@/auth";

export default function SignOut({ className }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className={className}>
        Sign Out
      </button>
    </form>
  );
}
