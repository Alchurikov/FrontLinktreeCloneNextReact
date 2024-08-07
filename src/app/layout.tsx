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

  useEffect(() => {
    const newColors = colors();
    userStore.setColors(newColors);
    console.log('Setting colors:', newColors);
  }, []);

  const colors = () => {
    return [
      { id: 1, color: 'bg-white', text: 'text-black', name: 'Air White' },
      { id: 2, color: 'bg-gray-800', text: 'text-white', name: 'Lake Black' },
      {
        id: 3,
        color: 'bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500',
        text: 'text-white',
        name: 'Purple Pie',
      },
      {
        id: 4,
        color: 'bg-gradient-to-t from-gray-500 via-blue-500 to-green-500',
        text: 'text-white',
        name: 'Green Grass',
      },
      {
        id: 5,
        color: 'bg-gradient-to-t from-orange-500 via-green-500 to-red-500',
        text: 'text-white',
        name: 'Traffic Lights',
      },
      {
        id: 6,
        color: 'bg-gradient-to-b from-blue-800 via-blue-500 to-green-500',
        text: 'text-white',
        name: 'Blue Sky',
      },
      {
        id: 7,
        color: 'bg-gradient-to-t from-lime-500 via-indigo-700 to-amber-500',
        text: 'text-white',
        name: 'Soft Horizon',
      },
      {
        id: 8,
        color: 'bg-gradient-to-t from-gray-800 to-emerald-500',
        text: 'text-white',
        name: 'Tinted Lake',
      },
    ];
  };

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
