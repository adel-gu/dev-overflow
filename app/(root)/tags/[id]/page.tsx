import QuestionCard from '@/components/cards/QuestionCard';
import NoResults from '@/components/shared/NoResults';
import LocalSearch from '@/components/shared/Search/LocalSearch';
import { getQuestionsByTagId } from '@/lib/actions/tag.actions';
import { URLProps } from '@/types';

const page = async ({ params, searchParams }: URLProps) => {
  const tagId = params.id;
  const results = await getQuestionsByTagId({
    tagId,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{results.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearch
          route={`/tags/${tagId}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
      </div>

      {/* Questions */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {results.questions?.length > 0 ? (
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
    </>
  );
};
export default page;
