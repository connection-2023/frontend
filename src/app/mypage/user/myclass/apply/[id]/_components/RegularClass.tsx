import ClassInfoSummary from './ClassInfoSummary';
import { IApplyDetailResponse } from '@/types/class';

const timeTable = [
  {
    date: '23.10.20 (수)',
    time: '17:00-18:00',
  },
  {
    date: '23.10.20 (수)',
    time: '17:00-18:00',
  },
  {
    date: '23.10.20 (수)',
    time: '17:00-18:00',
  },
  {
    date: '23.10.20 (수)',
    time: '17:00-18:00',
  },
  {
    date: '23.10.20 (수)',
    time: '17:00-18:00',
  },
  {
    date: '23.10.20 (수)',
    time: '17:00-18:00',
  },
];

const RegularClass = (props: IApplyDetailResponse) => {
  const { request } = props;

  return (
    <div className="grid min-h-[20.5rem] grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 md:px-0">
      <div className="rounded-md bg-white p-4 shadow-float">
        <ClassInfoSummary {...props} type="정기" />

        <div className="mt-3.5 flex flex-col gap-2 border-t border-solid border-gray-700 pt-3.5 font-semibold">
          <p>요청사항</p>
          <textarea
            value={request ? request : '(요청사항 없음)'}
            disabled
            className={`min-h-[6.5rem] w-full resize-none rounded-md border border-solid bg-white p-2 font-normal ${
              request ? 'text-gray-100' : 'text-gray-500'
            }`}
          />
        </div>
      </div>

      <div className="flex rounded-md bg-white shadow-float md:min-h-[20.5rem]">
        <table className="h-fit w-full font-medium">
          <thead className="w-full border-b border-solid border-gray-700">
            <tr className="h-[2.3rem] w-full text-left font-semibold">
              <th className="pl-4">수업날짜</th>
              <th>시간</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {timeTable.map((table, index) => (
              <tr
                key={table.date + index}
                className="h-[2.2rem] w-full border-b border-solid border-gray-700"
              >
                <td className="pl-4">{table.date}</td>
                <td>{table.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegularClass;
