import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { dir } from 'i18next';
import { languages } from '../i18n/settings';

const dmSans = DM_Sans({ subsets: ['latin'] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: 'Roberto Saliola | Web Developer ',
  description: 'Generated by create next app', //TODO -> add description
};

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  return (
    <html
      lang={lng}
      dir={dir(lng)}
      className="dark scroll-smooth"
    >
      <body
        className={`${dmSans.className} flex flex-col h-screen bg-background-light dark:bg-bg-dark transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
