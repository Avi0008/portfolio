'use client'

import { motion, useTransform, MotionValue } from 'framer-motion'
import { Sparkles, ChevronDown } from 'lucide-react'

interface OverlayProps {
  progress: MotionValue<number>
}

export default function Overlay({ progress }: OverlayProps) {
  // Section 1: Immediate Value Proposition & Name (0 to 0.45)
  const opacity1 = useTransform(progress, [0, 0.4, 0.52], [1, 1, 0])
  const y1 = useTransform(progress, [0, 0.52], [0, -80])

  // Section 2: Core Expertise & Impact (0.45 to 0.7)
  const opacity2 = useTransform(progress, [0.45, 0.55, 0.72], [0, 1, 0])
  const y2 = useTransform(progress, [0.45, 0.72], [80, -80])

  // Section 3: Value Vision Statement (0.68 to 0.95)
  const opacity3 = useTransform(progress, [0.68, 0.78, 0.98], [0, 1, 0])
  const y3 = useTransform(progress, [0.68, 0.98], [80, -80])

  return (
    <div className="absolute inset-0 pointer-events-none z-10 font-sans px-6 lg:px-24">
      {/* Dynamic gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />

      {/* Section 1: Above-the-fold Immediate Value Proposition */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-300 backdrop-blur-md shadow-lg shadow-blue-500/10">
          <Sparkles size={14} className="animate-pulse" />
          <span>AI Project Manager &amp; Solution Owner</span>
        </div>

        <h1 
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)] uppercase mb-4"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          Avishek Chakraborty
        </h1>

        <p className="max-w-2xl text-lg sm:text-xl md:text-2xl text-white/90 font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          Architecting Enterprise Gen AI Solutions &amp; Accelerating Developer Workflows by Up to 95%.
        </p>

        {/* Scroll helper */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 text-xs tracking-widest uppercase animate-bounce">
          <span>Scroll to explore</span>
          <ChevronDown size={18} />
        </div>
      </motion.div>

      {/* Section 2: Enterprise Leadership & Stack */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-blue-300 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-tight uppercase tracking-wide">
          Senior Associate &amp; AI Strategist
          <br />
          <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">At PwC, KPMG &amp; Deloitte</span>
        </h2>
        <p className="mt-6 max-w-3xl text-base sm:text-xl text-white/80 font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Leading multi-million dollar Gen AI implementations, custom GPT document automation, and ABAP/APEX code generation platforms.
        </p>
      </motion.div>

      {/* Section 3: Core Mission Statement */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] max-w-5xl mx-auto">
          Transforming Business Vision
          <br className="hidden md:block" /> Into Scalable AI Value.
        </h2>
        <p className="mt-8 text-base sm:text-xl md:text-2xl text-blue-200/90 font-medium italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] max-w-3xl mx-auto">
          "Bridging executive strategic vision with deep technical execution to deploy pragmatic, production-grade AI solutions."
        </p>
      </motion.div>
    </div>
  )
}

