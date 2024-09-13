import '@/styles/globals.css'
import { Providers } from './providers'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

const title = 'Cursoteca | Platforms.'
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
    <html
      lang='es'
      suppressHydrationWarning
    >
      <body className={cn(inter)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
