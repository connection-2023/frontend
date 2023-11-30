'use client';
import { parseISO } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, ChangeEvent } from 'react';
import ApplyClassList from './ApplyClassList';
import { IClassSchedule } from '@/types/class';
import { IReservationInfo } from '@/types/payment';
import { useUserStore, usePaymentStore } from '@/store';
import { formatDateTime } from '@/utils/parseUtils';

interface ReservationInfoProps {
  schedule: IClassSchedule[];
  duration: number;
  maxCapacity: number;
}

const ReservationInfo = ({
  schedule,
  duration,
  maxCapacity,
}: ReservationInfoProps) => {
  const searchParams = useSearchParams();
  const selectedCounts = searchParams.getAll('count');
  const [selectedSchedule, setSelectedSchedule] = useState<IReservationInfo[]>(
    [],
  );
  const userInfo = useUserStore((state) => state.authUser);

  const [applicantInfo, setApplicantInfo] = useState({
    representative: '',
    phoneNumber: '',
    requests: '',
  });
  const [contactValidation, setContactValidation] = useState(false);
  const setApplyClass = usePaymentStore((state) => state.setApplyClass);
  const setApplicant = usePaymentStore((state) => state.setApplicant);

  useEffect(() => {
    if (!userInfo) return;

    if ('name' in userInfo && 'phoneNumber' in userInfo) {
      const name = userInfo.name || '';
      const phoneNumber = userInfo.phoneNumber || '';

      const newValue = {
        ...applicantInfo,
        representative: name,
        phoneNumber,
      };
      setApplicantInfo(newValue);
      setApplicant(newValue);
    }
  }, [userInfo]);

  useEffect(() => {
    const newValue = selectedCounts.map((item) => {
      const [id, count] = item.split('-').map(Number);
      return {
        lectureScheduleId: id,
        participants: count,
      };
    });

    setSelectedSchedule(newValue);
    setApplyClass(newValue);
  }, [selectedCounts.length]);

  const selectedSchedules = schedule.filter((lecture) =>
    selectedSchedule.some(
      (selectedLecture) => selectedLecture.lectureScheduleId === lecture.id,
    ),
  );

  const processedSchedules = selectedSchedules.map((lecture) => {
    const datetime = parseISO(lecture.startDateTime);
    const space = maxCapacity - lecture.numberOfParticipants;
    const selected = selectedSchedule.find(
      (item) => item.lectureScheduleId === lecture.id,
    );
    const participants = selected ? selected.participants : 0;

    return {
      lectureScheduleId: lecture.id,
      dateTime: formatDateTime(datetime, duration),
      remain: space,
      participants,
    };
  });

  const updateParticipants = (id: number, value: number) => {
    const newSchedule = selectedSchedule.map((item) =>
      item.lectureScheduleId === id ? { ...item, participants: value } : item,
    );

    setSelectedSchedule(newSchedule);
    setApplyClass(newSchedule);
  };

  const handleContactValidation = () => {
    setContactValidation(true);
  };

  const handleChange =
    (key: string) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = {
        ...applicantInfo,
        [key]: event.target.value,
      };
      setApplicantInfo(newValue);
      setApplicant(newValue);
    };

  return (
    <>
      <section className="mt-4 rounded-md px-4 py-[1.31rem] shadow-vertical">
        <h3 className="text-lg font-semibold">신청한 클래스</h3>
        <ul className="mt-4 divide-y divide-solid divide-sub-color1">
          {processedSchedules.map((schedule) => (
            <ApplyClassList
              key={schedule.lectureScheduleId}
              updateParticipants={updateParticipants}
              {...schedule}
            />
          ))}
        </ul>
      </section>

      <div className="mt-4 rounded-md px-4 py-[1.31rem] shadow-vertical">
        <section className="w-full whitespace-nowrap border-b border-solid border-gray-500 pb-5">
          <h3 className="text-lg font-semibold">예약자 정보</h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm font-semibold text-gray-100 ">
            <li className="flex items-center gap-4 py-[0.31rem]">
              <label className="flex items-center gap-4">
                <span>대표자 이름</span>
                <input
                  value={applicantInfo.representative}
                  onChange={handleChange('representative')}
                  className="h-7 w-full max-w-[20rem] rounded-md border border-solid border-gray-500 px-[0.62rem] py-[0.31rem] focus:outline-sub-color1"
                />
              </label>

              <div className="w-24 shrink-0" />
            </li>
            <li className="flex items-center gap-4 py-[0.31rem]">
              <label className="flex items-center gap-4">
                <span>대표 연락처</span>
                <input
                  value={applicantInfo.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                  className="h-7 w-full max-w-[20rem] rounded-md border border-solid border-gray-500 px-[0.62rem] py-[0.31rem] focus:outline-sub-color1"
                />
              </label>

              <button
                onClick={handleContactValidation}
                className="h-7 w-24 shrink-0 cursor-pointer whitespace-nowrap rounded-md border border-solid border-black bg-black font-medium text-white"
              >
                인증하기
              </button>
            </li>
            {contactValidation && (
              <li className="flex items-center gap-4 px-[0.62rem] py-[0.31rem]">
                <span className="w-[64.03px]" />
                <input className="h-7 rounded-md border border-solid border-gray-500 px-[0.62rem] py-[0.31rem] focus:outline-sub-color1" />
                <button className="h-7 w-24 cursor-pointer whitespace-nowrap rounded-md bg-gray-500 font-medium text-white">
                  인증하기
                </button>
              </li>
            )}
          </ul>
        </section>

        <section className="mt-4">
          <h3 className="mb-2 text-lg font-semibold">예약 시 요청사항</h3>
          {/* <TextAreaSection
            placeholder="강사에게 전달해야하는 요청사항을 적어주세요."
            maxLength={200}
            dataName="classRequest"
          /> */}
          <textarea
            value={applicantInfo.requests}
            onChange={handleChange('requests')}
            className="h-20 w-full resize-none rounded-md border border-gray-500 p-3 text-sm font-normal focus:outline-sub-color1"
            placeholder="강사에게 전달해야하는 요청사항을 적어주세요."
            maxLength={200}
          />
        </section>
      </div>
    </>
  );
};

export default ReservationInfo;
