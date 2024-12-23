'use client';
import React from 'react';
import { sidebarLinks } from '@/constants';
import NavLink from '../navbar/NavLink';
import { Button } from '@/components/ui/button';
import { SignedOut, SignedIn, SignOutButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import ROUTES from '@/constants/routes';

const LeftSideBar = () => {
  const { userId } = useAuth();
  return (
    <section
      className="background-light900_dark200 light-border
      custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between
      overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]"
    >
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const route =
            item.route === '/profile' && !!userId
              ? `${item.route}/${userId}`
              : item.route;

          return (
            <NavLink
              imgURL={item.imgURL}
              label={item.label}
              route={route}
              key={item.route}
            />
          );
        })}
      </div>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Button
            className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
            asChild
          >
            <Link href={ROUTES.SIGN_IN}>
              <Image
                src="/assets/icons/account.svg"
                alt="Account"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Link>
          </Button>

          <Button
            className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
            asChild
          >
            <Link href={ROUTES.SIGN_UP}>
              <Image
                src="/assets/icons/sign-up.svg"
                alt="Account"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign Up</span>
            </Link>
          </Button>
        </div>
      </SignedOut>

      <SignedIn>
        <SignOutButton>
          <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
            <Image
              src="/assets/icons/sign-up.svg"
              alt="Account"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className="max-lg:hidden">Logout</span>
          </Button>
        </SignOutButton>
      </SignedIn>
    </section>
  );
};
export default LeftSideBar;
