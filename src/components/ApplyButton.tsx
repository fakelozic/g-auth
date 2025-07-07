"use client";

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { applyJob } from "@/src/app/actions/applicationActions";

export default function ApplyButton({ jobID }: { jobID: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const handleApply = async () => {
    if (!session) {
      router.push("/sign-in");
      return;
    }
    setErrorMessage("");
    try {
      await applyJob(jobID);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to apply for the job");
      }
    }
  };
  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }
  if (status === "loading") {
    return (
      <>
        <Button disabled onClick={handleApply}>
          Loading...
        </Button>
      </>
    );
  }
  return (
    <>
      <Button onClick={handleApply}>Apply</Button>
    </>
  );
}
