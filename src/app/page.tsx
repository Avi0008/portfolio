import ScrollyCanvas from "@/components/ScrollyCanvas"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen">
      <div className="relative">
        <ScrollyCanvas frameCount={80} />
      </div>
      
      {/* Experience History */}
      <Experience />

      {/* Work Grid */}
      <Projects />
      
      {/* Simple Footer */}
      <footer className="bg-[#121212] text-white/40 py-12 text-center text-sm border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} Avishek Chakraborty. All rights reserved.</p>
      </footer>
    </main>
  )
}
