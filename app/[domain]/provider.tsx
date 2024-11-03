'use client'

import { EcaProps } from '@/ecas/ecas.config'
import { ecaExists } from '@/services/helpers/eca-exists'
import { AuthUser } from '@/types'
import { useRouter } from 'next/navigation'
import { createContext, use } from 'react'

type EcaContextProps = {
  user?: AuthUser | undefined
  config: EcaProps | undefined
}

type EcaProviderProps = {
  children: React.ReactNode
  user?: AuthUser | undefined
  config: EcaProps | undefined
  isAuthRequired?: boolean
}

const EcaContext = createContext<EcaContextProps>({
  user: undefined,
  config: undefined,
})

export function useEca() {
  const CONTEXT = use(EcaContext)
  if (!CONTEXT) throw new Error('useEca must be used within a EcaProvider')
  return CONTEXT
}

export function EcaProvider(props: EcaProviderProps): JSX.Element | any {
  const { children, user, config, isAuthRequired } = props
  const { back, replace } = useRouter()

  if (!isAuthRequired) {
    return (
      <EcaContext.Provider value={{ config }}>{children}</EcaContext.Provider>
    )
  }

  if (!user?.ecaId === undefined) return replace('/')
  if (user?.ecaId !== config?.id) return back()

  const ECA_EXISTS = ecaExists(config?.id)
  if (!ECA_EXISTS) return back()

  return (
    <EcaContext.Provider value={{ config, user }}>
      {children}
    </EcaContext.Provider>
  )
}
