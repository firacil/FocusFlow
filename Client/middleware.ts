import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { decrypt } from '@/lib/auth/session';

const publicRoutes = [
  '/',
  '/auth/signup',
  '/auth/login',
];
const assetPaths = ['/favicon', '/_next', '/static'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Bypass static asset requests
  if (assetPaths.some((assetPath) => path.startsWith(assetPath))) {
    return NextResponse.next();
  }

  // Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  // Handle public routes
  if (publicRoutes.includes(path)) {
    // Redirect logged-in users away from public routes
    if (session?.user && !path.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
    return NextResponse.next(); // Allow public access
  }

  // 4. Handle all other routes (considered protected)
  if (!session?.user) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next(); // Allow access to protected routes for authenticated users
}
