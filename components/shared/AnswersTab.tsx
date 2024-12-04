import { getUserAnswers } from '@/lib/actions/user.action';
import AnswerCard from '../cards/AnswerCard';
import PaginationComp from './PaginationComp';

interface AnswersTabProps {
  page: number;
  userId: string;
  clerkId: string;
}

const AnswersTab = async ({ page, userId, clerkId }: AnswersTabProps) => {
  const { answers, totalPages } = await getUserAnswers({ userId, page });

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
      <div className="mt-10">
        <PaginationComp page={page} totalPageCount={totalPages} />
      </div>
    </>
  );
};
export default AnswersTab;
