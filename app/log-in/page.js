import SignInAndOut from "../UI/components/SignInAndOut.jsx";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-100 bg-gray-900">
      <h1 className="mb-6 text-3xl font-bold text-amber-400">
        Log In to ReflectYr
      </h1>
      <SignInAndOut />
    </div>
  );
}
