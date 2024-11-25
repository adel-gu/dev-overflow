import { SignedIn, UserButton } from '@clerk/nextjs';

import Theme from './Theme';
import MobileNav from './MobileNav';
import Brand from './Brand';
import GlobalSearch from '../Search/GlobalSearch';

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      {/* Brand component */}
      <Brand />

      {/* Global Search component */}
      <GlobalSearch />

      {/* Switch theme, User account button, and the hamburger mobile nav */}
      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10',
              },
              variables: {
                colorPrimary: '#ff7000',
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};
export default Navbar;
