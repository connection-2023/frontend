import { useState } from 'react';
import { parse, isPast, isFuture } from 'date-fns';
import { dummyClasstableData } from '@/constants/dummy';

const TableCellStyle = 'border border-solid border-[#D9D9D9] py-2';

const ClassTable = () => {
  const [showPastClasses, setShowPastClasses] = useState(false);

  // 데이터 가공
  const processedTableData = dummyClasstableData.map((item) => {
    const dateObj = parseDateTime(item.dateTime);

    return {
      ...item,
      dateObj,
      isPastClass: isPast(dateObj),
    };
  });

  const filteredTableData = showPastClasses
    ? processedTableData
    : processedTableData.filter((item) => isFuture(item.dateObj));

  const firstFutureClassIndex = processedTableData.findIndex((item) =>
    isFuture(item.dateObj),
  );

  return (
    <>
      <label className="mb-[0.88rem] flex items-center gap-[0.38rem] text-sm font-semibold text-sub-color3">
        <input
          type="checkbox"
          checked={showPastClasses}
          onChange={() => setShowPastClasses(!showPastClasses)}
          className="h-[18px] w-[18px] accent-sub-color1"
        />
        지난 클래스도 함께 보기
      </label>
      <table className={`w-full border-collapse ${TableCellStyle} text-base`}>
        <tr className="font-bold text-sub-color3 ">
          <th className={`${TableCellStyle}`}>클래스</th>
          <th className={`${TableCellStyle}`}>날짜 및 시간</th>
          <th className={`${TableCellStyle}`}>신청한 수강생</th>
          <th className={`${TableCellStyle}`}>예약 마감일</th>
        </tr>
        {filteredTableData.map((item, idx) => (
          <TableList
            key={idx}
            classInfo={item.classInfo}
            dateTime={item.dateTime}
            apply={item.apply}
            duedate={item.duedate}
            isPastClass={item.isPastClass}
            isFirstClass={
              showPastClasses ? idx === firstFutureClassIndex : idx === 0
            }
          />
        ))}
      </table>
    </>
  );
};

export default ClassTable;

const parseDateTime = (dateTimeStr: string) => {
  const [datePart, timePart] = dateTimeStr.split(' ');
  const startTimeStr = timePart.split('-')[0];
  return parse(`${datePart} ${startTimeStr}`, 'yy.MM.dd HH:mm', new Date());
};

interface ITableList {
  classInfo: string;
  dateTime: string;
  duedate: string;
  apply: {
    total: number;
    current: number;
  };
  isPastClass: boolean;
  isFirstClass: boolean;
}

const TableList = ({
  classInfo,
  dateTime,
  duedate,
  apply,
  isPastClass,
  isFirstClass,
}: ITableList) => {
  const textColor = isFirstClass
    ? 'text-sub-color1'
    : isPastClass
    ? 'text-sub-color2'
    : 'text-black';
  const textBold = isPastClass ? '' : 'font-bold';

  return (
    <tr className={textColor}>
      <th className={`${TableCellStyle} ${textBold}`}>{classInfo}</th>
      <th className={`${TableCellStyle}`}>{dateTime}</th>
      <th className={`cursor-pointer ${TableCellStyle} underline`}>
        {apply.current}/{apply.total}명
      </th>
      <th className={`${TableCellStyle}`}>{duedate}</th>
    </tr>
  );
};
