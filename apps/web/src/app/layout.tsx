import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { CssBaseline } from '@mui/material';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import App from '@/app/App';
import React, { Suspense } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export const metadata: Metadata = {
  title: 'Comparly - Comparison Shopping Service',
  description:
    'Oszczędzaj przy każdych zakupach online z Comparly – sprytnym narzędziem do porównywania cen. Szybko, łatwo i bez przepłacania.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <CssBaseline />
        <ReactQueryProvider>
          <AppRouterCacheProvider>
            <Suspense fallback={null}>
              <ReactQueryDevtools initialIsOpen={false} />
              <App>{children}</App>
            </Suspense>
          </AppRouterCacheProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
