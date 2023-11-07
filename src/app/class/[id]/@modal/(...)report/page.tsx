'use client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import UniqueButton from '@/components/Button/UniqueButton';
import ReportCheckBox from '@/components/CheckBox/ReportCheckBox';
import RouterModal from '@/components/Modal/RouterModal';
import { ReportFormData, reportTypes } from '../../../../../types/form.d';

const ReportModalPage = () => {
  const { register, handleSubmit } = useForm<ReportFormData>();

  const onSubmit = (data: ReportFormData) => {
    const checkedItems: string[] = [];

    for (const [key, value] of Object.entries(data)) {
      if (value === true) {
        checkedItems.push(key);
      }
    }

    if (checkedItems.length === 0) {
      toast.error('신고 유형을 한개 이상 입력해주세요!');
      return;
    }

    const newData = {
      checkedItems,
      reportDetail: data.reportDetail,
    };

    // --- api 연결하기 ---
    console.log(newData);
  };

  return (
    <RouterModal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[407px] flex-col"
      >
        <h1 className="border-b border-solid border-gray-700 py-2 text-center text-lg font-semibold">
          신고하기
        </h1>
        <ul className="mb-7 mt-6 grid grid-cols-2 gap-x-10 gap-y-3 px-6 text-base">
          {reportTypes.map((reason) => (
            <ReportCheckBox label={reason} register={register} />
          ))}
        </ul>

        <section className="px-6">
          <h2 className="mb-1.5 text-base font-semibold">신고사유</h2>
          <textarea
            {...register('reportDetail')}
            placeholder="비방, 욕설, 잘못된 정보 등 신고 사유를 구체적으로 작성해주세요."
            className="text-normal h-[7.75rem] w-full resize-none whitespace-pre-wrap break-keep rounded-md border border-solid border-gray-500 px-3.5 py-2.5 text-sm font-normal text-gray-100 focus:outline-sub-color1"
          />
        </section>
        <div className="my-4 mr-6 w-20 self-end">
          <UniqueButton size="small" color="secondary" type="submit">
            제출하기
          </UniqueButton>
        </div>
      </form>
    </RouterModal>
  );
};

export default ReportModalPage;
