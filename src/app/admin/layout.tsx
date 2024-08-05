'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useUserStore } from '../../store/userStore';
import path from 'path';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userStore = useUserStore();
  const pathname = usePathname();

  const [isTopNav, setIsTopNav] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isSecondaryTopNav, setIsSecondaryTopNav] = useState(false);

  const openMenu = (menu: string) => {
    if (menu === 'TopNav') {
      setIsTopNav(true);
    } else if (menu === 'SecondaryTopNav') {
      setIsSecondaryTopNav(true);
    } else {
      pathname === '/admin/settings';
    }
  };

  const logout = async () => {
    console.log('logout');
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth <= 767) {
      setIsTopNav(false);
    }
  }, [windowWidth]);

  const currentMobilePage = () => {
    switch (pathname) {
      case '/admin':
        return 'Links';
        break;
      case '/admin/apperance':
        return 'Apperance';
        break;
      case '/admin/preview':
        return 'Preview';
        break;
      case '/admin/more':
        return 'More';
        break;
    }
  };

  const links = [
    {
      name: 'Links',
      url: '/admin',
      icon: 'icon-park-outline:hamburger-button',
    },
    {
      name: 'Apperance',
      url: '/admin/apperance',
      icon: 'fluent:shapes-48-regular',
    },
    { name: 'Analytics', url: '/', icon: 'tabler:brand-google-analytics' },
    { name: 'Settings', url: '/', icon: 'material-symbols:settings' },
  ];

  const linksSecondaryNav = [
    {
      name: 'Links',
      url: '/admin',
      icon: 'icon-park-outline:hamburger-button',
    },
    {
      name: 'Apperance',
      url: '/admin/apperance',
      icon: 'fluent:shapes-48-regular',
    },
    { name: 'Analytics', url: '/', icon: 'tabler:brand-google-analytics' },
    { name: 'More', url: '/admin/more', icon: '', img: '/laptop.jpg' },
  ];

  const linksMobile = [
    {
      name: 'Links',
      url: '/admin',
      icon: 'icon-park-outline:hamburger-button',
      img: '',
    },
    {
      name: 'Apperance',
      url: '/admin/apperance',
      icon: 'fluent:shapes-48-regular',
      img: '',
    },
    {
      name: 'Preview',
      url: '/admin/preview',
      icon: 'icon-park-outline:preview-open',
      img: '',
    },
    {
      name: 'Analytics',
      url: '/',
      icon: 'tabler:brand-google-analytics',
      img: '',
    },
    { name: 'More', url: '/admin/more', icon: '', img: '/laptop.jpg' },
  ];

  return (
    <>
      <div id="AdminLayout" className="w-full fixed z-30">
        {!userStore.isMobile && (
          <div
            id="TopNav"
            className="w-full flex items-center justify-between md:pt-2.5 md:px-2.5"
          >
            <div className="flex items-center justify-between md:rounded-full md:shadow-sm px-2 md:pl-6 pl-4 py-[8px] bg-white w-full border-b">
              <div className="flex items-center justify-start w-full max-w-[500px]">
                <Link href="/admin">
                  <Image
                    className="w-[23px] min-w-[23px] select-none"
                    src="/linktree-logo-icon.png"
                    alt="Linktree Logo"
                    width={23}
                    height={23}
                  />
                </Link>

                {links.map((link) => (
                  <div
                    key={link.name}
                    className="lg:px-2.5 px-0.5 md:block hidden"
                  >
                    <Link
                      href={link.url}
                      className="flex items-center text-sm font-semibold px-1.5 py-3 rounded-lg hover:bg-gray-100"
                    >
                      <Icon
                        icon={link.icon}
                        className="mr-0.5"
                        width="18"
                        height="18"
                        color={pathname === link.url ? '#000000' : '#676B5F'}
                      />
                      <div
                        className={
                          pathname === link.url
                            ? 'text-[#000000]'
                            : 'text-[#676B5F]'
                        }
                      >
                        {link.name}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  className="flex items-center text-sm font-semibold p-2 rounded-full hover:bg-gray-100"
                  onClick={() => openMenu('TopNav')}
                >
                  <Icon
                    icon="healthicons:megaphone-outline"
                    className="mr-0.5"
                    width="22"
                    height="22"
                  />
                </button>

                <button className="flex items-center font-semibold px-3 py-2 rounded-full bg-gray-100">
                  <Icon
                    icon="mdi:lightning-bolt"
                    className="mr-0.5"
                    width="18"
                    height="18"
                  />
                  Upgrade
                </button>

                <button
                  className="flex items-center font-semibold px-3 py-2 rounded-full border hover:bg-gray-100"
                  onClick={() => (userStore.isPreviewOverlay = true)}
                >
                  <Icon
                    icon="teenyicons:upload-solid"
                    className="mr-1.5"
                    width="18"
                    height="18"
                  />
                  Share
                </button>

                <button
                  className="rounded-full md:block hidden"
                  onClick={() => openMenu('TopNav')}
                >
                  <Image
                    className="rounded-full "
                    src="/laptop.jpg"
                    alt="User Profile"
                    width={40}
                    height={40}
                  />
                </button>
              </div>
            </div>
            {isTopNav && (
              <div className="absolute md:block hidden right-4 top-16 border shadow-[0_5px_15px_15px_rgba(0,0,0,0.1)] bg-white w-full max-w-[300px] rounded-2xl">
                <button
                  className="w-full flex items-center text-gray-600 text-[15px] p-3 hover:text-black"
                  onClick={logout}
                >
                  <Icon
                    icon="circum:logout"
                    className="mr-6"
                    width="18"
                    height="18"
                  />
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
        {!userStore.isMobile && (
          <div
            id="SecondaryTopNav"
            className="w-full md:hidden flex items-center justify-between md:pt-2.5 md:px-2.5"
          >
            <div
              className={`flex items-center justify-between gap-4 shadow-sm bg-white w-full ${pathname}`}
            >
              <div className="flex w-full">
                {linksSecondaryNav.map((link) => (
                  <div key={link.name} className="w-1/4">
                    <Link
                      href={link.url}
                      className={`relative flex justify-center border-t-black text-sm w-full h-full font-semibold px-1.5 my-[1px] py-[1px] hover:bg-gray-100 ${
                        pathname === link.url ? 'border-b-2 border-b-black' : ''
                      }`}
                    >
                      <button className="relative pt-[6px]">
                        {link.icon ? (
                          <Icon
                            icon={link.icon}
                            width="20"
                            height="20"
                            color={
                              pathname === link.url ? '#000000' : '#676B5F'
                            }
                          />
                        ) : (
                          <Image
                            className="rounded-full min-w-[22px] w-[22px]"
                            src={link.img ?? '/default-avatar.png'}
                            alt={link.name}
                            width={22}
                            height={22}
                          />
                        )}
                        <div
                          className={`relative text-[13px] text-[#676B5F] ${
                            link.img ? '-left-[5px]' : ''
                          }`}
                        >
                          <span
                            className={
                              pathname === link.url
                                ? 'text-[#000000]'
                                : 'text-[#676B5F]'
                            }
                          >
                            {link.name}
                          </span>
                        </div>
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {!userStore.isMobile && (
          <div
            id="PreviewButton"
            className="fixed bottom-10 w-full flex items-center justify-center"
          >
            <button
              className="md:hidden flex items-center text-[17px] font-semibold px-5 py-2.5 bg-[#DFE2D9] rounded-full"
              onClick={() => (userStore.isPreviewOverlay = true)}
            >
              <Icon
                icon="icon-park-outline:preview-open"
                width="20"
                height="20"
                className="mr-2"
              />
              Preview
            </button>
          </div>
        )}
        {userStore.isMobile && (
          <div
            id="TopNavMobile"
            className="fixed w-full flex items-center justify-between px-2.5 bg-[#F3F3F1]"
          >
            <div className="flex items-center justify-between w-full py-[8px]">
              <div className="flex items-center justify-between w-full text-3xl font-bold max-w-[500px]">
                {currentMobilePage()}
              </div>

              <div className="flex items-center justify-between gap-3">
                <button className="flex items-center text-[18px] font-semibold px-3 py-2 rounded-full bg-gray-200">
                  Upgrade
                  <Icon
                    icon="mdi:lightning-bolt"
                    className="ml-1"
                    width="20"
                    height="20"
                  />
                </button>

                <button
                  className="flex items-center font-semibold px-3 py-2 rounded-full hover:bg-gray-200"
                  onClick={() => (userStore.isPreviewOverlay = true)}
                >
                  <Icon
                    icon="ph:share-network"
                    className="mr-0.5"
                    width="23"
                    height="23"
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="px-2.5 w-full z-0">{children}</div>
      {userStore.isMobile && (
        <div
          id="BottomNav"
          className={`fixed z-20 bottom-0 flex w-full bg-white shadow-[0_35px_60px_10px_rgba(0,0,0,0.4)] ${
            userStore.isMobile ? 'h-[70px]' : 'h-[60px]'
          }`}
        >
          <div className="flex w-full">
            {linksMobile.map((link) => (
              <div key={link.name} className="w-1/5">
                <button
                  className={`relative flex justify-center text-sm w-full h-full font-semibold px-1.5 py-1 hover:bg-gray-100 ${
                    pathname === link.url ? 'border-t-2 border-t-black' : ''
                  }`}
                >
                  <Link href={link.url} className="relative h-[35px]">
                    {link.icon ? (
                      <Icon
                        icon={link.icon}
                        className="mr-0.5 mt-[2px]"
                        width="25"
                        height="25"
                        color={pathname === link.url ? '#000000' : '#676B5F'}
                      />
                    ) : (
                      <Image
                        className="rounded-full min-w-[25px] w-[25px] mt-[2px]"
                        src={link.img ?? '/default-avatar.png'}
                        alt={link.name}
                        width={25}
                        height={25}
                      />
                    )}
                    <div
                      className={`relative text-[13px] ${
                        link.img ? '-left-[4px]' : ''
                      }`}
                    >
                      <span
                        className={
                          pathname === link.url
                            ? 'text-[#000000]'
                            : 'text-[#676B5F]'
                        }
                      >
                        {link.name}
                      </span>
                    </div>
                  </Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLayout;
