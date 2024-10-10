import '@/styles/globals.css'

import { Providers } from '@/app/providers'
import { Onest } from 'next/font/google'
import { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const ONEST = Onest({ subsets: ['latin'] })

const title = 'Cursoteca | Platforms'
const description = 'Cursoteca es una plataforma de educación.'

export const metadata: Metadata = {
  title,
  description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body className={cn(ONEST.className)}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  )
}
