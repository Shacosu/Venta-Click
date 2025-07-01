import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  const isAuth = !!session?.user;
  const hasStore = session?.user?.hasStore;
  const storeSlug = session?.user?.storeSlug;
  const plan = session?.user?.plan;

  const isDashboardRoute = pathname.includes('/dashboard');
  const isPricingRoute = pathname === '/pricing';

  // Redirigir a sign-in si no está autenticado y accede a rutas protegidas
  if (!isAuth && (isDashboardRoute || pathname === '/create-store' || isPricingRoute)) {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url));
  }

  if (isAuth) {
    // Si tiene tienda, redirigir de /create-store a su dashboard
    if (hasStore && storeSlug && pathname === '/create-store') {
      return NextResponse.redirect(new URL(`/${storeSlug}/dashboard`, request.url));
    }

    // Si no tiene tienda pero intenta acceder a un dashboard, redirigir a /create-store
    if (!hasStore && isDashboardRoute) {
      return NextResponse.redirect(new URL('/create-store', request.url));
    }

    // Si tiene tienda y accede a un dashboard, asegurarse que sea el suyo
    if (hasStore && storeSlug && isDashboardRoute) {
      const pathSlug = pathname.split('/')[1];
      if (pathSlug !== storeSlug) {
        return NextResponse.redirect(new URL(`/${storeSlug}/dashboard`, request.url));
      }
    }

    // Si el usuario tiene plan de pago y va a pricing, redirigir a su dashboard
    if (plan !== 'Free' && isPricingRoute && storeSlug) {
      return NextResponse.redirect(new URL(`/${storeSlug}/dashboard`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Este matcher cubre todas las rutas excepto las de la API, assets, etc.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
