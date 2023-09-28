import TextAreaSection from './ClassExplanation/TextAreaSection';
import CurriculumSection from './ClassExplanation/CurriculumSection';
import { ANNOUNCEMENT, CLASS_OPERATION_PLAN } from '@/constants/constants';

const ClassExplanation = () => {
  return (
    <>
      <TextAreaSection
        title="중요 공지사항을 입력해주세요."
        placeholder={ANNOUNCEMENT}
        valueKey="announcement"
        maxLength={200}
      />

      <TextAreaSection
        title="어떤 클래스를 운영할 계획인가요?"
        placeholder={CLASS_OPERATION_PLAN}
        valueKey="explanation"
        maxLength={500}
      />

      <CurriculumSection />
    </>
  );
};

export default ClassExplanation;
