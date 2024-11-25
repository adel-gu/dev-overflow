'use client';
import Image from 'next/image';
import React from 'react';
import { Input } from '@/components/ui/input';

interface LocalSearchProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch: React.FC<LocalSearchProps> = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}) => {
  return (
    <div className="relative w-full max-lg:hidden">
      <div
        className={`background-light800_darkgradient
relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 ${
          iconPosition === 'right' && 'flex-row-reverse'
        } ${otherClasses}`}
      >
        <Image
          src={imgSrc}
          alt="Search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder={placeholder}
          value=""
          onChange={() => {}}
          className="paragraph-regular no-focus placeholder bg-transparent border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};
export default LocalSearch;
