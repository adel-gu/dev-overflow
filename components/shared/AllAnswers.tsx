import { AnswerFilters } from '@/constants/filters';
import Filter from './filters/Filter';
import { getAnswers } from '@/lib/actions/answer.action';
import Link from 'next/link';
import Image from 'next/image';
import { getTimeStamp } from '@/lib/utils';
import ParseHTML from './ParseHTML';
import Votes from './Votes';

interface AllAnswersProps {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: string;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  filter,
}: AllAnswersProps) => {
  const { answers } = await getAnswers({
    questionId: JSON.parse(questionId),
    sortBy: filter,
  });

  return (
    <div className="mb-8 mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>

        {answers.length > 0 && (
          <Filter
            filters={AnswerFilters}
            route={`/question/${JSON.parse(questionId)}`}
          />
        )}
      </div>

      <div>
        {answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              {/* SPAN ID identifier */}
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    alt={answer.author.name}
                    width={18}
                    height={18}
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>
                    <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                      answered {getTimeStamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  {/* <Votes /> */}
                  <Votes
                    type="Answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={userId}
                    upvotes={answer.upvotes.length}
                    hasupVoted={answer.upvotes.includes(JSON.parse(userId))}
                    downvotes={answer.downvotes.length}
                    hasdownVoted={answer.downvotes.includes(JSON.parse(userId))}
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};
export default AllAnswers;
