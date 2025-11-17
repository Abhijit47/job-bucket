import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { auth } from './lib/auth/server';

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const pathname = request.nextUrl.pathname;

  // Allow access to profile for all authenticated users
  if (pathname.startsWith('/profile') && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access to admin pages for admin users
  if (pathname.startsWith('/admin') && session.user.role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  // Allow access to employer pages for employer users
  if (pathname.startsWith('/employer') && session.user.role !== 'employer') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  // Allow access to job seeker pages for job seeker users
  if (pathname.startsWith('/candidate') && session.user.role !== 'candidate') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // Redirect based on roles
  // if(session.user.role==='admin')

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  runtime: 'nodejs',
  matcher: [
    '/profile/:path*',
    '/admin/:path*',
    '/employer/:path*',
    '/candidate/:path*',
    // Exclude API routes, static files, image optimizations, and .png files
    // '/((?!_next/static|_next/image|.*\\.png$).*)',
  ],
};
