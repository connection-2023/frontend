'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { useUserStore, usePaymentStore } from '@/store';

const ReservationInfo = ({ isClass }: { isClass: boolean }) => {
  const [applicantInfo, setApplicantInfo] = useState({
    representative: '',
    phoneNumber: '',
    requests: '',
  });
  const [contactValidation, setContactValidation] = useState(false);
  const userInfo = useUserStore((state) => state.authUser);
  const setApplicant = usePaymentStore((state) => state.setApplicant);

  useEffect(() => {
    if (!userInfo) return;

    const name = userInfo.name;
    const phoneNumber = userInfo.phoneNumber;

    const newValue = {
      ...applicantInfo,
      representative: name,
      phoneNumber,
    };

    setApplicantInfo(newValue);
    setApplicant(newValue);
  }, [userInfo]);

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
    <div className="mt-4 rounded-md px-4 py-5 shadow-vertical">
      <section className="w-full whitespace-nowrap">
        <h3 className="text-lg font-semibold">예약자 정보</h3>
        <ul className="mt-4 flex flex-col gap-2 text-sm font-semibold text-gray-100 ">
          <li className="flex items-center gap-4 py-1.5">
            <label className="flex items-center gap-4">
              <span>대표자 이름</span>
              <input
                value={applicantInfo.representative || ''}
                onChange={handleChange('representative')}
                className="h-7 w-full max-w-[20rem] rounded-md border border-solid border-gray-500 px-2.5 py-1.5 focus:outline-sub-color1"
              />
            </label>

            <div className="w-24 shrink-0" />
          </li>
          <li className="flex items-center gap-4 py-1.5">
            <label className="flex items-center gap-4">
              <span>대표 연락처</span>
              <input
                type="number"
                value={applicantInfo.phoneNumber || ''}
                onChange={handleChange('phoneNumber')}
                className="h-7 w-full max-w-[20rem] rounded-md border border-solid border-gray-500 px-2.5 py-1.5 focus:outline-sub-color1"
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
            <li className="flex items-center gap-4 py-1.5">
              <span className="w-[64.03px]" />
              <input className="h-7 rounded-md border border-solid border-gray-500 px-2.5 py-1.5 focus:outline-sub-color1" />
              <button className="h-7 w-24 cursor-pointer whitespace-nowrap rounded-md bg-gray-500 font-medium text-white">
                인증하기
              </button>
            </li>
          )}
        </ul>
      </section>

      {isClass && (
        <section className="mt-4 border-t border-solid border-gray-500 pt-5">
          <h3 className="mb-2 text-lg font-semibold">예약 시 요청사항</h3>
          {/* 
            공통 컴포넌트로 대체 예정
           <TextAreaSection
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
      )}
    </div>
  );
};

export default ReservationInfo;
