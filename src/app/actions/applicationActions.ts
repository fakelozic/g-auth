"use server";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function applyJob(jobID: string) {
  const session = await auth();
  try {
    const job = await prisma.job.findUnique({ where: { id: jobID } });
    if (!job) {
      return console.log("Job not Found");
    }
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId: jobID,
        userId: session?.user?.id,
      },
    });
    if (existingApplication) {
      return console.log("You already have applied for this job");
    }
    const application = await prisma.application.create({
      data: {
        jobId: jobID as string,
        userId: session?.user?.id as string,
      },
    });
  } catch (error) {
    console.error("Error creating job", error);
  }
  revalidatePath("/");
  redirect("/");
}
