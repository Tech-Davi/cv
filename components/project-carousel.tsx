"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/video-player"
import { useLanguage } from "@/contexts/language-context"

interface MediaItem {
  type: "image" | "video"
  src: string
  poster?: string // Para vídeos
}

interface ProjectCarouselProps {
  media: MediaItem[]
  alt: string
  autoPlayInterval?: number // Tempo em ms para cada slide
  videoDuration?: number // Tempo que o vídeo fica visível em ms
}

export function ProjectCarousel({
  media,
  alt,
  autoPlayInterval = 4000, // 4 segundos padrão
  videoDuration = 6000, // 6 segundos para vídeos
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { t } = useLanguage()

  // Touch/Swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)

    // Lightbox animation states
  const [lightboxDragOffset, setLightboxDragOffset] = useState(0)
  const [isLightboxDragging, setIsLightboxDragging] = useState(false)
  const [lightboxTouchStart, setLightboxTouchStart] = useState<number | null>(null)
  const [lightboxTouchEnd, setLightboxTouchEnd] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)  
  const lightboxRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  // Auto-play functionality
  useEffect(() => {
    if (isLightboxOpen || isPaused || isDragging) return

    const currentMedia = media[currentIndex]
    const interval = currentMedia?.type === "video" ? videoDuration : autoPlayInterval

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === media.length - 1 ? 0 : prevIndex + 1))
    }, interval)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [media, isLightboxOpen, isPaused, isDragging, currentIndex, autoPlayInterval, videoDuration])

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false)
      }
    }

    if (isLightboxOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isLightboxOpen])

  // Touch handlers - Mudança imediata no início do arraste
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsPaused(true)
    setIsDragging(true)
  }, [])

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart) return

      const currentTouch = e.targetTouches[0].clientX
      const diff = touchStart - currentTouch

      // Detecta direção e muda slide imediatamente
      if (Math.abs(diff) > 130) {
        // Threshold menor para resposta mais rápida
        const isLeftSwipe = diff > 0
        const isRightSwipe = diff < 0

        if (isLeftSwipe) {
          // Swipe left - next slide
          setCurrentIndex((prevIndex) => (prevIndex === media.length - 1 ? 0 : prevIndex + 1))
        } else if (isRightSwipe) {
          // Swipe right - previous slide
          setCurrentIndex((prevIndex) => (prevIndex === 0 ? media.length - 1 : prevIndex - 1))
        }

        // Reset imediato após mudança
        setTouchStart(null)
        setTouchEnd(null)
        setIsDragging(false)
        setDragOffset(0)

        // Resume autoplay após delay
        setTimeout(() => setIsPaused(false), 1000)
      } else {
        // Visual feedback durante o movimento
        const maxDrag = containerRef.current?.offsetWidth || 300
        const limitedDrag = Math.max(-maxDrag * 0.2, Math.min(maxDrag * 0.2, diff))
        setDragOffset(limitedDrag)
        setTouchEnd(currentTouch)
      }
    },
    [touchStart, media.length],
  )

  const onTouchEnd = useCallback(() => {
    // Cleanup apenas - a mudança já aconteceu no onTouchMove
    setTouchStart(null)
    setTouchEnd(null)
    setIsDragging(false)
    setDragOffset(0)
    setTimeout(() => setIsPaused(false), 500)
  }, [])

  // Mouse handlers - Mesma lógica para desktop
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setTouchEnd(null)
    setTouchStart(e.clientX)
    setIsPaused(true)
    setIsDragging(true)
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!touchStart || !isDragging) return

      const currentMouse = e.clientX
      const diff = touchStart - currentMouse

      // Detecta direção e muda slide imediatamente
      if (Math.abs(diff) > 20) {
        // Threshold menor
        const isLeftSwipe = diff > 0
        const isRightSwipe = diff < 0

        if (isLeftSwipe) {
          setCurrentIndex((prevIndex) => (prevIndex === media.length - 1 ? 0 : prevIndex + 1))
        } else if (isRightSwipe) {
          setCurrentIndex((prevIndex) => (prevIndex === 0 ? media.length - 1 : prevIndex - 1))
        }

        // Reset imediato
        setTouchStart(null)
        setTouchEnd(null)
        setIsDragging(false)
        setDragOffset(0)
        setTimeout(() => setIsPaused(false), 1000)
      } else {
        // Visual feedback
        const maxDrag = containerRef.current?.offsetWidth || 300
        const limitedDrag = Math.max(-maxDrag * 0.2, Math.min(maxDrag * 0.2, diff))
        setDragOffset(limitedDrag)
        setTouchEnd(currentMouse)
      }
    },
    [touchStart, isDragging, media.length],
  )

  const onMouseUp = useCallback(() => {
    // Cleanup apenas
    setTouchStart(null)
    setTouchEnd(null)
    setIsDragging(false)
    setDragOffset(0)
    setTimeout(() => setIsPaused(false), 500)
  }, [])

  // Lightbox swipe handlers com animação
  const onLightboxTouchStart = useCallback((e: React.TouchEvent) => {
    setLightboxTouchEnd(null)
    setLightboxTouchStart(e.targetTouches[0].clientX)
    setIsLightboxDragging(true)
  }, [])

  const onLightboxTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!lightboxTouchStart) return

      const currentTouch = e.targetTouches[0].clientX
      const diff = currentTouch - lightboxTouchStart

      // Visual feedback durante o movimento
      const maxDrag = window.innerWidth
      const limitedDrag = Math.max(-maxDrag * 0.3, Math.min(maxDrag * 0.3, diff))
      setLightboxDragOffset(limitedDrag)
      setLightboxTouchEnd(currentTouch)
    },
    [lightboxTouchStart],
  )

  const onLightboxTouchEnd = useCallback(() => {
    if (!lightboxTouchStart || !lightboxTouchEnd) {
      setIsLightboxDragging(false)
      setLightboxDragOffset(0)
      return
    }

    const distance = lightboxTouchStart - lightboxTouchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe || isRightSwipe) {
      setIsTransitioning(true)

      // Animação de saída
      const exitOffset = isLeftSwipe ? -window.innerWidth : window.innerWidth
      setLightboxDragOffset(exitOffset)

      setTimeout(() => {
        // Muda o índice
        if (isLeftSwipe) {
          setLightboxIndex((prevIndex) => (prevIndex === media.length - 1 ? 0 : prevIndex + 1))
        } else {
          setLightboxIndex((prevIndex) => (prevIndex === 0 ? media.length - 1 : prevIndex - 1))
        }

        // Animação de entrada do lado oposto
        setLightboxDragOffset(isLeftSwipe ? window.innerWidth : -window.innerWidth)

        setTimeout(() => {
          // Volta para posição normal
          setLightboxDragOffset(0)
          setIsTransitioning(false)
        }, 50)
      }, 200)
    } else {
      // Volta para posição original se não passou do threshold
      setLightboxDragOffset(0)
    }

    // Reset states
    setLightboxTouchStart(null)
    setLightboxTouchEnd(null)
    setIsLightboxDragging(false)
  }, [lightboxTouchStart, lightboxTouchEnd, media.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? media.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === media.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    // Reset lightbox states
    setLightboxDragOffset(0)
    setIsLightboxDragging(false)
    setIsTransitioning(false)
  }

  const goToPreviousLightbox = () => {
    setIsTransitioning(true)
    setLightboxDragOffset(window.innerWidth)

    setTimeout(() => {
      setLightboxIndex(lightboxIndex === 0 ? media.length - 1 : lightboxIndex - 1)
      setLightboxDragOffset(-window.innerWidth)

      setTimeout(() => {
        setLightboxDragOffset(0)
        setIsTransitioning(false)
      }, 50)
    }, 200)
  }

  const goToNextLightbox = () => {
    setIsTransitioning(true)
    setLightboxDragOffset(-window.innerWidth)

    setTimeout(() => {
      setLightboxIndex(lightboxIndex === media.length - 1 ? 0 : lightboxIndex + 1)
      setLightboxDragOffset(window.innerWidth)

      setTimeout(() => {
        setLightboxDragOffset(0)
        setIsTransitioning(false)
      }, 50)
    }, 200)
  }

  const currentMedia = media[currentIndex]

  return (
    <>
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden group bg-gray-50 dark:bg-gray-900 h-48 md:h-56 lg:h-64 select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => !isDragging && setIsPaused(false)}
      >
        {/* Media Container */}
        <div
          className={`flex h-full transition-transform ${isDragging ? "duration-0" : "duration-500"} ease-in-out`}
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${isDragging ? -dragOffset : 0}px))`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {media.map((item, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              {item.type === "video" ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <VideoPlayer
                    src={item.src}
                    poster={item.poster}
                    className="w-full h-full cursor-pointer"
                    autoPlay={index === currentIndex && !isDragging}
                    muted={true}
                    loop={true}
                    controls={false}
                  />
                  {/* Play overlay */}
                  <div
                    className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="bg-black/50 rounded-full p-3">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={`${alt} - Image ${index + 1}`}
                    fill
    sizes="100vw"
    className="object-contain"
    priority
    quality={90}
    draggable={false}
                  />
                  {/* Zoom overlay */}
                  <div
                    className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="bg-black/50 rounded-full p-2">
                      <ZoomIn className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation arrows - Hidden on mobile when dragging */}
        <button
          onClick={goToPrevious}
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full transition-opacity duration-300 hover:bg-black/70 z-10 ${
            isDragging ? "opacity-0 md:opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          aria-label="Previous media"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          onClick={goToNext}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full transition-opacity duration-300 hover:bg-black/70 z-10 ${
            isDragging ? "opacity-0 md:opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          aria-label="Next media"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {media.map((item, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-emerald-600 scale-110" : "bg-gray-400 hover:bg-gray-600"
              }`}
              aria-label={`Go to ${item.type} ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar geral */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
          <div
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / media.length) * 100}%` }}
          />
        </div>

        {/* Progress bar individual para cada slide */}
        {!isDragging && !isPaused && (
          <div className="absolute top-2 left-2 right-2 h-1 bg-black/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/80 rounded-full transition-all ease-linear"
              style={{
                width: "100%",
                animation: `progress ${currentMedia?.type === "video" ? videoDuration : autoPlayInterval}ms linear`,
              }}
            />
          </div>
        )}

        {/* Media type indicator */}
        {currentMedia?.type === "video" && (
          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <Play className="h-3 w-3" />
            VIDEO
          </div>
        )}

        {/* Swipe indicator for mobile - Mais responsivo */}
        {isDragging && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium md:hidden">
            {dragOffset > 0
              ? `→ ${t("carousel_next")}`
              : dragOffset < 0
                ? `${t("carousel_previous")} ←`
                : t("carousel_swipe")}
          </div>
        )}
      </div>

      {/* Lightbox Modal com suporte a swipe */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-60"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Previous button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-60"
            onClick={goToPreviousLightbox}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          {/* Next button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-60"
            onClick={goToNextLightbox}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Main media - Com suporte a swipe */}
          <div
            ref={lightboxRef}
            className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center overflow-hidden"
            onTouchStart={onLightboxTouchStart}
            onTouchMove={onLightboxTouchMove}
            onTouchEnd={onLightboxTouchEnd}
          >
            {/* Media com animação de slide */}
            <div
              className={`relative w-full h-full flex items-center justify-center transition-transform ${
                isLightboxDragging || isTransitioning ? "duration-200" : "duration-0"
              } ease-out`}
              style={{
                transform: `translateX(${lightboxDragOffset}px)`,
                opacity: Math.max(0.3, 1 - Math.abs(lightboxDragOffset) / (window.innerWidth * 0.5)),
            }}
          >
            {media[lightboxIndex]?.type === "video" ? (
              <div className="w-full h-full flex items-center justify-center">
                <VideoPlayer
                  src={media[lightboxIndex].src}
                  poster={media[lightboxIndex].poster}
                  className="w-full h-full max-w-full max-h-full"
                  autoPlay={!isLightboxDragging && !isTransitioning}
                  muted={false}
                  loop={true}
                  controls={true}
                />
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={media[lightboxIndex]?.src || "/placeholder.svg"}
                  alt={`${alt} - Media ${lightboxIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                  quality={90}
                  draggable={false}
                />
                </div>
              )}
            </div>

            {/* Swipe indicator para lightbox */}
            {isLightboxDragging && Math.abs(lightboxDragOffset) > 20 && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-lg font-medium animate-pulse">
                {lightboxDragOffset > 0 ? `← ${t("carousel_previous")}` : `${t("carousel_next")} →`}
              </div>
            )}

            {/* Progress indicator durante swipe */}
            {isLightboxDragging && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-100"
                  style={{
                    width: `${Math.min(100, (Math.abs(lightboxDragOffset) / minSwipeDistance) * 100)}%`,
                  }}
                />
              </div>
            )}
          </div>

          {/* Media counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
            {lightboxIndex + 1} / {media.length}
          </div>

          {/* Dots indicator for lightbox */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => setLightboxIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === lightboxIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to media ${index + 1}`}
              />
            ))}
          </div>

          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={closeLightbox} />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </>
  )
}
