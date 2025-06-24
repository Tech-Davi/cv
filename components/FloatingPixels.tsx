"use client"

import React, { useEffect, useRef, useState } from "react"

interface Pixel {
  id: number
  x: number
  y: number
  size: number
  speed: number
  lightness: number
}

const FloatingPixels: React.FC = () => {
  const [pixels, setPixels] = useState<Pixel[]>([])
  const animationRef = useRef<number>()

 
  useEffect(() => {
    const createPixels = () => {
      const newPixels: Pixel[] = []
      for (let i = 0; i < 20; i++) {
        newPixels.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 6 + 2,
          speed: Math.random() * 0.4 + 0.2,
          lightness: Math.random() * 40 + 30,
        })
      }
      setPixels(newPixels)
    }

    createPixels()
  }, [])


  useEffect(() => {
    const animate = () => {
      setPixels((prevPixels) =>
        prevPixels.map((pixel) => {
          let newY = pixel.y - pixel.speed
          if (newY < -pixel.size) newY = window.innerHeight

          let newLightness = pixel.lightness + 0.5
          if (newLightness > 70) newLightness = 30

          return {
            ...pixel,
            y: newY,
            x: pixel.x + Math.sin(newY * 0.05) * 0.3,
            lightness: newLightness,
          }
        })
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationRef.current!)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {pixels.map((pixel) => (
        <div
          key={pixel.id}
          className="absolute opacity-50"
          style={{
            left: `${pixel.x}px`,
            top: `${pixel.y}px`,
            width: `${pixel.size}px`,
            height: `${pixel.size}px`,
            background: `hsl(140, 60%, ${pixel.lightness}%)`,
            transition: "background 0.2s ease",
          }}
        />
      ))}
    </div>
  )
}

export default FloatingPixels
