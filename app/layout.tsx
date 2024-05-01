import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PriceWhiz',
  description:
    'PriceWhiz is your go-to web scraper app that tracks Amazon products for you. Easily monitor price changes and receive email notifications when your favorite items go on sale. Stay ahead of the deals with DealWhisper and never miss a bargain again!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
