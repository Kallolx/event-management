'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  UserGroupIcon,
  CurrencyBangladeshiIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ArrowLeftOnRectangleIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  ClipboardIcon,
  ClockIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

type Registration = {
  id: string
  name: string
  phone: string
  batch: string
  paymentMethod: string
  transactionId: string
  status: 'pending' | 'approved' | 'rejected'
  timestamp: string
}

// Mock data - replace with actual API integration
const mockData: Registration[] = [
  {
    id: '1',
    name: 'Arafat Raiyan',
    phone: '01712345678',
    batch: '17',
    paymentMethod: 'bkash',
    transactionId: 'ABC123XYZ',
    status: 'pending',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Kamrul Hasan',
    phone: '01712345679',
    batch: '19',
    paymentMethod: 'nagad',
    transactionId: 'DEF456UVW',
    status: 'approved',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  // Add more mock data as needed
]

export default function AdminDashboard() {
  const router = useRouter()
  const [registrations, setRegistrations] = useState<Registration[]>(mockData)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalAmount: 0,
  })
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [showSmsTemplate, setShowSmsTemplate] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Registration | null>(null)
  const [view, setView] = useState<'current' | 'history'>('current')

  const smsTemplates = {
    approved: (name: string) => `Dear ${name},
Your registration for the Iftar Gathering has been approved. We look forward to seeing you at the event.

Date: March 15, 2024
Time: 6:00 PM
Venue: Community Center, Dhaka

Please show this SMS at the entrance.
Thank you!`,
    rejected: (name: string) => `Dear ${name},
We regret to inform you that your registration for the Iftar Gathering could not be approved at this time. Please contact our support team for more information.

Thank you for your understanding.`
  }

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem('adminAuth')
    if (!isAuth) {
      router.push('/admin')
    }

    // Calculate stats
    const total = registrations.length
    const pending = registrations.filter(r => r.status === 'pending').length
    const approved = registrations.filter(r => r.status === 'approved').length
    const rejected = registrations.filter(r => r.status === 'rejected').length
    const totalAmount = approved * 500 // 500 taka per registration

    setStats({ total, pending, approved, rejected, totalAmount })
  }, [registrations, router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected') => {
    setRegistrations(prev =>
      prev.map(reg => (reg.id === id ? { ...reg, status: newStatus } : reg))
    )
  }

  const handleShowSmsTemplate = (registration: Registration) => {
    setSelectedUser(registration)
    setShowSmsTemplate(true)
  }

  const handleCopySms = () => {
    if (!selectedUser) return
    const template = selectedUser.status === 'approved' 
      ? smsTemplates.approved(selectedUser.name)
      : smsTemplates.rejected(selectedUser.name)
    navigator.clipboard.writeText(template)
    // You could add a toast notification here
  }

  const filteredRegistrations = registrations
    .filter(reg => filter === 'all' ? true : reg.status === filter)
    .sort((a, b) => {
      if (view === 'current') {
        // Show pending first, then approved, then rejected
        const statusOrder = { pending: 0, approved: 1, rejected: 2 }
        return statusOrder[a.status] - statusOrder[b.status]
      } else {
        // Show newest first for history
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      }
    })

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-black"
            >
              <ArrowLeftOnRectangleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <div className="px-4 py-4 grid grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow">
          <div className="flex items-center gap-3">
            <UserGroupIcon className="w-8 h-8 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Total Registrations</p>
              <p className="text-2xl font-bold text-black">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 shadow">
          <div className="flex items-center gap-3">
            <CurrencyBangladeshiIcon className="w-8 h-8 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-black">৳{stats.totalAmount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="px-4 py-2 flex gap-2">
        <button
          onClick={() => setView('current')}
          className={`flex-1 py-2 text-sm font-medium ${
            view === 'current'
              ? 'bg-black text-white'
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          Current
        </button>
        <button
          onClick={() => setView('history')}
          className={`flex-1 py-2 text-sm font-medium ${
            view === 'history'
              ? 'bg-black text-white'
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          History
        </button>
      </div>

      {/* Filters */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-medium ${
              filter === status
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && (
              <span className="ml-2 text-xs">
                {stats[status]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Registrations List */}
      <div className="flex-1 px-4 py-4">
        <div className="space-y-4">
          {filteredRegistrations.map((registration) => (
            <div key={registration.id} className="bg-white shadow p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{registration.name}</h3>
                  <p className="text-sm text-gray-500">Batch {registration.batch}</p>
                  {view === 'history' && (
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <ClockIcon className="w-4 h-4" />
                      {new Date(registration.timestamp).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className={`px-2 py-1 text-xs font-medium
                  ${registration.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    registration.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}
                >
                  {registration.status}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <PhoneIcon className="w-4 h-4" />
                  {registration.phone}
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Payment:</span>{' '}
                  <span className="text-gray-900 capitalize">{registration.paymentMethod}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Transaction ID:</span>{' '}
                  <span className="text-gray-900">{registration.transactionId}</span>
                </div>
              </div>

              {registration.status === 'pending' && view === 'current' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(registration.id, 'approved')}
                    className="flex-1 py-2 bg-green-50 text-green-600 font-medium hover:bg-green-100 flex items-center justify-center gap-2"
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(registration.id, 'rejected')}
                    className="flex-1 py-2 bg-red-50 text-red-600 font-medium hover:bg-red-100 flex items-center justify-center gap-2"
                  >
                    <XCircleIcon className="w-5 h-5" />
                    Reject
                  </button>
                </div>
              )}

              {registration.status !== 'pending' && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleShowSmsTemplate(registration)}
                    className="flex-1 py-2 bg-gray-50 text-gray-600 font-medium hover:bg-gray-100 flex items-center justify-center gap-2"
                  >
                    <ChatBubbleLeftIcon className="w-5 h-5" />
                    Send SMS
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SMS Template Modal */}
      {showSmsTemplate && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">SMS Template</h3>
              <button 
                onClick={() => setShowSmsTemplate(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 mb-4 whitespace-pre-wrap">
              {selectedUser.status === 'approved' 
                ? smsTemplates.approved(selectedUser.name)
                : smsTemplates.rejected(selectedUser.name)
              }
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopySms}
                className="flex-1 py-2 bg-black text-white font-medium hover:bg-gray-900 flex items-center justify-center gap-2"
              >
                <ClipboardIcon className="w-5 h-5" />
                Copy SMS
              </button>
              <button
                onClick={() => setShowSmsTemplate(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-600 font-medium hover:bg-gray-200"
              >
                Close
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <p className="font-medium mb-1">Send to:</p>
              <p className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                {selectedUser.phone}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Refresh FAB */}
      <button 
        className="fixed bottom-6 right-6 w-12 h-12 bg-black text-white shadow-lg flex items-center justify-center hover:bg-gray-900"
      >
        <ArrowPathIcon className="w-6 h-6" />
      </button>
    </div>
  )
} 