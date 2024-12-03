import { getUserQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import QuestionCard from '../cards/QuestionCard';

interface QuestionsTabProps extends SearchParamsProps {
  userId: string;
  clerkId: string;
}

const QuestionsTab = async ({
  searchParams,
  userId,
  clerkId,
}: QuestionsTabProps) => {
  const { totalQuestions, questions } = await getUserQuestions({ userId });
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
    </>
  );
};
export default QuestionsTab;
