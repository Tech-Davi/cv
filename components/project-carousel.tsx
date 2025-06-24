"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/video-player"

interface MediaItem {
  type: "image" | "video"
  src: string
  poster?: string
}

interface ProjectCarouselProps {
  media: MediaItem[]
  alt: string
  autoPlayInterval?: number
  videoDuration?: number
}

export function ProjectCarousel({
  media,
  alt,
  autoPlayInterval = 4000,
  videoDuration = 6000,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)


  useEffect(() => {
    if (isLightboxOpen) return

    const currentMedia = media[currentIndex]
  
    const interval = currentMedia?.type === "video" ? videoDuration : autoPlayInterval

    const autoPlay = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === media.length - 1 ? 0 : prevIndex + 1))
    }, interval)

    return () => clearInterval(autoPlay)
  }, [media, isLightboxOpen, currentIndex, autoPlayInterval, videoDuration])


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
  }

  const goToPreviousLightbox = () => {
    setLightboxIndex(lightboxIndex === 0 ? media.length - 1 : lightboxIndex - 1)
  }

  const goToNextLightbox = () => {
    setLightboxIndex(lightboxIndex === media.length - 1 ? 0 : lightboxIndex + 1)
  }

  const currentMedia = media[currentIndex]

  return (
    <>
      {/* Carousel Container - Altura responsiva */}
      <div className="relative overflow-hidden group bg-gray-50 dark:bg-gray-900 h-48 md:h-56 lg:h-64">
        {/* Media Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {media.map((item, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              {item.type === "video" ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <VideoPlayer
                    src={item.src}
                    poster={item.poster}
                    className="w-full h-full cursor-pointer"
                    autoPlay={index === currentIndex}
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
                    className="object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => openLightbox(index)}
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

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 z-10"
          aria-label="Previous media"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 z-10"
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
                index === currentIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to ${item.type} ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar animada */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
          <div
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / media.length) * 100}%` }}
          />
        </div>


        {/* Media type indicator */}
        {currentMedia?.type === "video" && (
          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <Play className="h-3 w-3" />
            VIDEO
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
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

          {/* Main media - Responsivo para mobile */}
          <div className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center">
            {media[lightboxIndex]?.type === "video" ? (
              <div className="w-full h-full flex items-center justify-center">
                <VideoPlayer
                  src={media[lightboxIndex].src}
                  poster={media[lightboxIndex].poster}
                  className="w-full h-full max-w-full max-h-full"
                  autoPlay={true}
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
                  className="object-contain"
                  priority
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

     
    </>
  )
}
