'use client'

import Image from 'next/image'
import { WhatsappIcon } from '@/components/SocialIcons'

interface Manager {
  name: string
  image: string
  role: string
  whatsapp: string
}

interface EventManagersProps {
  managers: Manager[]
}

export default function EventManagers({ managers }: EventManagersProps) {
  const handleWhatsAppClick = (whatsapp: string) => {
    window.open(`https://wa.me/${whatsapp.replace(/\D/g, '')}`, '_blank')
  }

  return (
    <div className="p-4 border-b border-gray-100">
      <p className="text-sm text-gray-500 mb-3">Event Managers</p>
      <div className="space-y-3">
        {managers.map((manager, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                <Image 
                  src={manager.image} 
                  alt={manager.name} 
                  width={40} 
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">{manager.name}</h4>
                <p className="text-xs text-gray-500">{manager.role}</p>
              </div>
            </div>
            <button 
              className="text-green-600 hover:text-green-700 transition-colors duration-200"
              onClick={() => handleWhatsAppClick(manager.whatsapp)}
            >
              <WhatsappIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 