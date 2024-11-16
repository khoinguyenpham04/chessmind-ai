import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api(.*)',
  '/_next(.*)',
  '/favicon.ico'
])

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    return
  }
})

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)', 
    '/',
    '/(api|trpc)(.*)'
  ]
}