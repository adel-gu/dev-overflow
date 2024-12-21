'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get('q');

  const [search, setSearch] = useState(query ?? '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ['q'],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, searchParams, query, route, router, query, pathname]);

  return (
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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="paragraph-regular no-focus placeholder border-none bg-transparent shadow-none outline-none"
      />
    </div>
  );
};
export default LocalSearch;
