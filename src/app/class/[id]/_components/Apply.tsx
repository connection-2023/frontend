'use client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useClickAway } from 'react-use';
import SelectBox from './apply/SelectBox';
import ApplyButton from '@/components/Button/ApplyButton';
import { IClassSchedule, IDateTime } from '@/types/class';
import { formatDateTime, applyScheduleFilter } from '@/utils/parseUtils';

const ReservationItem = dynamic(() => import('./apply/ReservationItem'));

interface ApplyProps {
  id: string | number;
  schedule: IClassSchedule[];
  price: number;
  maxCapacity: number;
  duration: number;
}

const Apply = (props: ApplyProps) => {
  const { id, schedule, duration, price, maxCapacity } = props;
  const [selectedSchedule, setSelectedSchedule] = useState<IDateTime | null>();
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [isMobileScheduleOpened, setIsMobileScheduleOpened] = useState(false);
  const router = useRouter();
  const mobileScheduleListRef = useRef(null);
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

  useClickAway(mobileScheduleListRef, () => {
    setIsMobileScheduleOpened(false);
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

  const onSelect = (listValue: string) => {
    setSelectedLabel(listValue);
    addSelectedSchedule(listValue);
  };

  const removeReservationItem = () => {
    setSelectedSchedule(null);
    setSelectedLabel('날짜 및 시간 선택');
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

    const { lectureScheduleId, count } = selectedSchedule;

    router.push(
      `/class/${id}/apply?lectureScheduleId=${lectureScheduleId}&count=${count}`,
    );
  };

  const handleMobileApply = () => {
    if (!selectedSchedule || !isMobileScheduleOpened) {
      setIsMobileScheduleOpened(true);
    } else {
      handleApply();
    }
  };

  return (
    <>
      <section className="hidden min-w-[264px] max-w-[17rem] flex-col bg-white lg:flex">
        <div className="sticky top-24 mt-5 flex w-full flex-col whitespace-nowrap pr-2">
          <div className="mb-3 flex w-full flex-col gap-2">
            <SelectBox
              lists={formattedData.map((item) => item.dateTime)}
              onSelect={onSelect}
              selected={selectedLabel ? selectedLabel : '날짜 및 시간 선택'}
            />
          </div>

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

          {/* 가격 */}
          <div className="mb-4 mt-7 flex w-full justify-between font-semibold">
            <span className="text-lg">
              {selectedSchedule ? `총 ${selectedSchedule.count}회` : '1회'}
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
      <section className="fixed bottom-0 z-50 w-full lg:hidden">
        <div
          ref={mobileScheduleListRef}
          className="flex w-full flex-col items-center rounded-t-lg bg-white px-4 py-3.5 shadow-vertical"
        >
          {isMobileScheduleOpened && (
            <div className="my-3 flex w-full flex-col gap-2">
              <SelectBox
                lists={formattedData.map((item) => item.dateTime)}
                onSelect={onSelect}
                selected={selectedLabel ? selectedLabel : '날짜 및 시간 선택'}
              />
            </div>
          )}

          <div
            className={
              isMobileScheduleOpened
                ? 'mb-3 flex w-full flex-col gap-2'
                : 'hidden'
            }
          >
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

          <div className="flex w-full shrink-0 items-center justify-between gap-12 font-semibold">
            <p className="flex max-w-[6rem] gap-x-2.5 whitespace-nowrap">
              <span className="text-lg">
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
            <ApplyButton label="신청하기" onClick={handleMobileApply} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Apply;
