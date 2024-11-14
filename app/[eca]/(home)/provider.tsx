'use client'

import { EcaConfigProps } from '@/lib/ecas.config'
import { createContext, use } from 'react'

export type EcaProviderProps = {
  children: React.ReactNode
  data: EcaConfigProps | undefined
}

export type EcaContextProps = {
  data: EcaConfigProps | undefined
}

const EcaContext = createContext<EcaContextProps>({
  data: undefined,
})

export const useEca = () => {
  const CONTEXT = use(EcaContext)
  if (!CONTEXT) throw new Error('No se ha inicializado el contexto')

  return CONTEXT
}

export function EcaProvider(props: EcaProviderProps) {
  const { children, data } = props
  return <EcaContext.Provider value={{ data }}>{children}</EcaContext.Provider>
}
