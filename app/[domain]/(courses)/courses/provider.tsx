'use client'

import { EcaProps } from '@/ecas/ecas.config'
import { CourseProps } from '@/types'
import { createContext, use } from 'react'

type CoursesContextProps = {
  data: Array<CourseProps> | undefined
  config: EcaProps | undefined
}

type CoursesProviderProps = {
  children: React.ReactNode
  data: Array<CourseProps> | undefined
  config: EcaProps | undefined
}

const CoursesContext = createContext<CoursesContextProps>({
  data: undefined,
  config: undefined,
})

export function useCourses() {
  const CONTEXT = use(CoursesContext)
  if (!CONTEXT)
    throw new Error('useCourses must be used within a CoursesProvider')
  return CONTEXT
}

export function CoursesProvider(props: CoursesProviderProps) {
  const { children, data, config } = props

  return (
    <CoursesContext.Provider value={{ data, config }}>
      {children}
    </CoursesContext.Provider>
  )
}
