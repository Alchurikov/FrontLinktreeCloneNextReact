'use client';

import React, { useState, ChangeEvent } from 'react';

interface TextInputProps {
  value: string;
  placeholder: string;
  max?: number;
  inputType?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  value,
  placeholder,
  max,
  inputType = 'text',
  error,
  onChange,
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div>
      <input
        id={placeholder}
        placeholder={placeholder}
        maxLength={max}
        className={`
          w-full
          bg-[#EFF0EB]
          text-gray-800
          border-2
          text-sm
          rounded-xl
          py-3.5
          px-3
          placeholder-gray-500
          focus:outline-none
          ${isFocused ? 'border-gray-900' : 'border-[#EFF0EB]'}
        `}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type={inputType}
        value={value}
        onChange={handleInputChange}
        autoComplete="off"
      />
      {error && (
        <span className="text-red-500 text-[14px] font-semibold">{error}</span>
      )}
    </div>
  );
};

export default TextInput;
