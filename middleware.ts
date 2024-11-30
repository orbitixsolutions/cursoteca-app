import { apiAuthPrefix, authRoutes, publicRoutes } from '@/routes'
// import { matcher } from '@/data/matcher'
import authConfig from '@/auth.config'
import NextAuth from 'next-auth'

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
    if (isLoggedIn) return
    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    const redirect = new URL('/', nextUrl).href
    return Response.redirect(redirect)
  }

  return
})

export const config = {
  matcher: [
    '/login',
    '/:path/dashboard',
    '/:path/dashboard/admin',
    '/:path/dashboard/courses',
    '/:path/dashboard/inscriptions',
  ],
}
