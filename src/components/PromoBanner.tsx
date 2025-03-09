'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SparklesIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export default function PromoBanner() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="w-full  bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10 border-b border-gray-700">
      <Link
        href="https://kallolsfolio.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-lg mx-auto px-4 py-2">
          <div className="flex items-center justify-center gap-2 group">
            <SparklesIcon 
              className={`w-4 h-4 text-orange-400 transition-transform duration-300`}
            />
            <p className="text-sm text-center">
              <span className="text-gray-300">Want a beautiful website like this? <span className="text-blue-400 ">Contact</span> </span>
            </p>
            
          </div>
        </div>
      </Link>
    </div>
  )
} 