import InstructorCard from '@/components/InstructorCard/InstructorCard';
import { Instructors } from '@/types/types';

interface InterestedInstructorsProps {
  instructors: Instructors[];
  largeImg: boolean;
  likesListHandler: (id: string | number) => void;
}

const InterestedInstructors = ({
  instructors,
  largeImg,
  likesListHandler,
}: InterestedInstructorsProps) => (
  <section
    className={`grid ${
      largeImg ? 'grid-cols-1' : 'grid-cols-2'
    } gap-4 sm:grid-cols-2 md:grid-cols-3`}
  >
    {instructors.map((info, i) => (
      <div
        key={info.name + i}
        className={`${
          largeImg ? 'h-64' : 'h-[12.5rem]'
        } w-full sm:h-[15.5rem] md:h-52 lg:h-60 xl:h-[15.2rem]`}
      >
        <InstructorCard
          {...info}
          largeImg={largeImg}
          isLiked={true}
          likeEvent={likesListHandler}
        />
      </div>
    ))}
  </section>
);

export default InterestedInstructors;
