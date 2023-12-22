import InstructorCard from '@/components/InstructorCard/InstructorCard';
import { Instructors } from '@/types/types';

interface InterestedInstructorsProps {
  instructors: Instructors[];
}

const InterestedInstructors = ({ instructors }: InterestedInstructorsProps) => (
  <section className="flex flex-wrap gap-4">
    {instructors.map((info, i) => (
      <InstructorCard {...info} key={info.name + i} />
    ))}
  </section>
);

export default InterestedInstructors;
