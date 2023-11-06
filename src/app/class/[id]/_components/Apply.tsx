'use client';
import { format, parseISO, addMinutes } from 'date-fns';
import { ko } from 'date-fns/locale';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useClickAway } from 'react-use';
import ReservationItem from './apply/ReservationItem';
import SelectBox from './apply/SelectBox';
import ApplyButton from '@/components/Button/ApplyButton';
import { IClassSchedule, IDateTime } from '@/types/class';

interface ApplyProps {
  schedule: IClassSchedule[];
  price: number;
  maxCapacity: number;
  duration: number;
}

const Apply = ({ schedule, duration, price, maxCapacity }: ApplyProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const pathnameParts = pathname.split('/class/');
  const id = pathnameParts[1];
  const [isOpened, setIsOpened] = useState(false);
  const modalRef = useRef(null);
  const [selectedSchedules, setSelectedSchedules] = useState<IDateTime[]>([]);
  const [selectedDateTime, setSelectedDateTime] = useState('날짜 및 시간 선택');
  const totalCount = selectedSchedules.reduce(
    (sum, schedule) => sum + schedule.count,
    0,
  );
  const formattedData = schedule.map((list) => {
    const datetime = parseISO(list.startDateTime);
    return {
      lectureScheduleId: list.id,
      dateTime: `${formatDateTime(datetime, duration)} (${
        list.numberOfParticipants
      }/${maxCapacity})명`,
    };
  });

  const getFormattedDateTime = (selectedDateTime: string) =>
    selectedDateTime.slice(0, selectedDateTime.lastIndexOf('(')).trim();

  const addSelectedSchedule = (selectedDateTime: string) => {
    const selectedSchedule = schedule.find((item) => {
      const datetime = parseISO(item.startDateTime);
      return (
        formatDateTime(datetime, duration) ===
        getFormattedDateTime(selectedDateTime)
      );
    });

    if (selectedSchedule) {
      const newValue = {
        lectureScheduleId: selectedSchedule.id,
        lectureId: selectedSchedule.lectureId,
        dateTime: getFormattedDateTime(selectedDateTime),
        space: {
          total: maxCapacity,
          current: selectedSchedule.numberOfParticipants,
        },
        count: 1,
      };

      const isDuplicate = selectedSchedules.some((value) => {
        return value.dateTime === newValue.dateTime;
      });

      if (isDuplicate) return;
      setSelectedSchedules([...selectedSchedules, newValue]);
    }
  };

  useClickAway(modalRef, () => {
    setIsOpened(false);
  });

  useEffect(() => {
    if (selectedDateTime !== '날짜 및 시간 선택') {
      addSelectedSchedule(selectedDateTime);
      setSelectedDateTime('날짜 및 시간 선택');
    }
  }, [selectedDateTime]);

  const onSelect = (listValue: string) => {
    setSelectedDateTime(listValue);
  };

  const removeReservationItem = (id: number) => {
    setSelectedSchedules((prevDatetimes) =>
      prevDatetimes.filter((datetime) => datetime.lectureScheduleId !== id),
    );
  };

  const updateCount = (id: number, newCount: number) => {
    setSelectedSchedules((prevDatetimes) =>
      prevDatetimes.map((datetime) =>
        datetime.lectureScheduleId === id
          ? { ...datetime, count: newCount }
          : datetime,
      ),
    );
  };

  const handleApply = () => {
    if (!isOpened) {
      setIsOpened(true);
      return;
    }

    if (selectedSchedules.length === 0) {
      toast.error('한 개 이상의 클래스를 선택해주세요!');
      return;
    }

    const queryString = selectedSchedules
      .map((item) => `count=${item.lectureScheduleId}-${item.count}`)
      .join('&');

    router.push(`/class/apply/${id}?${queryString}`);
  };

  return (
    <div
      ref={modalRef}
      className="flex min-h-[5.5rem] w-full flex-col items-center rounded-t-lg bg-white px-4 py-3.5 shadow-vertical md:min-h-0 md:items-stretch md:p-0 md:shadow-none"
    >
      <div className="sticky top-20 mt-5 hidden w-full flex-col whitespace-nowrap border pr-2 md:flex">
        <div className="mb-3 flex w-full flex-col gap-2">
          <SelectBox
            lists={formattedData.map((item) => item.dateTime)}
            onSelect={onSelect}
            selected={selectedDateTime}
          />
        </div>
        <div className="hidden flex-col gap-2 md:flex">
          {selectedSchedules.map((dateTime) => (
            <ReservationItem
              key={dateTime.lectureScheduleId}
              lectureScheduleId={dateTime.lectureScheduleId}
              dateTime={dateTime.dateTime}
              space={dateTime.space}
              count={dateTime.count}
              onRemove={() => removeReservationItem(dateTime.lectureScheduleId)}
              countUpdate={updateCount}
            />
          ))}
        </div>

        {/* 가격 */}
        <div className="mb-4 mt-7 hidden w-full justify-between md:flex">
          <span className="text-xl font-bold">
            {totalCount > 1 ? `총 ${totalCount}회` : '1회'}
          </span>
          <span className="text-xl font-bold">
            {(totalCount > 1 ? price * totalCount : price).toLocaleString()}원
          </span>
        </div>

        <ApplyButton label="신청하기" onClick={handleApply} />
      </div>

      {isOpened && (
        <>
          <div className="mb-3 flex w-full flex-col gap-2 md:hidden">
            <SelectBox
              lists={formattedData.map((item) => item.dateTime)}
              onSelect={onSelect}
              selected={selectedDateTime}
            />
          </div>
          <div className="mb-11 flex w-full flex-col gap-2 md:hidden">
            {selectedSchedules.map((dateTime) => (
              <ReservationItem
                key={dateTime.lectureScheduleId}
                lectureScheduleId={dateTime.lectureScheduleId}
                dateTime={dateTime.dateTime}
                space={dateTime.space}
                count={dateTime.count}
                onRemove={() =>
                  removeReservationItem(dateTime.lectureScheduleId)
                }
                countUpdate={updateCount}
              />
            ))}
          </div>
        </>
      )}

      <div className="flex w-full items-center justify-between gap-12 font-semibold md:hidden">
        <p className="flex max-w-[6rem] gap-x-[0.69rem] whitespace-nowrap">
          <span className="text-lg text-gray-500">
            {totalCount > 1 ? `총 ${totalCount}회` : '1회'}
          </span>
          <span className="text-xl">
            {' '}
            {(totalCount > 1 ? price * totalCount : price).toLocaleString()}원
          </span>
        </p>
        <button
          onClick={handleApply}
          className="flex h-10 w-full items-center justify-center rounded-md bg-main-color text-white"
        >
          신청하기
        </button>
      </div>
    </div>
  );
};

export default Apply;

const formatDateTime = (datetime: Date, duration: number) => {
  const endDatetime = addMinutes(datetime, duration);
  const formattedStartDatetime = format(datetime, 'M월 d일 (eee) HH:mm', {
    locale: ko,
  });
  const formattedEndDatetime = format(endDatetime, 'HH:mm');
  return `${formattedStartDatetime}-${formattedEndDatetime}`;
};
