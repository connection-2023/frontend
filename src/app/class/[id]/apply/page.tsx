'use client';
import { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
import { CouponSVG, MusicalNoteSVG, NoticeSVG } from '@/icons/svg';
import { getCouponList } from '@/lib/apis/serverApis/couponApis';
import { formatDateTime } from '@/utils/parseUtils';
import ApplySidebar from './_components/ApplySidebar';
import CouponContainer from './_components/Coupon/CouponContainer';
import PaymentMethod from './_components/PaymentMethod';
import ReservationInfo from './_components/ReservationInfo';
import AccountInfo from './_components/AccountInfo';
import { getOriginalClassInfo } from '@/lib/apis/classApis';
import { IClassEditData } from '@/types/class';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ClassApplyPage = ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] };
}) => {
  const [classData, setClassData] = useState<IClassEditData>();
  const [paymentOption, setPaymentOption] = useState<number>();
  const { register, handleSubmit, getValues } = useForm();

  const handlePaymentOption = (index: number) => {
    setPaymentOption(index);
  };

  const reqData = {
    take: 10000, //추후 null로 변경
    couponStatusOption: 'AVAILABLE' as 'AVAILABLE',
    filterOption: 'LATEST' as 'LATEST',
  };
  const { count } = searchParams;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOriginalClassInfo(id);
      console.log(data);
      setClassData(data);
    };
    fetchData();
  }, [id]);

  if (!classData) {
    return <></>;
  }

  const { title, duration, maxCapacity, reservationComment, price } =
    classData.lecture;
  const { schedule } = classData;

  // 쿼리 파싱
  const parseCount = (count: string | string[]) => {
    const countArray = Array.isArray(count) ? count : [count];
    return countArray.map((item) => {
      const [lectureScheduleId, participants] = item.split('-').map(Number);
      return {
        lectureScheduleId,
        participants,
      };
    });
  };

  const initialApplyData = parseCount(count);
  const initialScheduleIds = initialApplyData.map(
    (selectedLecture) => selectedLecture.lectureScheduleId,
  );
  const selectedSchedule = schedule.filter((lecture) =>
    initialScheduleIds.includes(lecture.id),
  );
  const processedSchedules = selectedSchedule.map((lecture) => {
    const datetime = parseISO(lecture.startDateTime);
    const remain = maxCapacity - lecture.numberOfParticipants;
    const matchedSchedule = initialApplyData.find(
      (item) => item.lectureScheduleId === lecture.id,
    );
    const participants = matchedSchedule ? matchedSchedule.participants : 0;

    return {
      lectureScheduleId: lecture.id,
      dateTime: formatDateTime(datetime, duration),
      remain,
      participants,
    };
  });

  const onSubmit = async (data: any) => {
    const { depositor, accountHolder, bank, accountNumber } = data;
    let errorMessage = '';

    if (depositor.trim() === '') {
      errorMessage = '입금자명을 입력해주세요!';
    } else if (accountHolder.trim() === '') {
      errorMessage = '예금주를 입력해주세요!';
    } else if (bank.trim() === '') {
      errorMessage = '은행을 선택해주세요!';
    } else if (accountNumber.trim() === '') {
      errorMessage = '계좌번호를 입력해주세요!';
    }

    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      console.log(data);
    }
  };

  const handleAccountInfoSubmit = () => {
    const data = getValues();
    onSubmit(data);
  };

  return (
    <div className="border-box mx-auto mb-20 flex grid w-full grid-cols-1 gap-x-12 px-4 md:px-[4.5rem] lg:grid-cols-[2fr_1fr] xl:grid-cols-[1fr_2fr_1fr]">
      {/* 임시 빈 공간 */}
      <div className="hidden xl:block" />

      <section className="w-full lg:max-w-[40rem]">
        <h2 className="flex w-full items-center gap-2 whitespace-pre-line break-keep border-b-[3px] border-solid border-black py-[0.81rem] text-2xl font-bold">
          <MusicalNoteSVG
            width="21"
            height="21"
            className="mr-1 shrink-0 cursor-pointer stroke-black"
          />
          {title}
        </h2>

        {reservationComment.trim() !== '' ? (
          <section>
            <h3 className="my-2 flex items-center gap-1 font-semibold text-main-color">
              <NoticeSVG
                width="19"
                height="14"
                className="storke-main-color fill-main-color"
              />
              (강사의 말) 꼭 숙지해주세요!
            </h3>
            <div className="text-normal whitespace-pre-line break-keep border border-solid border-black p-2 text-sm">
              {reservationComment}
            </div>
          </section>
        ) : null}

        <ReservationInfo
          initialApplyData={initialApplyData}
          processedSchedules={processedSchedules}
        />
        <section className="mt-4 w-full rounded-md px-4 py-[1.31rem] shadow-vertical">
          <h3 className="flex gap-1 text-lg font-semibold">결제방식</h3>
          <PaymentMethod handlePaymentOption={handlePaymentOption} />
        </section>

        {paymentOption === 1 && (
          <section className="mt-4 px-4 py-[1.31rem] shadow-vertical">
            <h3 className="flex gap-1 text-lg font-semibold">
              <CouponSVG className="h-6 w-6 fill-sub-color1" />
              쿠폰/패스권 적용
            </h3>
            {/* <CouponContainer couponList={couponList} price={price} /> */}
            {/* 쿠폰 선택 */}
          </section>
        )}

        <section className="mt-4 w-full rounded-md px-4 py-[1.31rem] shadow-vertical">
          <h3 className="flex gap-1 text-lg font-semibold">무통장 입금</h3>
          <AccountInfo register={register} handleSubmit={handleSubmit} />
        </section>
      </section>

      <aside className="mt-3.5 h-full w-full rounded-md shadow-vertical lg:max-w-[17rem] lg:shadow-none">
        <ApplySidebar
          postId={id}
          title={title}
          price={price}
          handleAccountInfoSubmit={handleAccountInfoSubmit}
        />
      </aside>
    </div>
  );
};

export default ClassApplyPage;
