import React from 'react';
import Image from 'next/image';
import { useUserStore } from '../store/userStore';

interface Link {
  url: string;
  image: string;
  name: string;
}

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

const MobileSectionDisplay: React.FC = () => {
  const userStore = useUserStore();

  // if (!userStore.theme) return null;

  return (
    <div className="md:block fixed hidden right-0 lg:w-[500px] w-[310px] h-[calc(100%-20px)] mt-[20px] mx-auto border-l border-l-gray-300 pt-20">
      <div className="mx-auto mt-16 mb-16 flex items-center justify-center w-full lg:max-w-[230px] max-w-[200px] lg:h-[460px] h-[400px] p-3 rounded-3xl relative">
        <Image
          className="absolute z-10 pointer-events-none select-none"
          src="/mobile-case.png"
          alt="Mobile Case"
          layout="fill"
        />

        <div
          className={`w-full h-full absolute lg:max-w-[220px] max-w-[195px] rounded-3xl z-0 ${userStore.theme}`}
        />

        <div className="h-full mx-auto w-full overflow-auto z-10">
          <Image
            className="rounded-full min-w-[60px] w-[60px] mx-auto mt-8"
            src="/laptop.jpg"
            alt="User Image"
            width={60}
            height={60}
          />

          <div
            className={`text-center text-sm font-semibold mt-4 break-words ${userStore.theme}`}
          >
            {/* @{userStore.allLowerCaseNoCaps(userStore.name)} */}
          </div>

          <div
            className={`text-center text-[8px] font-semibold mt-2 ${userStore.theme}`}
          >
            <div className="px-8 break-words">{userStore.bio}</div>
          </div>

          {fakeLink.map((link: Link, index: number) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center relative w-[calc(100%-10px)] mx-auto border bg-white mt-2 p-1 rounded-xl"
            >
              <Image
                className="rounded-lg h-[30px] aspect-square"
                src={link.image}
                alt={link.name}
                width={30}
                height={30}
              />

              <div className="absolute w-full">
                <div className="max-w-[70%] w-full mx-auto text-[10px] text-center">
                  {link.name}
                </div>
              </div>
            </a>
          ))}

          <div className="pb-12" />
        </div>
      </div>
    </div>
  );
};

export default MobileSectionDisplay;
