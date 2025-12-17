import { getResume } from "@/app/actions/resume";
import { Editor } from "@/components/editor/editor";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export const dynamic = 'force-dynamic';

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const { id } = await params;
    try {
        const resume = await getResume(id);

        if (!resume) {
            notFound();
        }

        if (resume.userId !== userId) {
            return notFound();
        }

        return <Editor resume={resume} />;
    } catch (error) {
        console.error("Error fetching resume:", error);
        return <div className="p-8 text-center text-red-500">Failed to load resume. Please check database connection.</div>;
    }
}
