'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/Button/Button';
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

interface IApplyProps {
  coupon: number;
  price: {
    origin: string;
    discount: string;
  };
}
const Apply = ({ coupon, price }: IApplyProps) => {
  const [selectedDatetimes, setSelectedDatetimes] = useState<DateTime[]>([]);
  const [selectedDate, setSelectedDate] = useState('날짜 선택');
  const [selectedTime, setSelectedTime] = useState('시간 선택');

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

  return (
    <div className="sticky top-20 mt-5 flex w-full flex-col whitespace-nowrap border pr-2">
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
      <div className="flex flex-col gap-2">
        {selectedDate &&
          selectedTime &&
          selectedDatetimes.map((dateTime) => (
            <ReservationItem
              key={dateTime.date}
              date={dateTime.date}
              space={dateTime.space}
              count={dateTime.count}
              onRemove={() => removeReservationItem(dateTime.date)}
              countUpdate={(newCount) => updateCount(dateTime.date, newCount)}
            />
          ))}
      </div>
      {/* 사용 가능 쿠폰 -- 기능 추가 필요 */}
      <button className="mt-2 flex w-full justify-end text-sm text-sub-color1">
        사용 가능 쿠폰 ({coupon})
      </button>
      {/* 가격 */}
      <div className="mb-4 mt-7 flex w-full justify-between">
        <span className="text-xl font-bold">1회</span>
        <span>
          <s className="text-sub-color2 mr-[0.88rem] text-base font-bold">
            {price.origin}원
          </s>
          <span className="text-xl font-bold">{price.discount}원</span>
        </span>
      </div>
      {/* 신청하기 버튼 -- 기능 추가 필요 */}
      <Button primary={true} mode="default" size="large" onClick={() => {}}>
        신청하기
      </Button>
    </div>
  );
};

export default Apply;
