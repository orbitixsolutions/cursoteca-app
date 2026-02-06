/* eslint-disable @typescript-eslint/no-unused-vars */
import type NextAuth, { type DefaultSession } from 'next-auth'
import { type JWT } from 'next-auth/jwt'

export type ExtendedUser = DefaultSession['user'] & {
  role: 'DIRECTIVE' | 'ADMIN' | 'USER' | string
  eca: string | undefined | null
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'DIRECTIVE' | 'ADMIN' | 'USER' | string
    eca?: string | undefined | null
  }
}
