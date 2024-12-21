import LocalSearch from '@/components/shared/Search/LocalSearch';
import { Button } from '@/components/ui/button';
import Filter from '@/components/shared/filters/Filter';
import Link from 'next/link';
import { HomePageFilters } from '@/constants/filters';
import HomeFilters from '@/components/home/HomeFilters';
import NoResults from '@/components/shared/NoResults';
import QuestionCard from '@/components/cards/QuestionCard';
import { getQuestions } from '@/lib/actions/question.action';
import PaginationComp from '@/components/shared/PaginationComp';
import { Suspense } from 'react';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const page = (await searchParams).page
    ? Number((await searchParams).page)
    : 1;

  const { questions, totalPages } = await getQuestions({
    searchQuery: (await searchParams)?.q,
    filter: (await searchParams).filter,
    page,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Suspense>
          <LocalSearch
            route="/"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for questions"
            otherClasses="flex-1"
          />
        </Suspense>
        <Suspense>
          <Filter
            filters={HomePageFilters}
            otherClasses="min-h-[56px] w-[200px]"
            containerClasses="hidden max-md:flex"
          />
        </Suspense>
      </div>
      <Suspense>
        <HomeFilters />
      </Suspense>

      {/* Questions */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions?.length > 0 ? (
          questions?.map((question) => (
            <QuestionCard
              key={question._id}
              id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes.length}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResults
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        <PaginationComp page={page} totalPageCount={totalPages} />
      </div>
    </>
  );
};
export default page;
