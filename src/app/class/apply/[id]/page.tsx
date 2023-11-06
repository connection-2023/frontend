import { MusicalNoteSVG, NoticeSVG } from '@/icons/svg';
import { getClassPost } from '@/lib/apis/classApis';
import ApplySidebar from './_components/ApplySidebar';
import PaymentType from './_components/PaymentType';
import ReservationInfo from './_components/ReservationInfo';

const ClassApplyPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const classData = await getClassPost(id);

  if (classData instanceof Error) {
    console.error(classData.message);
    return <></>;
  }

  const {
    title,
    lectureSchedule,
    duration,
    maxCapacity,
    reservationComment,
    price,
  } = classData;

  return (
    <main className="grid-auto-rows-2 border-box mx-auto mb-20 flex grid w-full grid-cols-[1fr_2fr_1fr] gap-x-12 px-[4.5rem]">
      {/* 임시 빈 공간 */}
      <div className="" />

      <section className="w-full max-w-[40rem]">
        <h2 className="flex w-full items-center gap-2 whitespace-pre-line break-keep border-b-[3px] border-solid border-black py-[0.81rem] text-2xl font-bold">
          <MusicalNoteSVG
            width="21"
            height="21"
            className="mr-1 shrink-0 cursor-pointer stroke-black"
          />
          {title}
        </h2>
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

        <ReservationInfo
          schedule={lectureSchedule}
          duration={duration}
          maxCapacity={maxCapacity}
        />
        <section className="mt-4 px-4 py-[1.31rem] shadow-vertical">
          <h3 className="text-lg font-semibold">쿠폰/패스권 적용</h3>
          {/* 쿠폰 선택 */}
        </section>

        <section className="mt-4 shadow-vertical">
          {/* <h3 className="text-lg font-semibold">결제 방법 선택</h3> */}
          {/* 페이 버튼 */}
          <PaymentType price={price} />
        </section>
      </section>
      <aside className="h-full max-w-[17rem]">
        <ApplySidebar postId={id} title={title} price={price} />
      </aside>
    </main>
  );
};

export default ClassApplyPage;
