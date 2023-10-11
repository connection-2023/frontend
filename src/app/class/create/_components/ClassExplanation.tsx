import { useRecoilValue } from 'recoil';
import { classCreateState } from '@/recoil/Create/atoms';
import CustomEditor from '@/components/TextArea/CustomEditor';
import TextAreaSection from '@/components/TextArea/TextAreaSection';
import { ANNOUNCEMENT, CLASS_OPERATION_PLAN } from '@/constants/constants';

const ClassExplanation = () => {
  const classData = useRecoilValue(classCreateState);

  return (
    <section className="mt-9 flex flex-col gap-9">
      <TextAreaSection
        title="중요 공지사항을 입력해주세요."
        placeholder={ANNOUNCEMENT}
        maxLength={200}
        dataName="공지사항"
      />

      <TextAreaSection
        title="어떤 클래스를 운영할 계획인가요?"
        placeholder={CLASS_OPERATION_PLAN}
        maxLength={500}
        height="h-40"
        dataName="운영계획"
        isRequired={true}
      />

      <CustomEditor
        title="커리큘럼"
        defaultValue={classData['커리큘럼']}
        height="652px"
        maxLength={3000}
        minLength={200}
      />
    </section>
  );
};

export default ClassExplanation;
