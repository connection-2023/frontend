import CustomEditor from '@/components/TextArea/CustomEditor';
import TextAreaSection from '@/components/TextArea/TextAreaSection';
import {
  ANNOUNCEMENT,
  CLASS_OPERATION_PLAN,
  QUILL_DEFAULT_VALUE,
} from '@/constants/constants';

const ClassExplanation = () => {
  return (
    <>
      <TextAreaSection
        title="중요 공지사항을 입력해주세요."
        placeholder={ANNOUNCEMENT}
        maxLength={200}
      />

      <TextAreaSection
        title="어떤 클래스를 운영할 계획인가요?"
        placeholder={CLASS_OPERATION_PLAN}
        maxLength={500}
        height="h-40"
      />

      <CustomEditor
        title="커리큘럼"
        defaultValue={QUILL_DEFAULT_VALUE}
        height="652px"
        maxLength={3000}
      />
    </>
  );
};

export default ClassExplanation;
