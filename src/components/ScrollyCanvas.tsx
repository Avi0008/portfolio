'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Overlay from './Overlay'

interface ScrollyCanvasProps {
  frameCount: number
}

export default function ScrollyCanvas({ frameCount }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Store loaded images in array map
  const loadedImagesRef = useRef<Map<number, HTMLImageElement>>(new Map())
  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)

  // 1. Get scroll progress of the container (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // 2. Map scroll progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1])

  // Helper to draw image centered and covering canvas (object-fit: cover)
  const drawImageProp = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
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
    
    ctx.drawImage(img, x, y, renderWidth, renderHeight)
  }, [])

  // Helper to get exact frame or nearest available frame for 0-lag rendering
  const getNearestFrame = useCallback((targetIndex: number): HTMLImageElement | null => {
    const map = loadedImagesRef.current
    if (map.has(targetIndex)) return map.get(targetIndex)!

    // Look for nearest loaded frame
    let closestIndex = 0
    let minDiff = Infinity
    for (const loadedIdx of map.keys()) {
      const diff = Math.abs(loadedIdx - targetIndex)
      if (diff < minDiff) {
        minDiff = diff
        closestIndex = loadedIdx
      }
    }

    return map.get(closestIndex) || null
  }, [])

  // 3. Progressive Keyframe-First Loading Architecture
  useEffect(() => {
    let isMounted = true

    const loadImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (loadedImagesRef.current.has(index)) {
          resolve(loadedImagesRef.current.get(index)!)
          return
        }
        const img = new Image()
        const formattedIndex = index.toString().padStart(2, '0')
        img.src = `/sequence/frame_${formattedIndex}_delay-0.062s.webp`
        img.onload = () => {
          if (isMounted) {
            loadedImagesRef.current.set(index, img)
            setLoadedCount(loadedImagesRef.current.size)
          }
          resolve(img)
        }
        img.onerror = (e) => reject(e)
      })
    }

    const loadAllSequence = async () => {
      try {
        // STEP 1: Load Frame 0 (High Priority LCP)
        const frame0 = await loadImage(0)
        if (!isMounted) return

        setIsFirstFrameReady(true)

        // Render Frame 0 immediately
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth
          canvasRef.current.height = window.innerHeight
          const ctx = canvasRef.current.getContext('2d', { alpha: false })
          if (ctx) drawImageProp(ctx, frame0, canvasRef.current)
        }

        // STEP 2: Preload Keyframes (every 4th frame: 0, 4, 8, 12...) for instant responsiveness
        const keyframeIndices: number[] = []
        for (let i = 0; i < frameCount; i += 4) {
          if (i !== 0) keyframeIndices.push(i)
        }

        // Load keyframes in parallel batch
        await Promise.all(keyframeIndices.map(idx => loadImage(idx)))
        if (!isMounted) return

        // STEP 3: Load remaining intermediate frames in small controlled concurrency batches of 4
        const remainingIndices: number[] = []
        for (let i = 0; i < frameCount; i++) {
          if (!loadedImagesRef.current.has(i)) {
            remainingIndices.push(i)
          }
        }

        const BATCH_SIZE = 4
        for (let i = 0; i < remainingIndices.length; i += BATCH_SIZE) {
          if (!isMounted) break
          const batch = remainingIndices.slice(i, i + BATCH_SIZE)
          await Promise.all(batch.map(idx => loadImage(idx)))
        }
      } catch (err) {
        console.error("Error loading image sequence:", err)
      }
    }

    loadAllSequence()

    return () => {
      isMounted = false
    }
  }, [frameCount, drawImageProp])

  // 4. Handle window resize
  useEffect(() => {
    if (!isFirstFrameReady || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const currentFrameIdx = Math.round(frameIndex.get())
      const imgToDraw = getNearestFrame(currentFrameIdx)
      if (imgToDraw) {
        drawImageProp(ctx, imgToDraw, canvas)
      }
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [isFirstFrameReady, frameIndex, drawImageProp, getNearestFrame])

  // 5. Render canvas updates on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!isFirstFrameReady || !canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d', { alpha: false })
    if (!ctx) return

    const targetIdx = Math.round(latest)
    const imgToDraw = getNearestFrame(targetIdx)

    if (imgToDraw) {
      requestAnimationFrame(() => {
        if (canvasRef.current) {
          drawImageProp(ctx, imgToDraw, canvasRef.current)
        }
      })
    }
  })

  return (
    <div id="about" ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      {/* Background stream indicator (only visible while remaining frames fill in) */}
      {loadedCount < frameCount && isFirstFrameReady && (
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-xs text-white/70 backdrop-blur-md border border-white/10 shadow-lg">
          <div className="h-2 w-2 animate-ping rounded-full bg-blue-400"></div>
          <span>Streaming frames ({loadedCount}/{frameCount})...</span>
        </div>
      )}

      {/* Main sticky canvas container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          aria-label="Interactive AI project manager visual sequence animation"
        />
        {/* Parallax Overlay */}
        <Overlay progress={scrollYProgress} />
      </div>
    </div>
  )
}


