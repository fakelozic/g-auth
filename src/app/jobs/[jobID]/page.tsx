import ApplyButton from "@/src/components/ApplyButton";
import { prisma } from "@/src/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function JobsPage({
  params,
}: {
  params: Promise<{ jobID: string }>;
}) {
  const { jobID } = await params;
  const job = await prisma.job.findUnique({
    where: { id: jobID },
    include: { postedBy: true },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <Link
            href={"/jobs"}
            className="text-blue-500 hover:text-blue-600 font-medium mb-4 inline-block"
          >
            Back to Jobs
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{job.company}</p>
          <div className="flex intems-center gap-4 text-gray-500 mb-6">
            <span>{job.location}</span>
            <span>.</span>
            <span>{job.type}</span>
            {job.salary && (
              <>
                <span>.</span>
                <span className="text-gray-900 font-medium">{job.salary}</span>
              </>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span>Posted by {job.postedBy.name}</span>
            <span className="mx-2">.</span>
            <span>
            {formatDistanceToNow(new Date(job.postedAt), {addSuffix:true})}
            </span>
          </div>
        </div>
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Job Description
          </h2>
          <div className="text-gray-600 witespace-pre-wrap">
            {job.description}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <ApplyButton jobID={job.id} />
        </div>
      </div>
    </div>
  );
}
