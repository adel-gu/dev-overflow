import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

interface INoResults {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const NoResults = ({ title, description, link, linkTitle }: INoResults) => {
  return (
    <div className="flex-col-center mt-10 w-full">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />

      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>
      <Button
        className="paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900"
        asChild
      >
        <Link href={link}>{linkTitle}</Link>
      </Button>
    </div>
  );
};
export default NoResults;
