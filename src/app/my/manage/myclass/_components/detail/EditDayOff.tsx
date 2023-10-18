import { format } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import { useState } from 'react';
import DayOffCalendar from '@/components/Calendar/DayOffCalendar';

const EditDayOff = () => {
  // 전체 클래스에 해당하는 날짜 -- 서버에서 받아오기
  const [selectableDate, setSelectableDate] = useState<Date[]>([new Date()]);
  // 선택한 휴무일 -- 서버에서 받아오기
  const [unselectedDates, setUnselectedDates] = useState<Date[]>([]);

  const handleUnselected = (unselectedDates: Date[]) => {
    setUnselectedDates(unselectedDates);
  };

  return (
    <div className="mb-[1.38rem] flex w-full">
      <div className="shadow-horizontal rounded-[0.63rem] px-3 py-2">
        <DayOffCalendar
          selectedDates={selectableDate}
          handleSelected={handleUnselected}
        />
      </div>

      <div className="ml-[3.75rem] flex w-full flex-col justify-between">
        <p className="mb-[0.87rem] text-sm font-semibold">선택한 휴무일</p>

        <ul className="flex h-40 w-fit flex-wrap gap-x-2 gap-y-3 overflow-x-auto text-sm font-medium text-sub-color3">
          {unselectedDates.map((date) => (
            <li
              key={date.toLocaleDateString()}
              className="h-fit rounded-[0.3125rem] border border-solid border-sub-color2 px-[0.69rem] py-[0.31rem]"
            >
              {format(date, 'yy.MM.dd (E)', { locale: ko })}
            </li>
          ))}
        </ul>

        <div className="flex w-full gap-2 whitespace-nowrap text-base font-semibold">
          <button className="flex h-8 w-full items-center justify-center rounded-[0.31rem] bg-sub-color2 text-white">
            변경 취소
          </button>
          <button className="flex h-8 w-full items-center justify-center rounded-[0.31rem] bg-sub-color1 text-white">
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDayOff;
