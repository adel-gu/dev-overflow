import Question from '@/components/forms/Question';
import { getQuestion } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const questionId = (await params).id;
  const { userId } = await auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const { question } = await getQuestion({ questionId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={mongoUser._id.toString()}
          questionDetails={JSON.stringify(question)}
        />
      </div>
    </>
  );
};
export default page;
