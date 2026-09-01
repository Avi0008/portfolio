import Navbar from "@/components/Navbar"
import ScrollyCanvas from "@/components/ScrollyCanvas"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen selection:bg-blue-600 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Hero Visual Animation Sequence */}
      <div className="relative">
        <ScrollyCanvas frameCount={80} />
      </div>
      
      {/* Experience History */}
      <Experience />

      {/* High Impact Projects */}
      <Projects />

      {/* Conversion Contact Section */}
      <Contact />
      
      {/* Footer */}
      <footer className="bg-[#0e0e0e] text-white/40 py-12 text-center text-sm border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Avishek Chakraborty. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs font-medium text-white/60">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}

