import { getUserAnswers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import AnswerCard from '../cards/AnswerCard';

interface AnswersTabProps extends SearchParamsProps {
  userId: string;
  clerkId: string;
}

const AnswersTab = async ({
  searchParams,
  userId,
  clerkId,
}: AnswersTabProps) => {
  const { answers, totalAnswers } = await getUserAnswers({ userId });

  return (
    <>
      {answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes}
          createdAt={answer.createdAt}
        />
      ))}
    </>
  );
};
export default AnswersTab;
