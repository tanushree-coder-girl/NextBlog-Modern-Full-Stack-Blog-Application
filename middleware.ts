import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const protectedRoutes = ['/blog/addBlog']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (protectedRoutes.includes(pathname)) {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!)
      return NextResponse.next()
    } catch (err) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/blog/addBlog'],
}
