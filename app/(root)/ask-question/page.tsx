import Question from '@/components/forms/Question';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const AskQuestion = async () => {
  const { userId } = await auth();

  if (!userId) redirect('/sign-in');

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <div className="h1-bold text-dark100_light900">Ask a question</div>
      <div className="mt-9">
        <Question mongoUserId={mongoUser._id.toString()} />
      </div>
    </div>
  );
};
export default AskQuestion;
