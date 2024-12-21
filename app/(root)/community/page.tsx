import UserCard from '@/components/cards/UserCard';
import Filter from '@/components/shared/filters/Filter';
import PaginationComp from '@/components/shared/PaginationComp';
import LocalSearch from '@/components/shared/Search/LocalSearch';
import { UserFilters } from '@/constants/filters';
import { getAllUsers } from '@/lib/actions/user.action';
import Link from 'next/link';
import { Suspense } from 'react';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const page = (await searchParams).page
    ? Number((await searchParams).page)
    : 1;

  const { users, totalPages } = await getAllUsers({
    searchQuery: (await searchParams)?.q,
    filter: (await searchParams)?.filter,
    page,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Suspense>
          <LocalSearch
            route="/community"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for amazing minds"
            otherClasses="flex-1"
          />
        </Suspense>
        <Suspense>
          <Filter
            filters={UserFilters}
            otherClasses="min-h-[56px] w-[200px]"
            // containerClasses="hidden max-md:flex"
            route="/community"
          />
        </Suspense>
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {/* get all users */}
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-1 font-bold text-blue-300">
              Join to be the first
            </Link>
          </div>
        )}
      </section>
      <div className="mt-10">
        <PaginationComp page={page} totalPageCount={totalPages} />
      </div>
    </>
  );
};
export default page;
