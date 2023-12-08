import InstructorCard from '@/components/InstructorCard/InstructorCard';
import { Instructors } from '@/types/types';

interface InterestedInstructorsProps {
  instructors: Instructors[];
}

const InterestedInstructors = ({ instructors }: InterestedInstructorsProps) => (
  <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
    {instructors.map((info, i) => (
      <div key={info.name + i} className="h-60 w-full">
        <InstructorCard {...info} />
      </div>
    ))}
  </section>
);

export default InterestedInstructors;
