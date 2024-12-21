import { getUserQuestions } from '@/lib/actions/user.action';

import QuestionCard from '../cards/QuestionCard';
import PaginationComp from './PaginationComp';

interface QuestionsTabProps {
  page: number;
  userId: string;
  clerkId: string;
}

const QuestionsTab = async ({ page, userId, clerkId }: QuestionsTabProps) => {
  const { questions, totalPages } = await getUserQuestions({
    userId,
    page,
  });
  return (
    <>
      {questions.map((question) => (
        <QuestionCard
          key={question._id}
          id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes.length}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}

      <div className="mt-10">
        <PaginationComp page={page} totalPageCount={totalPages} />
      </div>
    </>
  );
};
export default QuestionsTab;
