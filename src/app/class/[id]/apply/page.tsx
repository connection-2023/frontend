'use client';
import { useQueries } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { CouponSVG, MusicalNoteSVG, NoticeSVG } from '@/icons/svg';
import { getOriginalClassInfo } from '@/lib/apis/classApis';
import { getCouponLists } from '@/lib/apis/couponApis';
import ApplySidebar from './_components/ApplySidebar';
import CouponContainer from './_components/Coupon/CouponContainer';
import PaymentType from './_components/PaymentType';
import ReservationInfo from './_components/ReservationInfo';
import { processSelectedSchedules } from './_lib/applyScheduleUtils';
import ApplyLoading from '@/components/Loading/ApplyLoading';
import { IReservationInfo } from '@/types/payment';

const ClassApplyPage = ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) => {
  const reqData = {
    take: 10000, //추후 null로 변경
    couponStatusOption: 'AVAILABLE' as 'AVAILABLE',
    filterOption: 'LATEST' as 'LATEST',
    // lectureIds: [id],
  };

  const { lectureScheduleId, count } = searchParams;

  const [
    { data, isLoading, error },
    { data: couponList, isLoading: couponLoading, error: couponError },
  ] = useQueries({
    queries: [
      {
        queryKey: ['apply', id],
        queryFn: () => getOriginalClassInfo(id),
      },
      {
        queryKey: ['apply2', id],
        queryFn: () => getCouponLists(reqData, 'user'),
      },
    ],
  });

  if (isLoading || couponLoading) {
    return <ApplyLoading />;
  }

  if (error || !data || data instanceof Error || couponError || !couponList) {
    redirect('/404');
  }

  const { title, duration, maxCapacity, reservationComment, price, schedule } =
    data;

  const initialApplyData: IReservationInfo = {
    lectureScheduleId: Number(lectureScheduleId),
    participants: Number(count),
  };

  const processedSchedules = processSelectedSchedules(
    schedule,
    initialApplyData,
    maxCapacity,
    duration,
  );

  return (
    <>
      <h1 className="mx-auto mb-6 flex w-full items-center justify-center border-b border-solid border-gray-700 py-4 text-2xl font-bold">
        클래스 신청하기
      </h1>
      <div className="border-box mx-auto mb-20 flex grid w-full grid-cols-1 gap-x-12 px-4 md:px-[4.5rem] lg:grid-cols-[2fr_1fr] xl:grid-cols-[1fr_2fr_1fr]">
        {/* 임시 빈 공간 */}
        <div className="hidden xl:block" />

        <section className="w-full lg:max-w-[40rem]">
          <h2 className="flex w-full items-center gap-2 whitespace-pre-line break-keep border-b-[3px] border-solid border-black py-3.5 text-2xl font-bold">
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

          {processedSchedules && (
            <ReservationInfo
              initialApplyData={initialApplyData}
              processedSchedules={processedSchedules}
            />
          )}

          <section className="mt-4 px-4 py-[1.31rem] shadow-vertical">
            <h3 className="flex gap-1 text-lg font-semibold">
              <CouponSVG className="h-6 w-6 fill-sub-color1" />
              쿠폰/패스권 적용
            </h3>
            <CouponContainer couponList={couponList} price={price} />
            {/* 쿠폰 선택 */}
          </section>

          <section className="mt-4 min-h-[447px] overflow-hidden rounded-md shadow-vertical">
            {/* <h3 className="text-lg font-semibold">결제 방법 선택</h3> */}
            {/* 페이 버튼 */}
            <PaymentType price={price} />
          </section>
        </section>

        <aside className="mt-3.5 h-full w-full rounded-md shadow-vertical lg:max-w-[17rem] lg:shadow-none">
          <ApplySidebar postId={id} title={title} price={price} />
        </aside>
      </div>
    </>
  );
};

export default ClassApplyPage;
