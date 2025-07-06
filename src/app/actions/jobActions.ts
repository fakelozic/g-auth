"use server";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function createJob(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Error: Not authorized. Please sign in.");
  }

  const title = formData.get("title") as string;
  const company = formData.get("company") as string;
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const description = formData.get("description") as string;
  const salary = formData.get("salary") as string;

  try {
    await prisma.job.create({
      data: {
        title,
        company,
        location,
        type,
        description,
        salary,
        postedById: session?.user?.id as string,
      },
    });
  } catch (error) {
    console.error("Error creating job", error);
  }
  revalidatePath("/jobs");
  redirect("/jobs");
}
