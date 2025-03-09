'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import {
  CheckIcon,
  XMarkIcon,
  PhoneIcon,
  AcademicCapIcon,
  CurrencyBangladeshiIcon,
  ClockIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'

type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled'

interface Registration {
  id: string
  full_name: string
  batch: string
  phone: string
  payment_method: string
  transaction_id: string
  created_at: string
  status: RegistrationStatus
}

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'pending' | 'confirmed'>('pending')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setRegistrations(data || [])
    } catch (error) {
      console.error('Error fetching registrations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: RegistrationStatus) => {
    try {
      const { error } = await supabase
        .from('registrations')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      fetchRegistrations()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const pendingRegistrations = registrations.filter(reg => reg.status === 'pending')
  const confirmedRegistrations = registrations.filter(reg => reg.status === 'confirmed')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const RegistrationCard = ({ registration, isPending = false }: { registration: Registration, isPending?: boolean }) => (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setExpandedCard(expandedCard === registration.id ? null : registration.id)}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h3 className="font-medium text-white">{registration.full_name}</h3>
            <span className="text-sm text-gray-400">Batch {registration.batch}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isPending && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              Pending
            </span>
          )}
          <ChevronDownIcon 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              expandedCard === registration.id ? 'transform rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* Expanded Content */}
      {expandedCard === registration.id && (
        <div className="px-4 pb-4 border-t border-gray-700">
          <div className="pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <PhoneIcon className="w-4 h-4 text-gray-400" />
                <span>{registration.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CurrencyBangladeshiIcon className="w-4 h-4 text-gray-400" />
                <span>{registration.payment_method.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <ClockIcon className="w-4 h-4 text-gray-400" />
                <span>{registration.transaction_id}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-xs text-gray-400">
                  {new Date(registration.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {isPending && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(registration.id, 'confirmed');
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  <CheckIcon className="w-4 h-4" />
                  Confirm
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(registration.id, 'cancelled');
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  <XMarkIcon className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="text-2xl font-bold text-white">{pendingRegistrations.length}</div>
            <div className="text-sm text-gray-400">Pending Requests</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="text-2xl font-bold text-white">{confirmedRegistrations.length}</div>
            <div className="text-sm text-gray-400">Confirmed Users</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'pending'
                ? 'bg-gray-800 text-white border border-gray-700'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Pending ({pendingRegistrations.length})
          </button>
          <button
            onClick={() => setActiveTab('confirmed')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'confirmed'
                ? 'bg-gray-800 text-white border border-gray-700'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Confirmed ({confirmedRegistrations.length})
          </button>
        </div>
        
        {/* Registration Lists */}
        <div className="space-y-4">
          {activeTab === 'pending' && pendingRegistrations.map((registration) => (
            <RegistrationCard 
              key={registration.id} 
              registration={registration}
              isPending={true}
            />
          ))}
          
          {activeTab === 'confirmed' && confirmedRegistrations.map((registration) => (
            <RegistrationCard 
              key={registration.id} 
              registration={registration}
            />
          ))}

          {activeTab === 'pending' && pendingRegistrations.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No pending registrations
            </div>
          )}
          
          {activeTab === 'confirmed' && confirmedRegistrations.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No confirmed registrations
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 