import ClassInfoSummary from './ClassInfoSummary';
import { IApplyDetailResponse } from '@/types/class';

const OneDayClass = (props: IApplyDetailResponse) => {
  const { request } = props;

  return (
    <div className="grid h-52 grid-cols-2 rounded-md bg-white p-4 shadow-float">
      <ClassInfoSummary {...props} type="원데이" />

      <div className="flex flex-col gap-2 border-l border-solid border-gray-700 pl-4 font-semibold">
        <p>요청사항</p>
        <textarea
          value={request ? request : '(요청사항 없음)'}
          disabled
          className="w-full resize-none overflow-y-auto rounded-md bg-white py-2 font-normal text-gray-500"
        />
      </div>
    </div>
  );
};

export default OneDayClass;
