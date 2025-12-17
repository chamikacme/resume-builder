'use client'

import { useState, useEffect } from "react";
import { ResumeContent } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { updateResume } from "@/app/actions/resume";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import { PersonalInfoForm } from "./forms/personal-info-form";
import { LivePreview } from "../preview/live-preview";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ExperienceForm } from "./forms/experience-form";
import { EducationForm } from "./forms/education-form";
import { SkillsForm } from "./forms/skills-form";
import { ProjectsForm } from "./forms/projects-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeContentSchema } from "@/lib/validations";

interface EditorProps {
    resume: {
        id: string;
        title: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: any;
        templateId: string;
    };
}

import { SectionReorder } from "./section-reorder";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LayoutList } from "lucide-react";

export function Editor({ resume }: EditorProps) {
    const defaultValues = resume.content as ResumeContent || {
        personalInfo: {},
        experience: [],
        education: [],
        skills: [],
        projects: [],
        sectionOrder: ["experience", "education", "projects", "skills"]
    };
    
    // Normalize data to ensure types match schema (e.g. current: boolean)
    if (defaultValues.experience) {
        defaultValues.experience = defaultValues.experience.map(exp => ({
            ...exp,
            current: exp.current ?? false
        }));
    }
    
    if (!defaultValues.sectionOrder) {
        defaultValues.sectionOrder = ["experience", "education", "projects", "skills"];
    }

    const form = useForm<ResumeContent>({
        resolver: zodResolver(resumeContentSchema),
        defaultValues
    });

    const [isSaving, setIsSaving] = useState(false);
    const [templateId, setTemplateId] = useState(resume.templateId || 'modern');

    const { watch, handleSubmit, setValue } = form; // Added setValue
    const formValues = watch(); // Watch all values for preview and autosave
    
    // Autosave logic (unchanged)
    const debouncedContent = useDebounce(formValues, 1000);

    const handleTemplateChange = async (val: string) => {
        setTemplateId(val);
        try {
            await updateResume(resume.id, { templateId: val });
            toast.success("Template changed");
        } catch {
            toast.error("Failed to update template");
        }
    };

    useEffect(() => {
        const save = async () => {
             // Deep compare logic...
             if (JSON.stringify(debouncedContent) === JSON.stringify(resume.content)) return;

             setIsSaving(true);
             try {
                 await updateResume(resume.id, { content: debouncedContent });
             } catch {
                 toast.error("Failed to auto-save");
             } finally {
                 setIsSaving(false);
             }
        };
        save();
        
    }, [debouncedContent, resume.id, resume.content]);

    return (
        <FormProvider {...form}>
            <div className="flex flex-col h-screen overflow-hidden bg-background">
                <header className="h-16 border-b flex items-center justify-between px-6 bg-white shrink-0 z-20 shadow-sm print:hidden">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="font-semibold text-lg leading-tight">{resume.title}</h1>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                {isSaving ? <><Loader2 className="h-3 w-3 animate-spin"/> Saving...</> : "All changes saved"}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <LayoutList className="h-4 w-4 mr-2" />
                                    Arrange
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-4" align="end">
                                <h4 className="font-medium mb-1 leading-none">Reorder Sections</h4>
                                <p className="text-xs text-muted-foreground mb-3">Drag items to reorder. Saves automatically.</p>
                                <SectionReorder 
                                    order={watch("sectionOrder") || ["experience", "education", "projects", "skills"]} 
                                    onOrderChange={(newOrder) => setValue("sectionOrder", newOrder, { shouldDirty: true })} 
                                />
                            </PopoverContent>
                        </Popover>
                        <Select value={templateId} onValueChange={handleTemplateChange}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Template" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="modern">Modern</SelectItem>
                                <SelectItem value="classic">Classic</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button onClick={() => window.print()}>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                        </Button>
                    </div>
                </header>

                <div className="flex flex-1 overflow-hidden">
                    {/* Editor Panel */}
                    <div className="w-1/2 md:max-w-xl overflow-y-auto border-r bg-muted/5 print:hidden">
                        <div className="p-6 space-y-6 pb-20">
                            <Accordion type="single" collapsible defaultValue="personal">
                                <AccordionItem value="personal">
                                    <AccordionTrigger>Personal Information</AccordionTrigger>
                                    <AccordionContent>
                                        <PersonalInfoForm />
                                    </AccordionContent>
                                </AccordionItem>
                                
                                {(formValues.sectionOrder || ["experience", "education", "projects", "skills"]).map((section) => {
                                    switch (section) {
                                        case "experience":
                                            return (
                                                <AccordionItem key="experience" value="experience">
                                                    <AccordionTrigger>Work Experience</AccordionTrigger>
                                                    <AccordionContent>
                                                        <ExperienceForm />
                                                    </AccordionContent>
                                                </AccordionItem>
                                            );
                                        case "education":
                                            return (
                                                <AccordionItem key="education" value="education">
                                                    <AccordionTrigger>Education</AccordionTrigger>
                                                    <AccordionContent>
                                                        <EducationForm />
                                                    </AccordionContent>
                                                </AccordionItem>
                                            );
                                        case "skills":
                                            return (
                                                <AccordionItem key="skills" value="skills">
                                                    <AccordionTrigger>Skills</AccordionTrigger>
                                                    <AccordionContent>
                                                        <SkillsForm />
                                                    </AccordionContent>
                                                </AccordionItem>
                                            );
                                        case "projects":
                                            return (
                                                <AccordionItem key="projects" value="projects">
                                                    <AccordionTrigger>Projects</AccordionTrigger>
                                                    <AccordionContent>
                                                        <ProjectsForm />
                                                    </AccordionContent>
                                                </AccordionItem>
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                            </Accordion>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="flex-1 bg-slate-100 overflow-y-auto p-4 md:p-8 flex justify-center items-start print:p-0 print:overflow-visible h-full print:bg-white">
                        <div className="w-full max-w-[210mm] print:max-w-none">
                            <div id="resume-preview" className="bg-white shadow-2xl print:shadow-none min-h-[297mm]">
                                <LivePreview content={formValues} templateId={templateId} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FormProvider>
    )
}
