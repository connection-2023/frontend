'use client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useClickAway } from 'react-use';
import { BasicCalendarSVG, TimeSVG } from '@/icons/svg';
import { getRegularScheduleTime } from '@/utils/scheduleDateUtils';
import ApplyButton from '@/components/Button/ApplyButton';
import { IRegularClassSchedule } from '@/types/class';

const ReservationItem = dynamic(() => import('./apply/ReservationItem'));

interface ApplyProps {
  id: string | number;
  schedule: IRegularClassSchedule[];
  price: number;
  maxCapacity: number;
  duration: number;
  range: string;
}

interface ISelectedSchedule extends IRegularClassSchedule {
  count: number;
}

const RegularApply = (props: ApplyProps) => {
  const { schedule, duration, price, maxCapacity, range } = props;
  const [selectedSchedule, setSelectedSchedule] = useState<ISelectedSchedule>();
  const [isMobileScheduleOpened, setIsMobileScheduleOpened] = useState(false);
  const router = useRouter();
  const mobileScheduleListRef = useRef(null);

  useClickAway(mobileScheduleListRef, () => {
    setIsMobileScheduleOpened(false);
  });

  const formatDateTime = useMemo(() => {
    if (selectedSchedule) {
      return {
        lectureScheduleId: selectedSchedule.id,
        dateTime: `${selectedSchedule.day.join(',')} ${
          selectedSchedule.dateTime
        }-${getRegularScheduleTime(selectedSchedule.dateTime, duration)}`,
        space: {
          total: maxCapacity,
          current: selectedSchedule.numberOfParticipants,
        },
        count: 1,
      };
    }
  }, [selectedSchedule?.id, selectedSchedule?.count]);

  const onSelect = (newValue: IRegularClassSchedule) => {
    if (newValue) {
      setSelectedSchedule({ ...newValue, count: 1 });
    }
  };

  const removeReservationItem = () => {
    setSelectedSchedule(undefined);
  };

  const updateCount = (newCount: number) => {
    if (selectedSchedule) {
      setSelectedSchedule({ ...selectedSchedule, count: newCount });
    }
  };

  const handleApply = () => {
    if (!selectedSchedule) {
      toast.error('한 개 이상의 클래스를 선택해주세요!');
      return;
    }

    const { id, count } = selectedSchedule;

    router.push(`/class/${id}/apply?lectureScheduleId=${id}&count=${count}`);
  };

  const handleMobileApply = () => {
    if (!isMobileScheduleOpened) {
      setIsMobileScheduleOpened(true);
    } else {
      handleApply();
    }
  };

  return (
    <>
      <section className="hidden min-w-[264px] max-w-[17rem] flex-col bg-white lg:flex">
        <div className="sticky top-24 mt-5 flex w-full flex-col whitespace-nowrap pr-2">
          <ul className="mb-3 max-h-[275px] space-y-2.5 overflow-y-auto border border-solid border-gray-900 px-2 py-1.5">
            {schedule.map((item) => (
              <ApplyList
                key={item.id}
                {...item}
                maxCapacity={maxCapacity}
                duration={duration}
                selectedSchedule={selectedSchedule}
                onSelect={() => onSelect(item)}
              />
            ))}
          </ul>

          {formatDateTime && selectedSchedule && (
            <ReservationItem
              key={formatDateTime.lectureScheduleId}
              lectureScheduleId={formatDateTime.lectureScheduleId}
              dateTime={formatDateTime.dateTime}
              space={formatDateTime.space}
              count={selectedSchedule.count}
              onRemove={removeReservationItem}
              countUpdate={updateCount}
              borderColor="border-gray-500"
            />
          )}

          {/* 가격 */}
          <div className="mb-4 mt-7 flex w-full justify-between font-semibold">
            <span className="text-lg">
              {selectedSchedule &&
                `총 ${selectedSchedule.regularLectureSchedule.length}회`}
            </span>
            <span className="text-xl">
              {(selectedSchedule
                ? price * selectedSchedule.count
                : price
              ).toLocaleString()}
              원
            </span>
          </div>

          <ApplyButton label="신청하기" onClick={handleApply} />
        </div>
      </section>

      {/* 모바일 화면 */}
      <section className="fixed bottom-0 left-0 z-50 w-full lg:hidden">
        <div
          ref={mobileScheduleListRef}
          className="flex w-full flex-col items-center rounded-t-lg bg-white px-4 py-3.5 shadow-vertical"
        >
          {isMobileScheduleOpened && (
            <div className="my-3 flex w-full flex-col gap-2">
              <div className="flex gap-x-3">
                <span className="flex items-center font-bold">
                  <BasicCalendarSVG
                    width="21"
                    height="21"
                    className="mr-2 fill-sub-color1"
                  />
                  {range}
                </span>

                <span className="flex items-center">
                  <TimeSVG className="mr-2 fill-sub-color1" /> {duration}분 수업
                </span>
              </div>
              <ul className="max-h-[275px] space-y-2.5 overflow-y-auto border border-solid border-gray-900 px-2 py-1.5">
                {schedule.map((item) => (
                  <ApplyList
                    key={item.id}
                    {...item}
                    maxCapacity={maxCapacity}
                    duration={duration}
                    selectedSchedule={selectedSchedule}
                    onSelect={() => onSelect(item)}
                  />
                ))}
              </ul>
            </div>
          )}

          <div
            className={
              isMobileScheduleOpened
                ? 'mb-3 flex w-full flex-col gap-2'
                : 'hidden'
            }
          >
            {formatDateTime && selectedSchedule && (
              <ReservationItem
                key={formatDateTime.lectureScheduleId}
                lectureScheduleId={formatDateTime.lectureScheduleId}
                dateTime={formatDateTime.dateTime}
                space={formatDateTime.space}
                count={selectedSchedule.count}
                onRemove={removeReservationItem}
                countUpdate={updateCount}
                borderColor="border-gray-500"
              />
            )}
          </div>

          <div className="flex w-full shrink-0 items-center justify-between gap-12 font-semibold">
            <p className="flex max-w-[6rem] flex-wrap gap-x-2.5 whitespace-nowrap">
              <span className="text-lg">
                {selectedSchedule &&
                  `총 ${selectedSchedule.regularLectureSchedule.length}회`}
              </span>
              <span className="text-xl">
                {(selectedSchedule
                  ? price * selectedSchedule.count
                  : price
                ).toLocaleString()}
                원
              </span>
            </p>
            <ApplyButton label="신청하기" onClick={handleMobileApply} />
          </div>
        </div>
      </section>
    </>
  );
};

