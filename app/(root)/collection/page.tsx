import { auth } from '@clerk/nextjs/server';
import LocalSearch from '@/components/shared/Search/LocalSearch';
import Filter from '@/components/shared/filters/Filter';
import { QuestionFilters } from '@/constants/filters';
import NoResults from '@/components/shared/NoResults';
import QuestionCard from '@/components/cards/QuestionCard';
import { getSavedQuestions } from '@/lib/actions/user.action';
import { redirect } from 'next/navigation';
import { SearchParamsProps } from '@/types';

const page = async ({ searchParams }: SearchParamsProps) => {
  const { userId: clerkId } = await auth();

  if (!clerkId) redirect('/');

  const { questions } = await getSavedQuestions({
    clerkId,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] w-[200px]"
        />
      </div>

      {/* Questions */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions?.length > 0 ? (
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
    </>
  );
};
export default page;
