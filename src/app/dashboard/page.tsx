import { getResumes } from "@/app/actions/resume";
import { CreateResumeDialog } from "@/components/dashboard/create-resume-dialog";
import { ResumeCard } from "@/components/dashboard/resume-card";
import { UserButton } from "@clerk/nextjs";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    // This server action might fail if not authenticated, middleware handles protection but strict check is good
    const resumes = await getResumes().catch(() => []);

    return (
        <div className="min-h-screen bg-muted/20">
            <header className="border-b bg-background sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold tracking-tight">Resume Builder</h1>
                    <UserButton afterSignOutUrl="/sign-in" />
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">My Resumes</h2>
                        <p className="text-muted-foreground">Manage and edit your resumes</p>
                    </div>
                    <CreateResumeDialog />
                </div>

                {resumes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-lg bg-background">
                        <p className="text-muted-foreground mt-2">You don&apos;t have any resumes yet. Create one to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {resumes.map((resume: any) => (
                            <ResumeCard key={resume.id} resume={resume} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
