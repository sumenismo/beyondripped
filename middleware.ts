export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/admin/:path*', '/member/:path*', '/finance/:path*']
}
