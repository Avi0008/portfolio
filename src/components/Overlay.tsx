'use client'

import { motion, useTransform, MotionValue } from 'framer-motion'

interface OverlayProps {
  progress: MotionValue<number>
}

export default function Overlay({ progress }: OverlayProps) {
  // Section 1: NAME (Starts at 0, stays until 0.45, fades out by 0.55)
  const opacity1 = useTransform(progress, [0, 0.45, 0.55], [1, 1, 0])
  const y1 = useTransform(progress, [0, 0.55], [0, -100])

  // Section 2: JOB ROLE (Fades in slightly before name leaves, centered around 0.6)
  const opacity2 = useTransform(progress, [0.45, 0.55, 0.7], [0, 1, 0])
  const y2 = useTransform(progress, [0.45, 0.7], [100, -100])

  // Section 3: FULL TAGLINE (Fades in at 0.65, stays till end)
  const opacity3 = useTransform(progress, [0.65, 0.75, 0.95], [0, 1, 0])
  const y3 = useTransform(progress, [0.65, 0.95], [100, -100])

  return (
    <div className="absolute inset-0 pointer-events-none z-10 font-sans px-8 lg:px-24">
      {/* Subtle global gradient just to help text contrast, without hiding images */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Section 1: NAME */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <h1 
          className="text-6xl md:text-8xl lg:text-[11rem] font-medium text-white/50 tracking-tight drop-shadow-[0_4px_32px_rgba(0,0,0,1)] uppercase"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          Avishek
          <br className="md:hidden" />
          <span className="hidden md:inline"> </span>
          Chakraborty
        </h1>
      </motion.div>

      {/* Section 2: JOB ROLE */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-blue-300 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] leading-tight uppercase tracking-widest mix-blend-plus-lighter">
          AI Project Manager
          <br />
          <span className="text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">&</span> Solution Owner
        </h2>
      </motion.div>

      {/* Section 3: FULL TAGLINE */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] max-w-5xl mx-auto mix-blend-plus-lighter">
          Transforming Business Vision
          <br className="hidden md:block" /> Into AI-Powered Value.
        </h2>
        <p className="mt-8 text-xl md:text-2xl text-white/90 font-medium italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] max-w-3xl mx-auto mix-blend-plus-lighter">
          "Transforming complex business needs into pragmatic, scalable AI solutions while keeping teams focused, collaborative, and inspired."
        </p>
      </motion.div>
    </div>
  )
}
