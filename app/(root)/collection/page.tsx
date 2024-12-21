import { auth } from '@clerk/nextjs/server';
import LocalSearch from '@/components/shared/Search/LocalSearch';
import Filter from '@/components/shared/filters/Filter';
import { QuestionFilters } from '@/constants/filters';
import NoResults from '@/components/shared/NoResults';
import QuestionCard from '@/components/cards/QuestionCard';
import { getSavedQuestions } from '@/lib/actions/user.action';
import { redirect } from 'next/navigation';
import PaginationComp from '@/components/shared/PaginationComp';
import { Suspense } from 'react';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { userId: clerkId } = await auth();

  if (!clerkId) redirect('/');

  const page = (await searchParams).page
    ? Number((await searchParams).page)
    : 1;

  const { questions, totalPages } = await getSavedQuestions({
    clerkId,
    searchQuery: (await searchParams)?.q,
    filter: (await searchParams)?.filter,
    page,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Suspense>
          <LocalSearch
            route="/collection"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for questions"
            otherClasses="flex-1"
          />
        </Suspense>
        <Suspense>
          <Filter
            filters={QuestionFilters}
            otherClasses="min-h-[56px] w-[200px]"
            route="/collection"
          />
        </Suspense>
      </div>

      {/* Questions */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions?.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          questions?.map((question: any) => (
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
            title="There's no saved question to show"
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
