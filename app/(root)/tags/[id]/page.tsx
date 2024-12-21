import QuestionCard from '@/components/cards/QuestionCard';
import NoResults from '@/components/shared/NoResults';
import PaginationComp from '@/components/shared/PaginationComp';
import LocalSearch from '@/components/shared/Search/LocalSearch';
import { getQuestionsByTagId } from '@/lib/actions/tag.actions';
import { Suspense } from 'react';

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const tagId = (await params).id;
  const page = (await searchParams).page
    ? Number((await searchParams).page)
    : 1;

  const results = await getQuestionsByTagId({
    tagId,
    searchQuery: (await searchParams).q,
    page,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{results.tagTitle}</h1>

      <div className="mt-11 w-full">
        <Suspense>
          <LocalSearch
            route={`/tags/${tagId}`}
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search tag questions"
            otherClasses="flex-1"
          />
        </Suspense>
      </div>

      {/* Questions */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {results.questions?.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          results.questions?.map((question: any) => (
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
            title="There's no tag questions to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <div className="mt-10">
        <PaginationComp page={page} totalPageCount={results.totalPages} />
      </div>
    </>
  );
};
export default page;
