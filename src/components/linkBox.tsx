import React, { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useUserStore } from '../store/userStore';
import { debounce } from 'lodash';
// import CropperModal from './CropperModal';

interface LinkBoxProps {
  link: {
    id: number;
    name: string;
    url: string;
    image: string;
  };
  selectedId: number;
  selectedStr: string;
  onUpdatedInput: (data: { id: number; str: string }) => void;
}

const LinkBox: React.FC<LinkBoxProps> = ({
  link,
  selectedId,
  selectedStr,
  onUpdatedInput,
}) => {
  const userStore = useUserStore();

  const [name, setName] = useState(link.name);
  const [url, setUrl] = useState(link.url);
  const [isDelete, setIsDelete] = useState(false);
  const [openCropper, setOpenCropper] = useState(false);
  const [isUploadImage, setIsUploadImage] = useState(false);

  const updateLink = useCallback(
    debounce(async () => {
      try {
        await userStore.updateLink(link.id, name, url);
        await userStore.getAllLinks();
      } catch (error: any) {
        console.log(error);
        setErrors(error.response.data.errors);
      }
    }, 500),
    [link.id, name, url]
  );

  const changeInput = (str: string, linkIdNameString: string) => {
    if (selectedId === link.id && selectedStr === str) {
      setTimeout(() => {
        const element = document.getElementById(
          `${linkIdNameString}-${link.id}`
        );
        if (element) element.focus();
      }, 100);
    }
  };

  const editName = (id: number, str: string) => {
    if (userStore.isMobile) {
      userStore.setUpdatedLinkId(id);
      return false;
    } else if (id === link.id && str === 'isName') {
      return true;
    }
    return false;
  };

  const editLink = (id: number, str: string) => {
    if (userStore.isMobile) {
      userStore.setUpdatedLinkId(id);
      return false;
    } else if (id === link.id && str === 'isLink') {
      return true;
    }
    return false;
  };

  const editImage = () => {
    if (userStore.isMobile) {
      userStore.setUpdatedLinkId(link.id);
    } else {
      setIsUploadImage(true);
      setIsDelete(false);
    }
  };

  const updateLinkImage = async (data: any) => {
    try {
      await userStore.updateLinkImage(data);
      await userStore.getAllLinks();
      setTimeout(() => setOpenCropper(false), 300);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLink = async () => {
    const res = confirm('Are you sure you want to delete this link?');
    try {
      if (res) {
        await userStore.deleteLink(link.id);
        await userStore.getAllLinks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (name && name !== link.name) {
      updateLink();
    }
  }, [name, link.name, updateLink]);

  useEffect(() => {
    if (url && url !== link.url) {
      updateLink();
    }
  }, [url, link.url, updateLink]);

  useEffect(() => {
    if (selectedId) {
      changeInput('isName', 'editNameInput');
      changeInput('isLink', 'editLinkInput');
    }
  }, [selectedId]);

  useEffect(() => {
    if (selectedStr) {
      changeInput('isName', 'editNameInput');
      changeInput('isLink', 'editLinkInput');
    }
  }, [selectedStr]);

  useEffect(() => {
    if (!userStore.updatedLinkId) {
      onUpdatedInput({ id: 0, str: '' });
    }
  }, [userStore.updatedLinkId]);

  useEffect(() => {
    setName(link.name);
    setUrl(link.url);

    const handleMouseUp = (e: MouseEvent) => {
      let editNameInput = document.getElementById(`editNameInput-${link.id}`);
      let editLinkInput = document.getElementById(`editLinkInput-${link.id}`);

      if (
        editNameInput &&
        !editNameInput.contains(e.target as Node) &&
        selectedStr === 'isName' &&
        link.id === selectedId
      ) {
        (editNameInput as HTMLElement).blur();
        onUpdatedInput({ id: 0, str: '' });
      }

      if (
        editLinkInput &&
        !editLinkInput.contains(e.target as Node) &&
        selectedStr === 'isLink' &&
        link.id === selectedId
      ) {
        (editLinkInput as HTMLElement).blur();
        onUpdatedInput({ id: 0, str: '' });
      }
    };

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [link.id, selectedStr, selectedId, onUpdatedInput, link.name, link.url]);

  return (
    <div id={`LinkBox${link.id}`} className="w-full bg-white rounded-3xl">
      <div id="MainLinkBoxSection" className="px-8 py-5">
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center w-full">
            {editName(selectedId, selectedStr) ? (
              <input
                id={`editNameInput-${link.id}`}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={18}
                className="w-full text-sm font-semibold focus:outline-none"
              />
            ) : (
              <div className="flex items-center w-full">
                <div
                  onClick={() => {
                    setName(link.name);
                    onUpdatedInput({ id: link.id, str: 'isName' });
                  }}
                  className={`font-semibold mr-2 cursor-pointer ${
                    userStore.isMobile ? 'text-xl' : 'text-sm'
                  }`}
                >
                  {link.name}
                </div>
                <Icon
                  onClick={() => onUpdatedInput({ id: link.id, str: 'isName' })}
                  className="cursor-pointer"
                  icon="octicon:pencil-24"
                  width={userStore.isMobile ? 23 : 17}
                  height={userStore.isMobile ? 23 : 17}
                  color="#676B5F"
                />
              </div>
            )}
          </div>
          <div className="flex items-center">
            <Icon
              className={`cursor-pointer ${
                userStore.isMobile ? 'min-w-[23px]' : 'min-w-[17px]'
              }`}
              icon="mdi:bell-outline"
              width={userStore.isMobile ? 25 : 20}
              height={userStore.isMobile ? 25 : 20}
              color="#676B5F"
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center w-full">
            {editLink(selectedId, selectedStr) ? (
              <input
                id={`editLinkInput-${link.id}`}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full text-sm focus:outline-none"
              />
            ) : (
              <div className="flex items-center w-[calc(100%-2px)]">
                <div
                  onClick={() => {
                    setUrl(link.url);
                    onUpdatedInput({ id: link.id, str: 'isLink' });
                  }}
                  className={`mr-2 truncate cursor-pointer ${
                    userStore.isMobile ? 'text-lg' : 'text-sm'
                  }`}
                >
                  {link.url}
                </div>
                <Icon
                  onClick={() => onUpdatedInput({ id: link.id, str: 'isLink' })}
                  className={`cursor-pointer ${
                    userStore.isMobile ? 'min-w-[23px]' : 'min-w-[17px]'
                  }`}
                  icon="octicon:pencil-24"
                  width={userStore.isMobile ? 23 : 17}
                  height={userStore.isMobile ? 23 : 17}
                  color="#676B5F"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between py-1 mt-4">
          <div className="flex items-center w-full relative">
            <div
              className={`flex items-center px-1.5 py-[2px] absolute -left-[6px] rounded-md ${
                isUploadImage ? 'bg-[#8228D9]' : 'hover:bg-gray-200'
              }`}
            >
              <Icon
                onClick={editImage}
                className="cursor-pointer"
                icon="icon-park-twotone:collect-picture"
                width={userStore.isMobile ? 23 : 17}
                height={userStore.isMobile ? 23 : 17}
                color={isUploadImage ? '#FFFFFF' : '#676B5F'}
              />
            </div>
          </div>
          {!userStore.isMobile && (
            <div className="flex items-center">
              <div className="flex items-center px-1.5 py-[2px] rounded-md relative">
                <button
                  onClick={() => {
                    setIsDelete(true);
                    setIsUploadImage(false);
                  }}
                  className={`flex items-center px-1.5 py-[2px] absolute -right-[6px] rounded-md ${
                    isDelete ? 'bg-[#8228D9]' : 'hover:bg-gray-200'
                  }`}
                >
                  <Icon
                    className="cursor-pointer"
                    icon="carbon:trash-can"
                    width={20}
                    height={20}
                    color={isDelete ? '#FFFFFF' : '#676B5F'}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        id="FooterLinkDeleteSection"
        className={`overflow-hidden ${
          isDelete
            ? 'max-h-[180px] transition-all duration-300 ease-in'
            : 'max-h-0 transition-all duration-200 ease-out'
        }`}
      >
        <button
          onClick={() => setIsDelete(false)}
          className="relative w-full bg-[#DFE2D9] py-1.5"
        >
          <Icon
            icon="mdi:close"
            className="absolute right-1 top-[6px] cursor-pointer"
            width={20}
            height={20}
            color="#45494A"
          />
          <div className="text-center text-sm font-bold text-[#45494A]">
            Delete
          </div>
        </button>

        <div className="flex items-center justify-center pt-3">
          Delete this forever?
        </div>

        <div className="w-full px-4 py-3">
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={deleteLink}
              className="flex items-center border justify-center w-full py-3 rounded-full text-black font-semibold hover:bg-gray-100"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div
        id="FooterLinkBoxSection"
        className={`overflow-hidden ${
          isUploadImage
            ? 'max-h-[180px] transition-all duration-300 ease-in'
            : 'max-h-0 transition-all duration-200 ease-out'
        }`}
      >
        <div className="relative w-full bg-[#DFE2D9] py-1.5">
          <Icon
            onClick={() => setIsUploadImage(false)}
            icon="mdi:close"
            className="absolute right-1 top-[6px] cursor-pointer"
            width={20}
            height={20}
            color="#45494A"
          />
          <div className="text-center text-sm font-bold text-[#45494A]">
            Add Thumbnail
          </div>
        </div>

        <div className="w-full flex items-center justify-between px-4 py-5">
          <img
            className="rounded-lg w-[80px] aspect-square"
            src={link.image}
            alt="Thumbnail"
          />

          <div className="w-full pl-3">
            <button
              onClick={() => setOpenCropper(true)}
              className="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] mb-2"
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* {openCropper && (
        <CropperModal
          linkId={link.id}
          onData={(data) => {
            // Handle data from CropperModal
          }}
          onClose={() => setOpenCropper(false)}
        />
      )} */}
    </div>
  );
};

export default LinkBox;
