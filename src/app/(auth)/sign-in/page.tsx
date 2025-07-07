import { auth } from "@/auth";
import SignIn from "@/src/components/SignIn";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();
  if (session) {
    return redirect("/");
  }
  return (
    <div>
      <SignIn />
    </div>
  );
}
