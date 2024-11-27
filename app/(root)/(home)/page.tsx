import LocalSearch from '@/components/shared/Search/LocalSearch';
import { Button } from '@/components/ui/button';
import Filter from '@/components/shared/filters/Filter';
import Link from 'next/link';
import { HomePageFilters } from '@/constants/filters';
import HomeFilters from '@/components/home/HomeFilters';
import NoResults from '@/components/shared/NoResults';
import QuestionCard from '@/components/cards/QuestionCard';

const questions = [
  {
    _id: '1',
    title: 'Cascading Deletes in SQLAlchemy?',
    tags: [
      { _id: '1', name: 'python' },
      { _id: '2', name: 'sql' },
    ],
    author: { _id: '1', name: 'John Doe', picture: 'john.jpg' },
    upvotes: 101506,
    views: 1000007,
    answers: [],
    createdAt: new Date('2024-11-25T12:00:00.000Z'),
  },
  {
    _id: '2',
    title: 'How to center a div?',
    tags: [
      { _id: '3', name: 'html' },
      { _id: '4', name: 'css' },
    ],
    author: { _id: '2', name: 'Jane Smith', picture: 'jane.jpg' },
    upvotes: 35001,
    views: 150000002,
    answers: [],
    createdAt: new Date('2023-09-02T10:30:00.000Z'),
  },
];

const page = () => {
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
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] w-[200px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      {/* Questions */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
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
    </>
  );
};
export default page;