export default RegularApply;

interface ApplyListProps extends IRegularClassSchedule {
  duration: number;
  maxCapacity: number;
  selectedSchedule?: ISelectedSchedule;
  onSelect: (newValue: IRegularClassSchedule) => void;
}

const ApplyList = (props: ApplyListProps) => {
  const {
    id,
    day,
    dateTime,
    duration,
    maxCapacity,
    numberOfParticipants,
    regularLectureSchedule,
    selectedSchedule,
    onSelect,
  } = props;
  const time = getRegularScheduleTime(dateTime, duration);
  const isChecked = selectedSchedule?.id === id;

  return (
    <li
      className={`h-[90px] cursor-pointer rounded-md ${
        isChecked && 'border border-2 border-solid border-main-color'
      } px-4 py-3 text-sm text-gray-100 shadow-float`}
      onClick={() =>
        onSelect({
          id,
          day,
          dateTime,
          numberOfParticipants,
          regularLectureSchedule,
        })
      }
    >
      <p className="mb-3 flex items-center font-bold">
        <BasicCalendarSVG
          width="21"
          height="21"
          className="mr-2 fill-gray-100"
        />
        {`${day.join(',')} ${dateTime}-${time}`}
      </p>

      <div className="flex items-center gap-x-2">
        <input
          type="radio"
          checked={isChecked}
          className="w-4 accent-main-color"
          readOnly
        />
        <span className="text-base font-bold">
          {regularLectureSchedule.length}회
        </span>
        <span>{`(${numberOfParticipants}/${maxCapacity}명)`}</span>
      </div>
    </li>
  );
};
