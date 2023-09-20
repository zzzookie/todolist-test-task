import './globals.css'
import type { Metadata } from 'next'
import { Alumni_Sans_Pinstripe, Ubuntu } from 'next/font/google'
import StoreProvider from './StoreProvider'

export const alumni = Alumni_Sans_Pinstripe({ style: ['italic', 'normal'], subsets: ['latin', 'cyrillic'], weight: '400' })
export const pt_sans = Ubuntu({ subsets: ['latin', 'cyrillic'], weight: ['300','400'] })

const metadata: Metadata = {
  title: 'To Do List',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={alumni.className}>{children}</body>
      </html>
    </StoreProvider>
  )
}
