import './globals.css';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';

import RecoilRootProvider from '@/providers/recoilRootProvider';
import ThemeProvider from '@/providers/themeProvider';
import CommonLayout from '@/components/common-layout';

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
  title: 'Next StartKit',
  description: 'This is the next start kit',
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
            <CommonLayout>{children}</CommonLayout>
          </ThemeProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
