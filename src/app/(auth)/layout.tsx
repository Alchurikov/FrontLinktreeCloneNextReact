'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div id="AuthLayout" className="h-screen w-full flex justify-between">
      <div className="lg:pt-7 pt-3 lg:px-12 px-6 lg:w-2/3 w-full lg:min-w-[800px]">
        <Link href="/admin" className="inline-block">
          <Image
            className="lg:w-28 w-[75px] select-none"
            src="/linktree-logo.png"
            alt="Linktree Logo"
            width={112}
            height={28}
          />
        </Link>
        <main className="w-full">
          <div className="w-full md:max-w-[550px] max-w-[360px] mx-auto">
            {children}
          </div>
        </main>
      </div>

      <div className="lg:block hidden w-1/3 pointer-events-none">
        <Image
          className="object-cover w-full h-screen select-none"
          src={pathname === '/' ? '/side1.png' : '/side2.png'}
          alt="Side Image"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
