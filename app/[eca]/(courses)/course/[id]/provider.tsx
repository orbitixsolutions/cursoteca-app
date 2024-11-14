'use client'

import { useLocalStorage } from '@/hooks/use-localstorage'
import { createContext, use } from 'react'

type InscriptionContextType = {
  documentId: string
  saveDocumentId: (documentId: string) => void
}

type InscriptionProviderProps = {
  children: React.ReactNode
}

const InscriptionContext = createContext<InscriptionContextType>({
  documentId: '',
  saveDocumentId: () => {},
})

export function useInscription() {
  const CONTEXT = use(InscriptionContext)
  if (!CONTEXT) throw new Error('No se ha inicializado el contexto')
  return CONTEXT
}

export function InscriptionProvider(props: InscriptionProviderProps) {
  const { children } = props
  const [documentId, saveDocumentId] = useLocalStorage('documentId', '')

  return (
    <InscriptionContext.Provider value={{ documentId, saveDocumentId }}>
      {children}
    </InscriptionContext.Provider>
  )
}
