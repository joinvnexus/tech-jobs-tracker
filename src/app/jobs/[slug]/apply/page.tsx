import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApplyForm } from "./apply-form";

interface ApplyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ApplyPage({
  params,
}: ApplyPageProps) {
  const resolvedParams = await params;
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/jobs");
  }

  const job = await prisma.job.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      company: true,
    },
  });

  if (!job || job.status !== "ACTIVE") {
    notFound();
  }

  const existingApplication = await prisma.jobApplication.findUnique({
    where: {
      jobId_userId: {
        jobId: job.id,
        userId: session.user.id,
      },
    },
  });

  const profile = await prisma.userProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (existingApplication) {
    return (
      <div className="container-app py-12">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h2 className="mb-4 text-xl font-semibold">
              You have already applied to this job
            </h2>
            <p className="mb-6 text-muted-foreground">
              Check your applications to track the status.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/applications">My Applications</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/jobs">Browse Jobs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const initialState = {
    success: false,
    error: "",
    jobId: job.id,
  };

  return (
    <div className="container-app py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/jobs/${resolvedParams.slug}`}>
            Back to job details
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Apply for {job.title}</h1>
        <p className="mt-2 text-muted-foreground">
          at {job.company?.name || "Company"}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent>
              {profile?.resumeUrl ? (
                <ApplyForm
                  jobId={job.id}
                  disabled={false}
                  initialState={initialState}
                />
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Please complete your profile and upload a resume before
                    applying.
                  </p>
                  <Button asChild>
                    <Link href="/profile/seeker">Complete Profile</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-muted-foreground">
                  {session.user.name}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
              {profile?.resumeUrl && (
                <div>
                  <p className="text-sm font-medium">Resume</p>
                  <Button variant="link" className="h-auto p-0" asChild>
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </Button>
                </div>
              )}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/profile/seeker">Edit Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
