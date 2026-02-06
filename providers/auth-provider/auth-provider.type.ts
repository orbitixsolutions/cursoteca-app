import { User } from 'next-auth'

export type AuthContextProps = {
  user:
    | (User & {
        role: 'DIRECTIVE' | 'ADMIN' | 'USER' | string
        eca: string | undefined | null
      })
    | undefined
}

export type AuthProviderProps = {
  user:
    | (User & {
        role: 'DIRECTIVE' | 'ADMIN' | 'USER' | string
        eca: string | undefined | null
      })
    | undefined
  children: React.ReactNode
}
