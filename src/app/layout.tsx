import { Toaster } from 'react-hot-toast'
import './globals.css'
import { DM_Sans, Anek_Bangla } from 'next/font/google'

const dmSans = DM_Sans({ subsets: ['latin'] })
const anekBangla = Anek_Bangla({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-bangla',
})

export const metadata = {
  title: 'EventHub - Iftar Gathering 2024',
  description: 'Register for the upcoming Iftar gathering event',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} ${anekBangla.variable}`}>
        <Toaster position="top-center" />
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  )
}
