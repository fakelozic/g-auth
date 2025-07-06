"use client";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="container mx-auto flex justify-between items-center py-3 border-b sticky top-0 bg-white">
      <div>
        <Link className="text-2xl font-bold" href={"/"}>
          JOBS
        </Link>
      </div>
      <div className="flex gap-x-3 md:gap-x-10 items-center">
        <Link href={"/jobs"}>Browse Jobs</Link>
        {session ? (
          <>
            <Link href={"/jobs/post"}>Post a Job</Link>
            <Link href={"/dashboard"}>Dashboard</Link>
            <Button
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
              variant={"outline"}
            >
              Sign Out
            </Button>
          </>
        ) : (
          pathname !== "/sign-in" && (
            <Button variant={"outline"}>
              <Link href={"/sign-in"}>Sign In</Link>
            </Button>
          )
        )}
      </div>
    </nav>
  );
}
