import { ExternalLink, Github, Target, Cpu, TrendingUp } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: "01",
    title: "SAP ABAP Code Generator",
    category: "Gen AI Enterprise Solution",
    problemSolved: "Engineers spent hundreds of manual hours drafting custom SAP ABAP logic, creating development bottlenecks across enterprise ERP workflows.",
    techStack: ["Generative AI", "GPT-4", "SAP ABAP", "Prompt Engineering", "Python"],
    impact: "Cut development time by 60% and delivered 90% overall efficiency gains in SAP codebase generation.",
    githubUrl: "https://github.com/Avi0008",
    liveUrl: "https://pwc.com",
  },
  {
    id: "02",
    title: "Salesforce APEX Code Generator",
    category: "Gen AI Developer Tooling",
    problemSolved: "Complex Salesforce integrations required high technical overhead and lengthened sprint cycles for custom APEX class generation.",
    techStack: ["Salesforce APEX", "OpenAI API", "LangChain", "TypeScript"],
    impact: "Accelerated developer coding timelines by 95%, enabling same-day feature deployment for CRM modules.",
    githubUrl: "https://github.com/Avi0008",
    liveUrl: "https://pwc.com",
  },
  {
    id: "03",
    title: "Document Gen & RTM GPT Automation",
    category: "AI Process Engineering",
    problemSolved: "Manual drafting of complex FSD, TSD, BRD, and Requirements Traceability Matrices consumed valuable strategic engineering bandwidth.",
    techStack: ["RTM Generator GPT", "RAG Pipeline", "Vector DB", "Agile Automation"],
    impact: "Saved 1,000+ hours of manual technical documentation effort while standardizing compliance audit readiness.",
    githubUrl: "https://github.com/Avi0008",
    liveUrl: "https://pwc.com",
  },
  {
    id: "04",
    title: "Advanced SEO & Analytics AI Dashboard",
    category: "AI/ML Integration",
    problemSolved: "Traditional digital SEO audits relied on disconnected tools, delaying real-time data insights and competitive keyword adaptation.",
    techStack: ["Machine Learning", "SEO Analytics", "Python", "Next.js", "Tailwind CSS"],
    impact: "Boosted digital organic reach by 45% and reduced automated analysis latency from days to under 5 seconds.",
    githubUrl: "https://github.com/Avi0008",
    liveUrl: "https://pwc.com",
  }
]

export default function Projects() {
  return (
    <section id="projects" className="relative z-20 bg-[#121212] py-28 px-6 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-blue-400 font-mono text-xs uppercase tracking-widest block mb-2">Portfolio Showcase</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            HIGH-IMPACT CASE STUDIES.
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl">
            Selected enterprise solution owner projects delivering measurable business impact through Generative AI &amp; Automation.
          </p>
          <div className="h-[1px] w-full bg-white/10 mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group relative flex flex-col justify-between p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.07] hover:border-blue-500/40 hover:-translate-y-1 overflow-hidden shadow-2xl"
            >
              {/* Card Ambient Glow */}
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-500 pointer-events-none" />

              <div>
                {/* Header info */}
                <div className="flex justify-between items-start mb-6">
                  <span className="text-blue-400 font-mono text-sm font-semibold">{project.id}</span>
                  <div className="flex items-center gap-2">
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={`${project.title} GitHub repository`}
                      className="text-white/50 hover:text-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center rounded-lg hover:bg-white/10"
                    >
                      <Github size={20} />
                    </a>
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={`${project.title} live demo`}
                      className="text-white/50 hover:text-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center rounded-lg hover:bg-white/10"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-blue-300/80 text-xs font-semibold uppercase tracking-wider mb-6">
                  {project.category}
                </p>

                {/* 3-Part Case Study Breakdown */}
                <div className="space-y-4 mb-8 text-sm">
                  {/* 1. Problem Solved */}
                  <div className="flex items-start gap-3">
                    <Target size={18} className="text-red-400 shrink-0 mt-1" />
                    <div>
                      <span className="font-semibold text-white/90 block text-xs uppercase tracking-wider text-red-300">Problem Solved:</span>
                      <p className="text-white/70 leading-relaxed mt-0.5">{project.problemSolved}</p>
                    </div>
                  </div>

                  {/* 2. Quantifiable Impact */}
                  <div className="flex items-start gap-3">
                    <TrendingUp size={18} className="text-green-400 shrink-0 mt-1" />
                    <div>
                      <span className="font-semibold text-white/90 block text-xs uppercase tracking-wider text-green-300">Quantifiable Impact:</span>
                      <p className="text-green-200/90 font-medium leading-relaxed mt-0.5">{project.impact}</p>
                    </div>
                  </div>

                  {/* 3. Tech Stack */}
                  <div className="flex items-start gap-3 pt-2">
                    <Cpu size={18} className="text-blue-400 shrink-0 mt-1" />
                    <div>
                      <span className="font-semibold text-white/90 block text-xs uppercase tracking-wider text-blue-300 mb-2">Tech Stack:</span>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map(tag => (
                          <span 
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs font-medium text-white/80 bg-white/5 border border-white/10 group-hover:border-blue-500/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action link */}
              <div className="pt-4 border-t border-white/5 flex justify-end">
                <a
                  href="#contact"
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform min-h-[48px] flex items-center"
                >
                  Discuss similar solution &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link 
            href="#contact"
            className="min-h-[48px] px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wide hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 shadow-xl shadow-blue-500/25"
          >
            <span>Discuss Your Project Vision</span>
            <ExternalLink size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

