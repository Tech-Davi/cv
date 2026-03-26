"use client"

import { useEffect, useState, useRef } from "react"
import { X, ChevronLeft, ChevronRight, Play, Pause, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface MediaItem {
  type: 'image' | 'video'
  src: string
  poster?: string
}

interface FullscreenCarouselProps {
  media: MediaItem[]
  isOpen: boolean
  onClose: () => void
  autoPlayInterval?: number
  videoDuration?: number
}

export function FullscreenCarousel({
  media,
  isOpen,
  onClose,
  autoPlayInterval = 3000,
  videoDuration = 5000,
}: FullscreenCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        previousSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      } else if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])

  // Scroll para a miniatura ativa quando mudar de slide
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const activeThumbnail = thumbnailContainerRef.current.children[currentIndex] as HTMLElement
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [currentIndex])

  useEffect(() => {
    if (!isOpen) return

    let interval: NodeJS.Timeout
    let videoTimeout: NodeJS.Timeout

    if (isAutoPlaying && media[currentIndex]?.type === 'image') {
      interval = setInterval(() => {
        nextSlide()
      }, autoPlayInterval)
    } else if (isAutoPlaying && media[currentIndex]?.type === 'video' && !isPlaying) {
      videoTimeout = setTimeout(() => {
        nextSlide()
      }, videoDuration)
    }

    return () => {
      clearInterval(interval)
      clearTimeout(videoTimeout)
    }
  }, [isAutoPlaying, currentIndex, isPlaying, isOpen])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length)
    setIsPlaying(false)
  }

  const previousSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length)
    setIsPlaying(false)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const handleVideoPlay = () => {
    setIsPlaying(true)
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    nextSlide()
  }

  if (!isOpen) return null

  const currentMedia = media[currentIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="text-white">
          <span className="text-sm font-medium">
            {currentIndex + 1} / {media.length}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/20"
            title="Tela cheia (F)"
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleAutoPlay}
            className="text-white hover:bg-white/20"
            title={isAutoPlaying ? "Pausar auto-play" : "Iniciar auto-play"}
          >
            {isAutoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
            title="Fechar (ESC)"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        onClick={previousSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 hover:scale-110 transition-all"
        title="Anterior (←)"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 hover:scale-110 transition-all"
        title="Próximo (→)"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Media Content - Posicionado mais acima */}
      <div className="flex flex-col h-full pt-16 pb-28">
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className="relative w-full max-w-7xl h-full max-h-[calc(100vh-12rem)] mx-4">
            {currentMedia.type === 'image' ? (
              <div className="relative w-full h-full">
                <Image
                  src={currentMedia.src}
                  alt={`Slide ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <video
                key={currentMedia.src}
                src={currentMedia.src}
                poster={currentMedia.poster}
                controls
                autoPlay
                onPlay={handleVideoPlay}
                onEnded={handleVideoEnd}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
            )}
          </div>
        </div>
      </div>

      {/* Thumbnails - Rolável horizontalmente */}
      {media.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 py-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="w-full px-4">
            {/* Container rolável para as miniaturas */}
            <div 
              ref={thumbnailContainerRef}
              className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent pb-3"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.3) transparent'
              }}
            >
              {media.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx)
                    setIsPlaying(false)
                  }}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                    idx === currentIndex
                      ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-black scale-105'
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {item.type === 'image' ? (
                    <Image
                      src={item.src}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <>
                      <Image
                        src={item.poster || item.src}
                        alt={`Video ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
                        <Play className="h-4 w-4 sm:h-6 sm:w-6 text-white drop-shadow-lg" />
                      </div>
                    </>
                  )}
                  {idx === currentIndex && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Estilos globais para scrollbar */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 20px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  )
}