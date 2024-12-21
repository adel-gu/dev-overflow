'use client';

import { useTheme } from '@/context/Theme';
import Image from 'next/image';
import Link from 'next/link';

// type BrandType = {
//   screen?: string;
// };

const Brand = () => {
  const { mode } = useTheme();
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image
        src={
          mode === 'light'
            ? '/assets/images/logo-light.svg'
            : '/assets/images/logo-dark.svg'
        }
        width={180}
        height={180}
        alt="Dev Overflow"
      />
    </Link>
  );
};
export default Brand;
