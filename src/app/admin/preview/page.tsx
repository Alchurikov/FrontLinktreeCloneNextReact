'use client';

import React from 'react';
import Image from 'next/image';
import AdminLayout from '../../admin/layout';
import { useUserStore } from '../../../store/userStore';

const fakeLinks = [
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

const PreviewAdminPage: React.FC = () => {
  const userStore = useUserStore();

  return (
    <>
      <div
        className={`fixed overflow-auto w-full h-screen ${userStore.theme?.color}`}
      />

      <AdminLayout>
        <div
          id="PreviewAdminPage"
          className="w-full mx-auto pt-32 relative z-10"
        >
          <div className="mx-auto w-full">
            <div className="h-full mx-auto w-full">
              <Image
                className="rounded-full min-w-[120px] w-[120px] mx-auto"
                src="/laptop.jpg"
                alt="User Image"
                width={120}
                height={120}
              />

              <div
                className={`text-center text-2xl font-semibold mt-2 ${userStore.theme?.text}`}
              >
                {/* @{userStore.allLowerCaseNoCaps(userStore.name)} */}
              </div>

              <div
                className={`text-center text-lg font-light mt-2 mb-10 ${userStore.theme?.text}`}
              >
                <div className="px-8">{userStore.bio}</div>
              </div>

              {fakeLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center relative border w-[calc(100%-10px)] mx-auto bg-white mt-4 p-1 rounded-lg"
                >
                  <Image
                    className="rounded-lg h-[55px] aspect-square"
                    src={link.image}
                    alt={link.name}
                    width={55}
                    height={55}
                  />

                  <div className="absolute text-[20px] text-center w-full">
                    {link.name}
                  </div>
                </a>
              ))}

              <div className="pb-32" />
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default PreviewAdminPage;
