'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  UserIcon, 
  PhoneIcon,
  AcademicCapIcon,
  ClipboardIcon,
  CheckIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import SuccessModal from '@/components/SuccessModal'

export default function Register() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [eventData, setEventData] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    phone: '',
    paymentMethod: 'bkash',
    transactionId: '',
  })

  const [copied, setCopied] = useState('')

  const paymentMethods = {
    bkash: {
      name: 'Bkash',
      number: '01791-934192',
      type: 'Personal'
    },
    nagad: {
      name: 'Nagad',
      number: '01791-934192',
      type: 'Personal'
    }
  }

  useEffect(() => {
    fetchEventData()
  }, [])

  const fetchEventData = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .single()

      if (error) throw error
      setEventData(data)
    } catch (error) {
      console.error('Error fetching event:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCopyNumber = (number: string) => {
    navigator.clipboard.writeText(number.replace(/-/g, ''))
    setCopied(number)
    setTimeout(() => setCopied(''), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            event_id: eventData.id,
            full_name: formData.name,
            batch: formData.batch,
            phone: formData.phone,
            payment_method: formData.paymentMethod,
            transaction_id: formData.transactionId,
            payment_amount: eventData.registration_fee,
            status: 'pending'
          }
        ])

      if (error) throw error

      // Store phone number in localStorage
      localStorage.setItem('registeredPhone', formData.phone)
      setShowSuccess(true)
    } catch (error) {
      console.error('Error submitting registration:', error)
      alert('Error submitting registration. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
    router.push('/')
  }

  if (!eventData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800">
        <div className="h-full w-1/2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-gray-300 hover:text-white"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back
          </Link>
          <div className="text-sm font-medium">Step 1 of 2</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          {/* Event Card */}
          <div className="bg-gray-800 rounded-xl p-4 mb-8">
            <h1 className="text-xl font-bold mb-2">{eventData.title}</h1>
            <p className="text-gray-400 text-sm mb-4">{eventData.description}</p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-300">
                <span className="inline-block px-2 py-1 bg-gray-700 rounded-lg">
                  {eventData.current_participants}/{eventData.max_participants} Registered
                </span>
              </div>
              <div className="text-gray-300">
                Fee: ৳{eventData.registration_fee}
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              
              {/* Name Input */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Batch Selection */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Select Your Batch</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AcademicCapIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <select
                    name="batch"
                    value={formData.batch}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your batch</option>
                    <option value="17">Batch 17 (School)</option>
                    <option value="19">Batch 19 (College)</option>
                  </select>
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Payment Information</h2>
              
              {/* Payment Methods */}
              <div className="space-y-3">
                {Object.entries(paymentMethods).map(([key, method]) => (
                  <div 
                    key={key}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: key }))}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors duration-200 ${
                      formData.paymentMethod === key 
                        ? 'border-blue-500 bg-gray-800' 
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={key}
                        checked={formData.paymentMethod === key}
                        onChange={() => {}}
                        className="h-5 w-5 text-blue-500 cursor-pointer"
                      />
                      <div className="ml-3 flex-1">
                        <p className="text-base font-medium text-white">{method.name}</p>
                        <p className="text-sm text-gray-400">{method.type}</p>
                      </div>
                    </div>
                    
                    {formData.paymentMethod === key && (
                      <div className="mt-4 bg-gray-900 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-gray-400">Send Money to</p>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-lg font-medium text-white tracking-wide">{method.number}</p>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyNumber(method.number);
                                }}
                                className="p-2 text-gray-400 hover:text-white"
                              >
                                {copied === method.number ? (
                                  <CheckIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <ClipboardIcon className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Transaction ID */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Transaction ID</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your transaction ID"
                />
                <p className="mt-2 text-sm text-gray-400">
                  Please enter the Transaction ID you received after sending the money
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Complete Registration'}
            </button>
          </form>
        </div>
      </main>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={handleCloseSuccess}
      />
    </div>
  )
} 