import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

type Middleware = (request: NextRequest) => NextResponse

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const redirectIfAuthenticated: Middleware = (request) => {
  const authSession = request.cookies.get('auth')?.value

  if (authSession) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

const authenticated: Middleware = (request) => {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  //   const cspHeader = `
  //   default-src 'self';
  //   script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  //   style-src 'self' 'nonce-${nonce}';
  //   img-src 'self' blob: data:;
  //   font-src 'self';
  //   object-src 'none';
  //   base-uri 'self';
  //   form-action 'self';
  //   frame-ancestors 'none';
  //   block-all-mixed-content;
  //   upgrade-insecure-requests;
  // `

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('X-Frame-Options', 'SAMEORIGIN')
  requestHeaders.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains;preload'
  )
  // requestHeaders.set(
  //   'Content-Security-Policy',
  //   cspHeader.replace(/\s{2,}/g, ' ').trim()
  // )

  const authSession = request.cookies.get('auth')?.value

  if (!authSession) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.set({
      name: 'redirect',
      value: request.url,
    })
    // response.headers.set(
    //   'Content-Security-Policy',
    //   cspHeader.replace(/\s{2,}/g, ' ').trim()
    // )
    response.headers.set('X-Frame-Options', 'SAMEORIGIN')
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains;preload'
    )
    return response
  }

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  })
}

export default function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  //   const cspHeader = `
  //   default-src 'self';
  //   script-src-elem *;
  //   script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  //   style-src 'self' 'nonce-${nonce}' 'sha256-4/2nIlfwIVTJ1+JcNQ6LkeVWzNS148LKAJeL5yofdN4=';
  //   img-src 'self' blob: data:;
  //   font-src 'self';
  //   object-src 'none';
  //   base-uri 'self';
  //   form-action 'self';
  //   frame-ancestors 'none';
  //   block-all-mixed-content;
  //   upgrade-insecure-requests;
  // `

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('X-Frame-Options', 'SAMEORIGIN')
  requestHeaders.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains;preload'
  )
  // requestHeaders.set(
  //   'Content-Security-Policy',
  //   cspHeader.replace(/\s{2,}/g, ' ').trim()
  // )

  // Uncomment if you want to redirect if authenticated.
  // if ([
  //   '/login',
  //   '/register',
  // ].includes(request.nextUrl.pathname)) {
  //   return redirectIfAuthenticated(request)
  // }

  if (
    ['/', '/pokemons', '/appointments', '/pokemons/client'].includes(
      request.nextUrl.pathname
    )
  ) {
    return authenticated(request)
  }

  if (request.nextUrl.pathname.match(/\/appointments\/\d+/)) {
    return authenticated(request)
  }

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  })
}
