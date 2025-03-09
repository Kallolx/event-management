'use client'

import { SparklesIcon } from '@heroicons/react/24/solid'

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <SparklesIcon className="h-8 w-8 text-primary-600" />
      <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
        EventHub
      </span>
    </div>
  )
} 