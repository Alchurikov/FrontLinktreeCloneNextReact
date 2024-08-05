import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import TextInput from './textInput';
import { useUserStore } from '../store/userStore';

interface AddLinkProps {
  onClose: () => void;
}

const AddLink: React.FC<AddLinkProps> = ({ onClose }) => {
  const userStore = useUserStore();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState<any>(null);

  const addLink = async () => {
    try {
      // await userStore.addLink(name, url);
      // await userStore.getAllLinks();
      setTimeout(() => {
        onClose();
        setName('');
        setUrl('');
      }, 100);
    } catch (error: any) {
      console.log(error);
      setErrors(error.response.data.errors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    // addLink();
  };

  return (
    <div id="AddLink" className="w-full bg-white rounded-3xl overflow-hidden">
      <div className="flex items-center justify-between pb-2 p-6">
        <div className="text-[19px] font-semibold">Enter URL</div>
        <button
          onClick={onClose}
          className="flex items-center rounded-full p-1.5 hover:bg-[#EFF0EA]"
        >
          <Icon icon="mdi:close" width="20" height="20" color="#676B5F" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 w-full pt-2 p-6"
      >
        <div className="w-full">
          <TextInput
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputType="text"
            error={errors && errors.name ? errors.name[0] : ''}
          />

          <div className="py-1" />

          <TextInput
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            inputType="text"
            error={errors && errors.url ? errors.url[0] : ''}
          />
        </div>

        <button
          type="submit"
          disabled={!name && !url}
          onClick={addLink}
          className={`rounded-full p-3 px-6 ${
            name && url
              ? 'bg-[#8228D9] hover:bg-[#6c21b3] text-white'
              : 'bg-[#EFF0EA] text-[#A7AAA2]'
          }`}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddLink;
