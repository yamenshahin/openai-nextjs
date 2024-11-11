export { auth as middleware } from '@/auth';

export const config = {
  matcher: '/:path*',
  runtime: 'nodejs',
  unstable_allowDynamic: ['/lib/db.ts', '/node_modules/mongoose/dist/**'],
};
