'use client';

import { useState } from 'react';
import { useUserStore } from '../../store/userStore';
import AdminLayout from './layout';
import AddLink from '../../components/addLink';
import LinkBox from '../../components/linkBox';
import MobileSectionDisplay from '../../components/mobileSectionDisplay';
import { Icon } from '@iconify/react';
import { Link } from '../../types/types';

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

export default function AdminPage() {
  const userStore = useUserStore();
  const [selectedInput, setSelectedInput] = useState({ id: 0, str: '' });
  const [showAddLink, setShowAddLink] = useState(false);

  const updatedInput = (e: { id: number; str: string }) => {
    setSelectedInput({ id: e.id, str: e.str });
  };

  const showAddLinkFunc = () => {
    if (userStore.isMobile) {
      userStore.addLinkOverlay = true;
    } else {
      setShowAddLink(true);
    }
  };

  return (
    <AdminLayout>
      <div id="AdminPage" className="flex h-[100vh] pb-4">
        <div className="lg:w-[calc(100%-500px)] md:w-[calc(100%-330px)] w-full md:pt-20 pt-14">
          <div className="max-w-[750px] mx-auto pb-24">
            {(userStore.isMobile || !showAddLink) && (
              <button
                onClick={showAddLinkFunc}
                className={`flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] ${
                  userStore.isMobile ? 'mt-8 text-xl' : 'mt-20 md:mt-8'
                }`}
              >
                {!userStore.isMobile && (
                  <Icon
                    icon="mdi:plus"
                    className="mr-0.5"
                    width="25"
                    height="25"
                  />
                )}
                <span>{userStore.isMobile ? 'Add new link' : 'Add link'}</span>
              </button>
            )}

            {!userStore.isMobile && showAddLink && (
              <div
                className={`${
                  showAddLink
                    ? 'mt-20 md:mt-8 mb-12 max-h-[1000px] transition-all duration-300 ease-in'
                    : 'max-h-0 transition-all duration-300 ease-out'
                }`}
              >
                <AddLink onClose={() => setShowAddLink(false)} />
              </div>
            )}

            {fakeLink.map((link: Link) => (
              <div key={link.id} className="mt-4">
                <LinkBox
                  link={link}
                  selectedId={selectedInput.id}
                  selectedStr={selectedInput.str}
                  onUpdatedInput={updatedInput}
                />
              </div>
            ))}
          </div>
        </div>
        <MobileSectionDisplay />
      </div>
    </AdminLayout>
  );
}
