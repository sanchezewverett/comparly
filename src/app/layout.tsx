import type { Metadata } from 'next';
import Header from '@/app/Header';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Footer from '@/app/Footer';
import { CssBaseline } from '@mui/material';
import ReactQueryProvider from '@/providers/ReactQueryProvider';


export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang='en'>
        <body>
        <CssBaseline/>
        <ReactQueryProvider>
            <AppRouterCacheProvider>
                <Header/>
                {children}
                <Footer/>
            </AppRouterCacheProvider>
        </ReactQueryProvider>
        </body>
        </html>
    );
}
