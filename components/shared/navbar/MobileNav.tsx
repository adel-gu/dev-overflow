import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Brand from './Brand';
import { SignedOut } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import NavLink from './NavLink';

const NavContent = () => {
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        return (
          <SheetClose asChild key={item.route}>
            <NavLink
              imgURL={item.imgURL}
              label={item.label}
              route={item.route}
            />
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Brand />
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button
                    className="small-medium btn-secondary
                    min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
                  >
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button
                    className="small-medium light-border-2 btn-tertiary text-dark400_light900
                    min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
                  >
                    Log In
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
