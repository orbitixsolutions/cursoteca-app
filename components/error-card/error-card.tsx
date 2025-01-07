'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ErrorCardProps } from './error-card.type'

export function ErrorCard(props: ErrorCardProps) {
  const { message, title = 'Error', delay = 3000, onChange, status } = props

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange({ active: false, message: '' })
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, message, onChange])

  if (!status) {
    return null
  }

  return (
    <Alert variant='destructive'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
