import React, { useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useUserStore } from '../store/userStore';

const fakeLink = [
  {
    id: 1,
    name: 'Fake Link',
    url: 'https://www.fake.com',
    image: '/laptop.jpg',
  },
  {
    id: 2,
    name: 'Fake Link 2',
    url: 'https://www.fake2.com',
    image: '/laptop.jpg',
  },
  {
    id: 3,
    name: 'Fake Link 3',
    url: 'https://www.fake3.com',
    image: '/laptop.jpg',
  },
];

const PreviewOverlay: React.FC = () => {
  const userStore = useUserStore();

  useEffect(() => {
    return () => {
      userStore.isPreviewOverlay = false;
    };
  }, []);

  return (
    <div
      id="PreviewOverlay"
      className={`md:hidden fixed z-30 top-0 left-0 h-full w-full overflow-auto bg-white ${userStore.theme?.color}`}
    >
      <div
        id="PreviewOverlayTopNav"
        className="w-full fixed z-10 flex items-center justify-between"
      >
        <div className="flex items-center justify-between px-2 py-[8px] pl-4 bg-white w-full border-b">
          <div className="flex items-center justify-start w-full">
            <button onClick={() => (userStore.isPreviewOverlay = false)}>
              <Image
                className="w-[23px] min-w-[23px] select-none"
                src="/linktree-logo-icon.png"
                alt="Linktree Logo"
                width={23}
                height={23}
              />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button className="flex items-center text-sm font-semibold p-2 rounded-full hover:bg-gray-100">
              <Icon
                icon="healthicons:megaphone-outline"
                className="mr-0.5"
                width={22}
                height={22}
              />
            </button>

            <button className="flex items-center font-semibold px-3 py-2 rounded-full bg-gray-100">
              <Icon
                icon="mdi:lightning-bolt"
                className="mr-0.5"
                width={18}
                height={18}
              />
              Upgrade
            </button>

            <button className="flex items-center font-semibold px-3 py-2 rounded-full border hover:bg-gray-100">
              <Icon
                icon="teenyicons:upload-solid"
                className="mr-1.5"
                width={18}
                height={18}
              />
              Share
            </button>
          </div>
        </div>
      </div>

      <div
        id="PreviewOverlayContentSection"
        className="relative w-full h-full mx-auto pt-24"
      >
        <div className="mx-auto mb-16 w-full p-3">
          <div className="h-full mx-auto w-full overflow-auto z-10">
            <Image
              className="rounded-full min-w-[100px] w-[100px] mx-auto"
              src={userStore.image}
              alt="User Image"
              width={100}
              height={100}
            />

            <div
              className={`text-center text-xl font-semibold mt-4 ${userStore.theme?.text}`}
            >
              @{userStore.allLowerCaseNoCaps(userStore.name)}
            </div>

            <div
              className={`text-center font-light mt-2 ${userStore.theme?.text}`}
            >
              <div className="px-8">{userStore.bio}</div>
            </div>

            {fakeLink.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center relative border w-[calc(100%-10px)] mx-auto bg-white mt-4 p-1 rounded-lg"
              >
                <Image
                  className="rounded-lg h-[45px] aspect-square"
                  src={link.image}
                  alt={link.name}
                  width={45}
                  height={45}
                />

                <div className="absolute text-[16px] text-center w-full">
                  {link.name}
                </div>
              </a>
            ))}
            <div className="pb-28" />
          </div>
        </div>
      </div>

      <div
        id="PreviewButton"
        className="fixed bottom-10 w-full flex items-center justify-center"
      >
        <button
          onClick={() => (userStore.isPreviewOverlay = false)}
          className="flex items-center justify-center p-2.5 bg-[#DFE2D9] rounded-full"
        >
          <Icon icon="mdi:close" width={30} height={30} />
        </button>
      </div>
    </div>
  );
};

export default PreviewOverlay;
