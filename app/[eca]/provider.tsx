'use client'

import { EcaConfigProps } from '@/lib/ecas.config'
import { GroupedCoursesProps } from '@/utils/grouped-courses'
import { createContext, use } from 'react'

export type EcaProviderProps = {
  children: React.ReactNode
  data: EcaConfigProps | undefined
  courses?: Array<GroupedCoursesProps> | undefined
}

export type EcaContextProps = {
  data: EcaConfigProps | undefined
  courses?: Array<GroupedCoursesProps> | undefined
}

const EcaContext = createContext<EcaContextProps>({
  data: undefined,
  courses: [],
})

export const useEca = () => {
  const CONTEXT = use(EcaContext)
  if (!CONTEXT) throw new Error('No se ha inicializado el contexto')

  return CONTEXT
}

export function EcaProvider(props: EcaProviderProps) {
  const { children, data, courses } = props

  return <EcaContext.Provider value={{ data, courses }}>{children}</EcaContext.Provider>
}
