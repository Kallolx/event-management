import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

type SuccessModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-gray-800 border border-gray-700 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <CheckCircleIcon className="h-8 w-8 text-green-500" />
                  </div>
                  
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white mb-2"
                  >
                    Registration Successful!
                  </Dialog.Title>
                  
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Thank you for registering for the Iftar event. We will send a verification SMS to your provided mobile number within 60 minutes.
                    </p>
                  </div>

                  <div className="mt-6 w-full">
                    <button
                      type="button"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200"
                      onClick={onClose}
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 