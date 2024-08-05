'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useUserStore } from '../../../store/userStore';
import AdminLayout from '../layout';
import TextInput from '../../../components/textInput';
import MobileSectionDisplay from '../../../components/mobileSectionDisplay';
// import CropperModal from '../../../components/cropperModal';
import { debounce } from 'lodash';

export default function ApperancePage() {
  const userStore = useUserStore();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState('');
  const [isBioFocused, setIsBioFocused] = useState(false);
  const [openCropper, setOpenCropper] = useState(false);

  useEffect(() => {
    setName(userStore.name);
    setBio(userStore.bio);
  }, []);

  const updateTheme = async (themeId: string) => {
    try {
      await userStore.updateTheme(themeId);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDetails = useCallback(
    debounce(async () => {
      try {
        await userStore.updateUserDetails(name, bio);
        await userStore.getUser();
      } catch (error) {
        console.log(error);
        setErrors(error.response.data.errors);
      }
    }, 1000),
    [name, bio]
  );

  const bioLengthComputed = () => {
    return !bio ? 0 : bio.length;
  };

  const updateUserImage = async () => {
    try {
      await userStore.updateUserImage(data);
      await userStore.getUser();
      setTimeout(() => setOpenCropper(false), 300);
    } catch (error) {
      setOpenCropper(false);
      alert(error);
      console.log(error);
    }
  };

  useEffect(() => {
    updateUserDetails();
  }, [name, bio]);

  useEffect(() => {
    if (data) {
      updateUserImage();
    }
  }, [data]);

  return (
    <AdminLayout>
      <div id="ApperancePage" className="flex h-[calc(100%-50px)] pb-4">
        <div className="lg:w-[calc(100%-500px)] md:w-[calc(100%-330px)] w-full md:pt-20 pt-14">
          <div className="max-w-[750px] mx-auto pb-24">
            <div id="ProfileSection">
              <div
                className={`font-semibold pb-4 ${
                  userStore.isMobile ? 'mt-8 text-2xl' : 'mt-20 md:mt-8 text-xl'
                }`}
              >
                Profile
              </div>

              <div className="w-full bg-white rounded-3xl p-6">
                <div className="flex items-center justify-between gap-4">
                  <Image
                    className="rounded-full w-[90px]"
                    src="/laptop.jpg"
                    alt="User Image"
                    width={90}
                    height={90}
                  />

                  <div className="w-full">
                    <button
                      onClick={() => setOpenCropper(true)}
                      className="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] mb-2"
                    >
                      Pick image
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <TextInput
                    placeholder="Profile Title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    inputType="text"
                    max={25}
                    error={errors && errors.name ? errors.name[0] : ''}
                  />
                </div>

                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  maxLength={80}
                  placeholder="Bio"
                  onFocus={() => setIsBioFocused(true)}
                  onBlur={() => setIsBioFocused(false)}
                  className={`w-full mt-4 bg-[#EFF0EB] text-gray-800 border-2 text-sm rounded-xl py-3.5 px-3 placeholder-gray-500 resize-none focus:outline-none ${
                    isBioFocused ? 'border-gray-900' : 'border-[#EFF0EB]'
                  }`}
                ></textarea>
                <div className="flex items-center justify-end text-[#676B5F] text-[13px]">
                  {bioLengthComputed()}/80
                </div>
              </div>
            </div>

            <div id="ThemeSection">
              <div
                className={`font-semibold pb-4 ${
                  userStore.isMobile ? 'mt-8 text-2xl' : 'mt-20 md:mt-8 text-xl'
                }`}
              >
                Themes
              </div>

              <div className="w-full bg-white rounded-3xl p-6">
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4">
                  {userStore.colors.map((item) => (
                    <div key={item.id}>
                      <div
                        className={`border-2 border-gray-500 rounded-lg aspect-[2/3] border-dashed cursor-pointer ${
                          userStore.theme_id == item.id
                            ? 'transition-all duration-150 ease-in p-2'
                            : 'transition-all duration-150 ease-out p-0'
                        }`}
                      >
                        <div
                          onClick={() => updateTheme(item.id)}
                          className="relative rounded-xl h-full mx-auto"
                        >
                          <div
                            className={`absolute left-0 top-0 h-full w-full z-0 ${item.color}`}
                          />
                          <div className="relative z-10 pt-9">
                            <div className="rounded-full mx-auto w-12 h-12 bg-[#EFF0EA] bg-opacity-70" />
                            <div className="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-4 bg-[#EFF0EA] bg-opacity-70" />
                            <div className="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-1 bg-[#EFF0EA] bg-opacity-70" />
                            <div className="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-1 bg-[#EFF0EA] bg-opacity-70" />
                          </div>
                        </div>
                      </div>
                      <div className="text-center">{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <MobileSectionDisplay />
        {/* {openCropper && (
          <CropperModal
            onData={(newData) => setData(newData)}
            onClose={() => setOpenCropper(false)}
          />
        )} */}
      </div>
    </AdminLayout>
  );
}
