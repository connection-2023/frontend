import dynamic from 'next/dynamic';
import { useFormContext, Controller } from 'react-hook-form';
import {
  ANNOUNCEMENT,
  CLASS_OPERATION_PLAN,
  QUILL_DEFAULT_VALUE,
} from '@/constants/constants';
import { IprocessedDraft } from '@/types/class';

const CustomEditor = dynamic(
  () => import('@/components/TextArea/CustomEditor'),
  {
    ssr: false,
  },
);

const TextAreaSection = dynamic(
  () => import('@/components/TextArea/TextAreaSection'),
  {
    ssr: false,
  },
);

const ClassExplanation = ({
  classData,
}: {
  classData: IprocessedDraft | null;
}) => {
  const { control } = useFormContext();

  return (
    <section className="mt-9 flex flex-col gap-9">
      <Controller
        name="notification"
        control={control}
        defaultValue={classData?.notification}
        render={({ field }) => (
          <TextAreaSection
            title="중요 공지사항을 입력해주세요."
            placeholder={ANNOUNCEMENT}
            maxLength={200}
            dataName="notification"
            defaultValue={field.value}
          />
        )}
      />

      <Controller
        name="introduction"
        control={control}
        defaultValue={classData?.introduction}
        render={({ field }) => (
          <TextAreaSection
            title="어떤 클래스를 운영할 계획인가요?"
            errorMessage="운영 계획"
            placeholder={CLASS_OPERATION_PLAN}
            maxLength={500}
            height="h-40"
            dataName="introduction"
            defaultValue={field.value}
            isRequired={true}
          />
        )}
      />

      <CustomEditor
        title="커리큘럼"
        dataName="curriculum"
        defaultValue={classData?.curriculum || QUILL_DEFAULT_VALUE}
        height="652px"
        maxLength={3000}
        minLength={200}
      />
    </section>
  );
};

export default ClassExplanation;
