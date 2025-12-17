import { ResumeContent } from "@/lib/validations";
import { ModernTemplate } from "./templates/modern";
import { ClassicTemplate } from "./templates/classic";

export function LivePreview({ content, templateId }: { content: ResumeContent, templateId: string }) {
    if (templateId === 'classic') {
        return <ClassicTemplate content={content} />;
    }
    // Default to modern
    return <ModernTemplate content={content} />;
}
