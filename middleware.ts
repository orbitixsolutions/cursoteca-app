import authConfig from '@/auth.config'
import NextAuth from 'next-auth'
import { ecaExists } from '@/services/helpers/eca-exists'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes'

export const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log(isLoggedIn)
      const { pathname } = nextUrl

      const [DOMAIN] = pathname.split('/').splice(1)
      const ECA_EXITS = ecaExists(DOMAIN)

      if (!ECA_EXITS) return Response.redirect(new URL('/', nextUrl))
      const LOGIN_REDIRECT = `/${DOMAIN}${DEFAULT_LOGIN_REDIRECT}`

      return Response.redirect(new URL(LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    const redirect = new URL('/', nextUrl).href
    return Response.redirect(redirect)
  }

  return
})

export const config = {
  matcher: ['/auth', '/:path/auth', '/:path/dashboard'],
}
