import Filter from '@/components/shared/filters/Filter';
import NoResults from '@/components/shared/NoResults';
import PaginationComp from '@/components/shared/PaginationComp';
import LocalSearch from '@/components/shared/Search/LocalSearch';
import { TagFilters } from '@/constants/filters';
import { getAllTags } from '@/lib/actions/tag.actions';
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

  const { tags, totalPages } = await getAllTags({
    searchQuery: (await searchParams).q,
    filter: (await searchParams).filter,
    page,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Tags</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Suspense>
          <LocalSearch
            route="/tags"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search by tag name..."
            otherClasses="flex-1"
          />
        </Suspense>
        <Suspense>
          <Filter
            filters={TagFilters}
            otherClasses="min-h-[56px] w-[200px]"
            route="/tags"
          />
        </Suspense>
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {/* get all users */}
        {tags.length > 0 ? (
          tags.map((tag) => (
            <Link
              key={tag._id}
              href={`/tags/${tag._id}`}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>

                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.question.length}+
                  </span>{' '}
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResults
            title="No tags found"
            description="It looks like there are no tags found"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>

      <div className="mt-10">
        <PaginationComp page={page} totalPageCount={totalPages} />
      </div>
    </>
  );
};

export default page;
