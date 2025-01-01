// app/UI/components/SignIn.jsx
import { signIn } from "@/auth";

export default function SignIn({ className }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("");
      }}
    >
      <button type="submit" className={className}>
        Sign In
      </button>
    </form>
  );
}
