'use client';
import { UseFormRegister, useForm, FieldValues } from 'react-hook-form';
import UniqueButton from '@/components/Button/UniqueButton';
import { toast } from 'react-toastify';

const reportTypes: Array<keyof FormData> = [
  '허위 정보 기재',
  '저작권 불법 도용',
  '부적절한 사진 게시',
  '부적절한 내용',
  '기타',
];

interface FormData {
  '허위 정보 기재': boolean;
  '저작권 불법 도용': boolean;
  '부적절한 사진 게시': boolean;
  '부적절한 내용': boolean;
  기타: boolean;
  reportDetail?: string;
}

const ReportPage = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-10 flex max-w-[25.5rem] flex-col rounded-md shadow-float"
    >
      <h1 className="w-full border-b border-solid border-gray-700 py-4 text-center text-lg font-semibold">
        신고하기
      </h1>
      <ul className="mb-7 mt-6 grid w-full grid-cols-2 gap-y-3 px-6">
        {reportTypes.map((reason) => ReportCheckbox(reason, register))}
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
  );
};

export default ReportPage;

const ReportCheckbox = (
  label: string,
  register: UseFormRegister<FieldValues>,
) => {
  return (
    <li key={label} className="flex items-center gap-1.5">
      <input
        {...register(label)}
        type="checkbox"
        id={label}
        className="h-[1.125rem] w-[1.125rem] checked:accent-sub-color1"
      />
      <label htmlFor={label} className="text-base font-semibold text-gray-100">
        {label}
      </label>
    </li>
  );
};
