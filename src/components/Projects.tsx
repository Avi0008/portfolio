import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: "01",
    title: "SAP ABAP Code Generator",
    category: "Gen AI Solution",
    description: "Architected a GPT-powered solution that reduced development time by 60%, achieving 90% efficiency gains for SAP ABAP code generation.",
    tags: ["Generative AI", "SAP", "Prompt Engineering"],
  },
  {
    id: "02",
    title: "Salesforce APEX Code Generator",
    category: "Gen AI Solution",
    description: "Developed an AI generator for Salesforce APEX, driving a massive 95% acceleration in coding timelines.",
    tags: ["Salesforce", "APEX", "Gen AI"],
  },
  {
    id: "03",
    title: "Document Gen Automation",
    category: "Project Management",
    description: "Created automated FSD, TSD, and BRD generation systems, including RTM Generator GPT, which saved over 1000+ hours of manual effort.",
    tags: ["Automation", "GPT", "Agile"],
  },
  {
    id: "04",
    title: "Advanced SEO Automation",
    category: "AI/ML Integration",
    description: "Implemented an AI/ML based SEO analysis and real-time performance monitoring dashboard to enhance digital presence.",
    tags: ["Machine Learning", "SEO", "Analytics"],
  }
]

export default function Projects() {
  return (
    <section className="relative z-20 bg-[#121212] py-32 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white mix-blend-difference mb-4">
            SELECTED WORKS.
          </h2>
          <div className="h-[1px] w-full bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group relative flex flex-col justify-between p-8 md:p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 overflow-hidden"
            >
              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-white/40 font-mono text-sm">{project.id}</span>
                  <div className="flex gap-3">
                    <Link href="#" className="text-white/40 hover:text-white transition-colors">
                      <Github size={20} />
                    </Link>
                    <Link href="#" className="text-white/40 hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </Link>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-6">
                  {project.category}
                </p>
                
                <p className="text-white/70 leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium text-white/50 bg-white/5 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-32 flex justify-center">
            <Link 
              href="mailto:avishek@live.in"
              className="px-8 py-4 rounded-full bg-white text-[#121212] font-semibold tracking-wide hover:scale-105 active:scale-95 transition-transform"
            >
                Let's Talk
            </Link>
        </div>
      </div>
    </section>
  )
}
