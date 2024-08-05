'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import PreviewOverlay from '@/components/previewOverlay';
import { useUserStore } from '@/store/userStore';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isBgGray, setIsBgGray] = useState(false);
  const userStore = useUserStore();

  useEffect(() => {
    if (pathname === '/' || pathname === '/register') {
      setIsBgGray(false);
    } else {
      setIsBgGray(true);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body className={inter.className}>
        {isBgGray && (
          <div className="bg-[#F3F3F1] fixed w-full h-full z-[-1]" />
        )}
        {children}
        {!userStore.isMobile && userStore.isPreviewOverlay && (
          <PreviewOverlay />
        )}
      </body>
    </html>
  );
}
