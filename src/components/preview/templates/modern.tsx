import { ResumeContent } from "@/lib/validations";

export function ModernTemplate({ content }: { content: ResumeContent }) {
    const { personalInfo, experience, education, skills, projects, volunteering, certifications, awards, languages, sectionOrder } = content;
    const order = sectionOrder || ["experience", "projects", "education", "skills"];

    const renderSection = (section: string) => {
        switch(section) {
            case "experience":
                if (!experience?.length) return null;
                return (
                    <section key="experience" className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-200 pb-1">Experience</h2>
                        <div className="space-y-6">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-base text-slate-900">{exp.title}</h3>
                                        <span className="text-xs font-semibold text-slate-500 whitespace-nowrap bg-slate-100 px-2 py-0.5 rounded">
                                            {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                                        </span>
                                    </div>
                                    <div className="text-slate-700 font-medium text-sm mb-2">{exp.company}</div>
                                    <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed text-justify">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "projects":
                if (!projects?.length) return null;
                return (
                    <section key="projects" className="mb-8">
                         <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-200 pb-1">Projects</h2>
                         <div className="space-y-4">
                            {projects.map(proj => (
                                <div key={proj.id}>
                                     <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-slate-900">{proj.name}</h3>
                                        {proj.url && (
                                            <a href={proj.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">Link</a>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">{proj.description}</p>
                                </div>
                            ))}
                         </div>
                    </section>
                );
            case "education":
                if (!education?.length) return null;
                return (
                    <section key="education" className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-200 pb-1">Education</h2>
                        <div className="space-y-4">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <h3 className="font-bold text-slate-900">{edu.institution}</h3>
                                    <div className="text-sm text-slate-700">{edu.degree} {edu.field && `in ${edu.field}`}</div>
                                    <div className="text-sm text-slate-500 mt-1">
                                        {edu.startDate} – {edu.endDate}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "skills":
                if (!skills?.length) return null;
                 return (
                     <section key="skills" className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-200 pb-1">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(skill => (
                                <span key={skill.id} className="px-2 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-sm border border-slate-200">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                );
            case "volunteering":
                if (!volunteering?.length) return null;
                return (
                    <section key="volunteering" className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-200 pb-1">Volunteering</h2>
                        <div className="space-y-4">
                            {volunteering.map(vol => (
                                <div key={vol.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-slate-900">{vol.role}</h3>
                                        <span className="text-xs text-slate-500">
                                            {vol.startDate} – {vol.current ? "Present" : vol.endDate}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-slate-700 mb-1">{vol.organization}</div>
                                    <p className="text-sm text-slate-600 leading-relaxed">{vol.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "certifications":
                if (!certifications?.length) return null;
                return (
                    <section key="certifications" className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-200 pb-1">Certifications</h2>
                        <div className="space-y-3">
                            {certifications.map(cert => (
                                <div key={cert.id} className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-sm">{cert.name}</h3>
                                        <div className="text-slate-600 text-xs">{cert.issuer}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-slate-500">{cert.date}</div>
                                        {cert.url && <a href={cert.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">Link</a>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "awards":
                if (!awards?.length) return null;
                return (
                    <section key="awards" className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-200 pb-1">Awards</h2>
                        <div className="space-y-3">
                            {awards.map(award => (
                                <div key={award.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-slate-900 text-sm">{award.title}</h3>
                                        <span className="text-xs text-slate-500">{award.date}</span>
                                    </div>
                                    <div className="text-xs text-slate-600 font-medium">{award.issuer}</div>
                                    {award.description && <p className="text-sm text-slate-600 mt-1">{award.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "languages":
                if (!languages?.length) return null;
                return (
                    <section key="languages" className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-200 pb-1">Languages</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {languages.map(lang => (
                                <div key={lang.id} className="flex justify-between border-b border-slate-100 pb-1">
                                    <span className="text-sm font-semibold text-slate-800">{lang.language}</span>
                                    <span className="text-sm text-slate-600">{lang.proficiency}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full h-full p-10 bg-white text-slate-900 font-sans min-h-[297mm]">
            {/* Header */}
            <header className="border-b-2 border-slate-900 pb-6 mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-3">{personalInfo?.fullName || "Your Name"}</h1>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 mb-4">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo?.address && <span>{personalInfo.address}</span>}
                </div>
                {personalInfo?.summary && (
                    <p className="text-slate-800 leading-relaxed max-w-prose text-sm text-justify">
                        {personalInfo.summary}
                    </p>
                )}
            </header>

            <div className="flex flex-col">
                 {order.map(section => renderSection(section))}
            </div>
        </div>
    )
}
