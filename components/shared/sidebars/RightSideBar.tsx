import Image from 'next/image';
import Link from 'next/link';
import TagCard from '../cards/TagCard';
import { getHotQuestions } from '@/lib/actions/question.action';
import { getHotTags } from '@/lib/actions/tag.actions';

const RightSideBar = async () => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getHotTags();

  return (
    <section
      className="background-light900_dark200 light-border
  custom-scrollbar sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]"
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              key={question._id}
              href={`/question/${question._id}`}
              className="flex-between cursor-pointer gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron_right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <TagCard
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.numberOfQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default RightSideBar;
