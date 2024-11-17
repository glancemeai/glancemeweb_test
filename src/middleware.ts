import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/notes/:id'] // Use wildcard or dynamic path handling for `:id`
const publicRoutes = ['/login', '/signup']

export default function middleware(req: NextRequest) {
  // 2. Check the current route
  const path = req.nextUrl.pathname
  
  // 3. Check if the session cookie exists
  const cookie = cookies().get('authorization')?.value

  // 4. Match routes more robustly
  const isProtectedRoute = protectedRoutes.some((route) =>
    matchRoute(path, route)
  )
  const isPublicRoute = publicRoutes.some((route) =>
    matchRoute(path, route)
  )

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 6. Redirect to /dashboard if the user is authenticated and visiting a public route (except `/`)
  if (isPublicRoute && cookie) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  // Allow `/` for authenticated users
  if (path === '/' && cookie) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

// Helper function to match paths with dynamic segments
function matchRoute(path:string, route:string) {
  const routeRegex = new RegExp(
    '^' + route.replace(/:\w+/g, '\\w+').replace(/\//g, '\\/') + '$'
  )
  return routeRegex.test(path)
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
