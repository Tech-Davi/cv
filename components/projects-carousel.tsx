"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProjectsCarouselProps {
  children: React.ReactNode[]
  autoPlayInterval?: number
}

const CARD_WIDTH_MOBILE = 300
const CARD_WIDTH_TABLET = 320
const CARD_WIDTH_DESKTOP = 340
const GAP = 24

export function ProjectsCarousel({ children, autoPlayInterval = 3000 }: ProjectsCarouselProps) {
  const items = children as React.ReactNode[]
  const total = items.length

  const CLONE_COUNT = 4
  const cloned = [
    ...items.slice(-CLONE_COUNT),
    ...items,
    ...items.slice(0, CLONE_COUNT),
  ]

  const [index, setIndex] = useState(CLONE_COUNT)
  const [transitioning, setTransitioning] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleCount, setVisibleCount] = useState(4)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setVisibleCount(1)
      else if (w < 1024) setVisibleCount(2)
      else setVisibleCount(4)

      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Atualiza containerWidth quando ref estiver disponível
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [])

  const cardWidth =
    visibleCount === 1
      ? CARD_WIDTH_MOBILE
      : visibleCount === 2
      ? CARD_WIDTH_TABLET
      : CARD_WIDTH_DESKTOP

  const stepPx = cardWidth + GAP

  // Offset para centralizar os cards visíveis dentro do container
  const totalCardsWidth = visibleCount * cardWidth + (visibleCount - 1) * GAP
  const centerOffset = containerWidth > 0 ? (containerWidth - totalCardsWidth) / 2 : 0

  const goTo = useCallback((newIndex: number, animate = true) => {
    setTransitioning(animate)
    setIndex(newIndex)
  }, [])

  const next = useCallback(() => goTo(index + 1), [index, goTo])
  const prev = useCallback(() => goTo(index - 1), [index, goTo])

  const handleTransitionEnd = () => {
    const realFirst = CLONE_COUNT
    const realLast = CLONE_COUNT + total - 1

    if (index >= CLONE_COUNT + total) {
      goTo(realFirst + (index - (CLONE_COUNT + total)), false)
    } else if (index < CLONE_COUNT) {
      goTo(realLast - (CLONE_COUNT - 1 - index), false)
    }
  }

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, autoPlayInterval)
    return () => clearInterval(timer)
  }, [isPaused, next, autoPlayInterval])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [next, prev])

  const realIndex = ((index - CLONE_COUNT) % total + total) % total
  const translateX = centerOffset - index * stepPx

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Controls */}
      <div className="flex items-center justify-end sm:justify-between mb-4">
        {/* Dots */}
        <div className="hidden sm:flex gap-1.5 items-center">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(CLONE_COUNT + i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === realIndex
                  ? "w-6 bg-emerald-600"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              )}
              aria-label={`Ir para projeto ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={prev}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={next}
            aria-label="Próximo"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Viewport */}
      <div ref={containerRef} className="overflow-hidden w-full">
        <div
          ref={trackRef}
          className={cn(
            "flex",
            transitioning && "transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          )}
          style={{
            gap: `${GAP}px`,
            transform: `translateX(${translateX}px)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {cloned.map((child, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{ width: `${cardWidth}px` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}