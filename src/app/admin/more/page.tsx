'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import AdminLayout from '../layout';
import { useUserStore } from '../../../store/userStore';

const MorePage: React.FC = () => {
  const userStore = useUserStore();
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth >= 767) {
      router.push('/admin');
    }
  }, [windowWidth, router]);

  const logout = async () => {
    const res = confirm('Are you sure you want to sign out?');
    if (res) {
      try {
        await userStore.logout();
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <AdminLayout>
      <div
        id="MorePage"
        className={`flex ${userStore.isMobile ? 'pt-24' : 'pt-32'}`}
      >
        <div className="rounded-md bg-white w-full">
          <button
            onClick={logout}
            className={`w-full flex items-center text-gray-600 p-3 hover:text-black ${
              userStore.isMobile ? 'text-[20px]' : 'text-[15px]'
            }`}
          >
            <Icon
              icon="circum:logout"
              className="mr-6"
              width={userStore.isMobile ? 22 : 15}
              height={userStore.isMobile ? 22 : 15}
            />
            Sign out
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MorePage;
