import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button
        type="submit"
        className="px-4 py-2 text-sm font-semibold text-gray-900 transition rounded bg-amber-400 hover:bg-amber-500"
      >
        Sign In with GitHub
      </button>
    </form>
  );
}
