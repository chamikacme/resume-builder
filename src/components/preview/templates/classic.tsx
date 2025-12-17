import { ResumeContent } from "@/lib/validations";

export function ClassicTemplate({ content }: { content: ResumeContent }) {
    const { personalInfo, experience, education, skills, projects, volunteering, certifications, awards, languages, sectionOrder } = content;
    const order = sectionOrder || ["experience", "education", "projects", "skills"];

    const renderSection = (section: string) => {
        switch(section) {
            case "experience":
                if (!experience?.length) return null;
                return (
                    <section key="experience" className="mb-6">
                        <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Professional Experience</h2>
                        <div className="space-y-4">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline font-bold">
                                        <h3>{exp.title}</h3>
                                        <span className="text-sm">
                                            {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                                        </span>
                                    </div>
                                    <div className="italic mb-1">{exp.company}</div>
                                    <p className="text-sm text-justify whitespace-pre-line">
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
                    <section key="projects" className="mb-6">
                        <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Projects</h2>
                        <div className="space-y-3">
                            {projects.map(proj => (
                                <div key={proj.id}>
                                    <div className="flex justify-between items-baseline font-bold">
                                        <h3>{proj.name}</h3>
                                        {proj.url && <a href={proj.url} className="text-xs underline text-blue-800">Link</a>}
                                    </div>
                                    <p className="text-sm text-justify">
                                        {proj.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "education":
                if (!education?.length) return null;
                return (
                    <section key="education" className="mb-6">
                        <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Education</h2>
                        <div className="space-y-2">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline font-bold">
                                        <h3>{edu.institution}</h3>
                                        <span className="text-sm font-normal">
                                            {edu.startDate} – {edu.endDate}
                                        </span>
                                    </div>
                                    <div className="text-sm">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "skills":
                if (!skills?.length) return null;
                return (
                    <section key="skills" className="mb-6">
                        <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Key Skills</h2>
                        <p className="text-sm leading-relaxed">
                            {skills.map(s => s.name).join(' • ')}
                        </p>
                    </section>
                );
            case "volunteering":
                if (!volunteering?.length) return null;
                return (
                    <section key="volunteering" className="mb-6">
                        <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Volunteering</h2>
                        <div className="space-y-4">
                            {volunteering.map(vol => (
                                <div key={vol.id}>
                                    <div className="flex justify-between items-baseline font-bold">
                                        <h3>{vol.role}</h3>
                                        <span className="text-sm font-normal">
                                            {vol.startDate} – {vol.current ? "Present" : vol.endDate}
                                        </span>
                                    </div>
                                    <div className="italic mb-1">{vol.organization}</div>
                                    <p className="text-sm text-justify whitespace-pre-line">
                                        {vol.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "certifications":
                if (!certifications?.length) return null;
                return (
                    <section key="certifications" className="mb-6">
                        <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Certifications</h2>
                        <div className="space-y-2">
                            {certifications.map(cert => (
                                <div key={cert.id}>
                                    <div className="flex justify-between items-baseline font-bold">
                                        <h3>{cert.name}</h3>
                                        <span className="text-sm font-normal">{cert.date}</span>
                                    </div>
                                    <div className="text-sm">
                                        {cert.issuer} {cert.url && <a href={cert.url} className="text-xs underline text-blue-800 ml-1">(Link)</a>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "awards":
                if (!awards?.length) return null;
                return (
                    <section key="awards" className="mb-6">
                        <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Honors & Awards</h2>
                        <div className="space-y-3">
                            {awards.map(award => (
                                <div key={award.id}>
                                    <div className="flex justify-between items-baseline font-bold">
                                        <h3>{award.title}</h3>
                                        <span className="text-sm font-normal">{award.date}</span>
                                    </div>
                                    <div className="text-sm italic mb-1">{award.issuer}</div>
                                    {award.description && <p className="text-sm text-justify">{award.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case "languages":
                if (!languages?.length) return null;
                return (
                    <section key="languages" className="mb-6">
                        <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Languages</h2>
                        <p className="text-sm leading-relaxed">
                            {languages.map(lang => `${lang.language}${lang.proficiency ? ` (${lang.proficiency})` : ''}`).join(', ')}
                        </p>
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full h-full p-12 bg-white text-black font-serif min-h-[297mm] leading-relaxed">
            {/* Header */}
             <div className="text-center border-b border-black pb-4 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">{personalInfo?.fullName || "Your Name"}</h1>
                <div className="flex justify-center gap-4 text-sm">
                    {personalInfo?.email && <span>{personalInfo.email}</span>}
                    {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo?.address && <span>• {personalInfo.address}</span>}
                </div>
            </div>

            {/* Summary (Static position for now, or could be part of order if desired but usually first) */}
            {personalInfo?.summary && (
                <section className="mb-6">
                    <p className="text-justify text-sm">
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            <div className="flex flex-col">
                {order.map(section => renderSection(section))}
            </div>
        </div>
    )
}
