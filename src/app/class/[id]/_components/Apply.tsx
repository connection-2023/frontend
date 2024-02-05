'use client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useClickAway } from 'react-use';
import { formatDateTime, applyScheduleFilter } from '@/utils/parseUtils';
import ReservationItem from './apply/ReservationItem';
import SelectBox from './apply/SelectBox';
import ApplyButton from '@/components/Button/ApplyButton';
import { IClassSchedule, IDateTime } from '@/types/class';

const ApplyList = dynamic(() => import('./apply/ApplyList'), { ssr: false });

interface ApplyProps {
  id: string | number;
  schedule: IClassSchedule[];
  price: number;
  maxCapacity: number;
  duration: number;
}

const Apply = ({ id, schedule, duration, price, maxCapacity }: ApplyProps) => {
  const [selectedSchedule, setSelectedSchedule] = useState<IDateTime | null>();
  const [selectedDateTime, setSelectedDateTime] = useState('날짜 및 시간 선택');
  const [isOpened, setIsOpened] = useState(false);
  const router = useRouter();
  const modalRef = useRef(null);
  const scheduleLists = applyScheduleFilter(schedule, maxCapacity);

  const formattedData = scheduleLists.map((list) => {
    const datetime = new Date(list.startDateTime);
    const space =
      list.numberOfParticipants === maxCapacity
        ? '마감'
        : `${list.numberOfParticipants}/${maxCapacity}명`;
    return {
      lectureScheduleId: list.id,
      dateTime: `${formatDateTime(datetime, duration)} (${space})`,
    };
  });

  const getFormattedDateTime = (selectedDateTime: string) =>
    selectedDateTime.slice(0, selectedDateTime.lastIndexOf('(')).trim();

  const addSelectedSchedule = (selectedDateTime: string) => {
    const findSchedule = schedule.find((item) => {
      const datetime = new Date(item.startDateTime);

      return (
        formatDateTime(datetime, duration) ===
        getFormattedDateTime(selectedDateTime)
      );
    });

    if (findSchedule) {
      if (findSchedule.id === selectedSchedule?.lectureScheduleId) return;

      const newValue = {
        lectureScheduleId: findSchedule.id,
        lectureId: findSchedule.lectureId,
        dateTime: selectedDateTime
          .slice(0, selectedDateTime.lastIndexOf('('))
          .trim(),
        space: {
          total: maxCapacity,
          current: findSchedule.numberOfParticipants,
        },
        count: 1,
      };

      setSelectedSchedule(newValue);
    }
  };

  useClickAway(modalRef, () => {
    setIsOpened(false);
  });

  const onSelect = (listValue: string) => {
    setSelectedDateTime(listValue);
    addSelectedSchedule(listValue);
  };

  const removeReservationItem = () => {
    setSelectedSchedule(null);
    setSelectedDateTime('날짜 및 시간 선택');
  };

  const updateCount = (newCount: number) => {
    if (selectedSchedule) {
      setSelectedSchedule({ ...selectedSchedule, count: newCount });
    }
  };

  const handleApply = () => {
    if (!isOpened && window.innerWidth < 768) {
      setIsOpened(true);
      return;
    }

    if (!selectedSchedule) {
      toast.error('한 개 이상의 클래스를 선택해주세요!');
      return;
    }

    const { lectureScheduleId, count } = selectedSchedule;

    router.push(
      `/class/${id}/apply?lectureScheduleId=${lectureScheduleId}&count=${count}`,
    );
  };

  return (
    <div
      ref={modalRef}
      className="flex min-h-[5.5rem] w-full flex-col items-center rounded-t-lg bg-white px-4 py-3.5 shadow-vertical md:min-h-0 md:items-stretch md:p-0 md:shadow-none"
    >
      <div className="sticky top-20 mt-5 hidden w-full flex-col whitespace-nowrap pr-2 md:flex">
        <div className="mb-3 flex w-full flex-col gap-2">
          <SelectBox
            lists={formattedData.map((item) => item.dateTime)}
            onSelect={onSelect}
            selected={selectedDateTime}
          />
        </div>
        <div className="hidden flex-col gap-2 md:flex">
          {selectedSchedule && (
            <ReservationItem
              key={selectedSchedule.lectureScheduleId}
              lectureScheduleId={selectedSchedule.lectureScheduleId}
              dateTime={selectedSchedule.dateTime}
              space={selectedSchedule.space}
              count={selectedSchedule.count}
              onRemove={removeReservationItem}
              countUpdate={updateCount}
            />
          )}
        </div>

        {/* 가격 */}
        <div className="mb-4 mt-7 hidden w-full justify-between md:flex">
          <span className="text-xl font-bold">
            {selectedSchedule ? `총 ${selectedSchedule.count}회` : '1회'}
          </span>
          <span className="text-xl font-bold">
            {(selectedSchedule
              ? price * selectedSchedule.count
              : price
            ).toLocaleString()}
            원
          </span>
        </div>

        <ApplyButton label="신청하기" onClick={handleApply} />
      </div>

      {isOpened && selectedSchedule && (
        <ApplyList
          lists={formattedData.map((item) => item.dateTime)}
          selectedDateTime={selectedDateTime}
          onSelect={onSelect}
          selectedSchedules={selectedSchedule}
          removeReservationItem={removeReservationItem}
          updateCount={updateCount}
        />
      )}

      <div className="flex w-full items-center justify-between gap-12 font-semibold md:hidden">
        <p className="flex max-w-[6rem] gap-x-[0.69rem] whitespace-nowrap">
          <span className="text-lg text-gray-500">
            {selectedSchedule ? `총 ${selectedSchedule.count}회` : '1회'}
          </span>
          <span className="text-xl">
            {(selectedSchedule
              ? price * selectedSchedule.count
              : price
            ).toLocaleString()}
            원
          </span>
        </p>
        <ApplyButton label="신청하기" onClick={handleApply} />
      </div>
    </div>
  );
};

export default Apply;
