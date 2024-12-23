import { signOut } from "@/auth";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="px-4 py-2 text-sm font-semibold text-gray-900 transition bg-red-400 rounded hover:bg-red-500"
      >
        Sign Out
      </button>
    </form>
  );
}
