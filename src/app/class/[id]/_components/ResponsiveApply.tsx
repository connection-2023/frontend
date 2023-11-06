'use client';
import { useState, useEffect, useRef } from 'react';
import { useClickAway } from 'react-use';
import ReservationItem from './apply/ReservationItem';
import SelectBox from './apply/SelectBox';
import { DateTime } from '@/types/class';

/* Mock data */
type DateTimeData = {
  [date: string]: {
    time: string[];
  };
};

const dateTimeData: DateTimeData = {
  '09월 09일 (토)': {
    time: ['11:00-12:00', '14:00-15:00'],
  },
  '09월 11일 (월)': {
    time: ['10:00-11:00', '13:00-14:00'],
  },
};

const ResponsiveApply = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedDatetimes, setSelectedDatetimes] = useState<DateTime[]>([]);
  const [selectedDate, setSelectedDate] = useState('날짜 선택');
  const [selectedTime, setSelectedTime] = useState('시간 선택');
  const modalRef = useRef(null);

  useClickAway(modalRef, () => {
    setIsOpened(false);
  });

  useEffect(() => {
    if (selectedDate !== '날짜 선택' && selectedTime !== '시간 선택') {
      const newValue = {
        date: `${selectedDate} ${selectedTime}`,
        space: { total: 8, current: 3 },
        count: 1,
      };

      const isDuplicate = selectedDatetimes.some((value) => {
        return value.date === newValue.date;
      });

      if (!isDuplicate) {
        setSelectedDatetimes([...selectedDatetimes, newValue]);
      }
      setSelectedDate('날짜 선택');
      setSelectedTime('시간 선택');
    }
  }, [selectedDate, selectedTime]);

  const onSelect = (type: string, listValue: string) => {
    if (type === 'date') {
      setSelectedDate(listValue);
    } else {
      setSelectedTime(listValue);
    }
  };

  const removeReservationItem = (date: string) => {
    setSelectedDatetimes((prevDatetimes) =>
      prevDatetimes.filter((datetime) => datetime.date !== date),
    );
  };

  const updateCount = (date: string, newCount: number) => {
    setSelectedDatetimes((prevDatetimes) =>
      prevDatetimes.map((datetime) =>
        datetime.date === date ? { ...datetime, count: newCount } : datetime,
      ),
    );
  };

  const handleApply = () => {
    if (!isOpened) setIsOpened(true);
  };

  return (
    <div
      ref={modalRef}
      className="flex min-h-[5.5rem] w-full flex-col items-center rounded-t-[0.63rem] bg-white px-4 py-3.5 shadow-[0px_-1px_4px_0px_rgba(0,0,0,0.25)]"
    >
      {isOpened && (
        <>
          <div className="mb-3 flex w-full flex-col gap-2">
            <SelectBox
              type="date"
              lists={Object.keys(dateTimeData)}
              onSelect={onSelect}
              selected={selectedDate}
            />
            {selectedDate in dateTimeData && (
              <SelectBox
                type="time"
                lists={dateTimeData[selectedDate].time}
                onSelect={onSelect}
                selected={selectedTime}
              />
            )}
          </div>
          <div className="mb-11 flex w-full flex-col gap-2">
            {selectedDate &&
              selectedTime &&
              selectedDatetimes.map((dateTime) => (
                <ReservationItem
                  key={dateTime.date}
                  date={dateTime.date}
                  space={dateTime.space}
                  count={dateTime.count}
                  onRemove={() => removeReservationItem(dateTime.date)}
                  countUpdate={(newCount) =>
                    updateCount(dateTime.date, newCount)
                  }
                />
              ))}
          </div>
        </>
      )}

      <div className="flex w-full items-center justify-between gap-12 font-semibold">
        <p className="flex max-w-[6rem] gap-x-[0.69rem] whitespace-nowrap">
          <span className="text-lg text-sub-color2">1회</span>
          <span className="text-xl"> {'40,000'}원</span>
        </p>
        <button
          onClick={handleApply}
          className="flex h-10 w-full items-center justify-center rounded-[0.31rem] bg-main-color text-white"
        >
          신청하기
        </button>
      </div>
    </div>
  );
};

export default ResponsiveApply;
