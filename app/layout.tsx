import './globals.css';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';

import RecoilRootProvider from '@/providers/recoilRootProvider';
import ThemeProvider from '@/providers/themeProvider';
import { TmaProvider } from '@/providers/tmaProvider';
import TwaLayout from '@/components/twa-layout';
import TwaComponents from '@/components/twa-component';

const inter = Inter({
  // default font
  subsets: ['latin'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  // variable font
  subsets: ['latin'],
  display: 'swap',
  variable: '--roboto',
});

export const cls = (...classnames: string[]) => {
  return classnames.join(' ');
};

export const metadata: Metadata = {
  title: 'BUIDLin Dashboard',
  description: 'Event Platform Dashboard for WEB3',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cls(inter.className, robotoMono.variable)}>
      <body>
        <RecoilRootProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TwaLayout>
              <TmaProvider>
                {children}
                <TwaComponents />
              </TmaProvider>
            </TwaLayout>
          </ThemeProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
