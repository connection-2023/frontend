import { MusicalNoteSVG, NoticeSVG } from '@/icons/svg';

const ApplyLoading = () => (
  <div className="border-box mx-auto mb-20 flex grid w-full grid-cols-1 gap-x-12 px-4 md:px-[4.5rem] lg:grid-cols-[2fr_1fr] xl:grid-cols-[1fr_2fr_1fr]">
    <div className="hidden xl:block" />

    <div className="w-full lg:max-w-[40rem]">
      <h2 className="flex w-full items-center gap-2 border-b-[3px] border-solid border-black py-3.5">
        <MusicalNoteSVG
          width="21"
          height="21"
          className="mr-1 shrink-0 cursor-pointer stroke-black"
        />

        <p className="h-8 w-full animate-pulse bg-gray-700" />
      </h2>

      <div>
        <h3 className="my-2 flex items-center gap-1 font-semibold text-main-color">
          <NoticeSVG
            width="19"
            height="14"
            className="storke-main-color fill-main-color"
          />
          (강사의 말) 꼭 숙지해주세요!
        </h3>

        <div className="border border-solid border-black p-2">
          <div className="h-8 animate-pulse bg-gray-700" />
        </div>
      </div>

      <div className="mt-4 rounded-md px-4 py-5 shadow-vertical">
        <h3 className="text-lg font-semibold">신청한 클래스</h3>
        <div className="mt-4 h-8 animate-pulse bg-gray-700" />
      </div>

      <div className="mt-4 rounded-md px-4 py-5 shadow-vertical">
        <h3 className="text-lg font-semibold">예약자 정보</h3>
        <div className="mt-2 h-8 animate-pulse bg-gray-700" />
        <div className="mt-2 h-8 animate-pulse bg-gray-700" />
        <hr className="mt-5 h-1 border-gray-500" />
        <h3 className="mb-2 mt-4 text-lg font-semibold">예약 시 요청사항</h3>
        <div className="h-20 w-full animate-pulse bg-gray-700 p-3" />
      </div>

      <div className="mt-4 w-full rounded-md px-4 py-5 shadow-vertical">
        <h3 className="mb-6 text-lg font-semibold">결제방식</h3>
        <div className="h-8 animate-pulse bg-gray-700" />
        <div className="mt-4 h-14 animate-pulse bg-gray-700" />
      </div>

      <div className="mt-4 w-full rounded-md px-4 py-5 shadow-vertical">
        <h3 className="flex gap-1 text-lg font-semibold">무통장 입금</h3>
        <div className="mt-4 h-60 animate-pulse bg-gray-700" />
      </div>
    </div>

    <aside className="hadow-vertical mt-3.5 lg:max-w-[17rem] lg:shadow-none">
      <div className="sticky top-20 mt-5 h-80 animate-pulse bg-gray-700 px-3.5 lg:mt-14 lg:px-0" />
    </aside>
  </div>
);

export default ApplyLoading;
