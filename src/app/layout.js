import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Providers } from '@/app/providers'
import { Noto_Serif, Noto_Sans_Display } from 'next/font/google'


export const notoSerif = Noto_Serif({ 
  subsets: ['latin'],
  variable: '--font-noto-serif'
})

export const notoSansDisplay = Noto_Sans_Display({
  subsets: ['latin'],
  variable: '--font-noto-sans-display'
})

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
            <AppRouterCacheProvider>
              {children}
            </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
