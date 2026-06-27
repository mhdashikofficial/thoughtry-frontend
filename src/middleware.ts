import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.thoughtry.blog, demo.localhost:3000)
  let hostname = req.headers.get('host')!;

  // We only care about the subdomain
  const mainDomain = process.env.NODE_ENV === 'production' ? 'thoughtry.blog' : 'localhost:3000';
  
  // If it's just the main domain or www, do nothing (let it go to app/page.tsx or app/dashboard/...)
  if (hostname === mainDomain || hostname === `www.${mainDomain}`) {
    return NextResponse.next();
  }

  // Extract the subdomain
  const subdomain = hostname.replace(`.${mainDomain}`, '');

  // Rewrite to the dynamic route /blog/[subdomain]
  if (subdomain && subdomain !== hostname) {
    return NextResponse.rewrite(new URL(`/blog/${subdomain}${url.pathname}`, req.url));
  }

  return NextResponse.next();
}
