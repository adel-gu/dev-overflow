'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarLink } from '@/types';

const NavLink: React.FC<SidebarLink> = ({ imgURL, label, route, ...props }) => {
  const pathname = usePathname();
  const isActive =
    (pathname.includes(route) && route.length > 1) || pathname === route;
  return (
    <Link
      {...props}
      href={route}
      className={`${
        isActive
          ? 'primary-gradient rounded-lg text-light-900'
          : 'text-dark300_light900'
      } flex items-center justify-start gap-4 bg-transparent p-4`}
    >
      <Image
        src={imgURL}
        alt={label}
        width={20}
        height={20}
        className={`${isActive ? '' : 'invert-colors'}`}
      />
      <p className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}>
        {label}
      </p>
    </Link>
  );
};
export default NavLink;
