const experiences = [
  {
    role: "Senior Associate 2",
    company: "PwC",
    period: "07/2024 – Present",
    description: "Managed 4+ high-impact Gen AI projects. Architected GPT solutions for document and code generation."
  },
  {
    role: "Consultant",
    company: "KPMG",
    period: "07/2022 – 07/2024",
    description: "Focused on AI project management and solution ownership across top-tier portfolios."
  },
  {
    role: "Consultant",
    company: "Deloitte",
    period: "09/2021 – 07/2022",
    description: "Led automation initiatives in the healthcare domain using Azure and Microsoft Technologies, achieving 2x accuracy."
  },
  {
    role: "App Development Analyst",
    company: "Accenture",
    period: "04/2018 – 09/2021",
    description: "Migrated legacy applications using Domain Driven Architecture. Managed CI/CD pipeline automation."
  }
]

export default function Experience() {
  return (
    <section id="experience" className="relative z-20 bg-[#121212] py-24 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mix-blend-difference mb-4">
            EXPERIENCE.
          </h2>
          <div className="h-[1px] w-full bg-white/10" />
        </div>

        <div className="flex flex-col gap-12">
          {experiences.map((exp, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 group">
              <div className="md:w-48 shrink-0">
                <span className="text-white/40 font-mono text-sm tracking-widest">{exp.period}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {exp.role}
                </h3>
                <h4 className="text-lg text-white/80 font-medium mb-3">
                  {exp.company}
                </h4>
                <p className="text-white/60 leading-relaxed md:max-w-xl">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
