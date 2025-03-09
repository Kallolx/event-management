'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  '/images/banner1.png',
  '/images/banner2.png',
  '/images/banner3.png',
  '/images/banner4.png',
  '/images/banner5.png',
  '/images/banner6.png',
  '/images/banner7.png',
]

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 2000) // Change slide every 3 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[25vh] md:h-[35vh]">
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  )
} 