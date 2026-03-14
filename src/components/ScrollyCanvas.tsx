'use client'

import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Overlay from './Overlay'

interface ScrollyCanvasProps {
  frameCount: number
}

export default function ScrollyCanvas({ frameCount }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // 1. Get scroll progress of the container (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // 2. Map scroll progress to a frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1])

  // 3. Preload Images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = []
      
      const loadImage = (index: number) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image()
          // Formatting index to be two digits, e.g., 00, 01, ..., 79
          const formattedIndex = index.toString().padStart(2, '0')
          img.src = `/sequence/frame_${formattedIndex}_delay-0.062s.png`
          img.onload = () => resolve(img)
          img.onerror = (e) => reject(e)
        })
      }

      try {
        // Load all images concurrently for faster sequential playback
        const promises = []
        for (let i = 0; i < frameCount; i++) {
          promises.push(loadImage(i))
        }
        
        const results = await Promise.all(promises)
        setImages(results)
        setIsLoaded(true)
      } catch (error) {
        console.error("Error loading sequence images:", error)
      }
    }

    loadImages()
  }, [frameCount])

  // Helper to draw an image centered and covering the canvas (like object-fit: cover)
  const drawImageProp = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Calculate aspect ratios
    const canvasRatio = canvas.width / canvas.height
    const imgRatio = img.width / img.height
    
    let renderWidth, renderHeight, x = 0, y = 0
    
    if (canvasRatio > imgRatio) {
      renderWidth = canvas.width
      renderHeight = canvas.width / imgRatio
      y = (canvas.height - renderHeight) / 2
    } else {
      renderWidth = canvas.height * imgRatio
      renderHeight = canvas.height
      x = (canvas.width - renderWidth) / 2
    }
    
    // Draw the image
    ctx.drawImage(img, x, y, renderWidth, renderHeight)
  }

  // 4. Handle resizing and initial draw
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false }) // Performance optimization
    if (!ctx) return

    const resizeCanvas = () => {
      // Use window.innerWidth/innerHeight to avoid visual glitches with sticky parent
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Re-draw current frame on resize
      const currentFrame = Math.round(frameIndex.get())
      if (images[currentFrame]) {
        drawImageProp(ctx, images[currentFrame], canvas)
      }
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas() // Initial sizing

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [isLoaded, images, frameIndex])

  // 5. Draw updates on scroll using framer-motion's event
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!isLoaded || !canvasRef.current || images.length === 0) return
    
    const ctx = canvasRef.current.getContext('2d', { alpha: false })
    if (!ctx) return
    
    const index = Math.round(latest)
    // Safety check
    if (index >= 0 && index < images.length && images[index]) {
      // Use requestAnimationFrame for smoother rendering
      requestAnimationFrame(() => {
        drawImageProp(ctx, images[index], canvasRef.current!)
      })
    }
  })

  return (
    // 500vh container to control scrolling duration
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121212]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-white/80"></div>
            <p className="text-sm text-white/60 tracking-widest uppercase">Loading Assets</p>
          </div>
        </div>
      )}
      
      {/* Sticky container that stays in view */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Parallax Overlay passed the container's exact scroll progress */}
        <Overlay progress={scrollYProgress} />
      </div>
    </div>
  )
}
