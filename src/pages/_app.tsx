import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isShown, setIsShown] = useState(false);
  const [bgIsGray, setBgIsGray] = useState(false);

  const userStore = useUserStore();

  useEffect(() => {
    userStore.isMobile = false;
    userStore.updatedLinkId = 0;
    userStore.addLinkOverlay = false;
    userStore.isPreviewOverlay = false;

    if ('ontouchstart' in window) {
      userStore.isMobile = true;
    }
  }, []);

  console.log('bgIsGray:', bgIsGray);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
