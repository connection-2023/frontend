import PaymentType from '@/app/class/[id]/apply/_components/PaymentType';
import { ArrowUpSVG, MusicalNoteSVG, PassSVG } from '@/icons/svg';
import ApplyButton from '@/components/Button/ApplyButton';

const page = async ({ params }) => {
  console.log(params);

  return (
    <>
      <h1 className="mx-auto mb-6 flex w-full items-center justify-center border-b border-solid border-gray-700 py-4 text-2xl font-bold">
        패스권 결제하기
      </h1>
      <div className="border-box mx-auto mb-20 grid w-full grid-cols-1 gap-x-12 px-4 md:px-[4.5rem] lg:grid-cols-[2fr_1fr] xl:grid-cols-[1fr_2fr_1fr]">
        {/* 임시 빈 공간 */}
        <div className="hidden xl:block" />

        <section className="w-full lg:max-w-[40rem]">
          <h2 className="flex w-full items-center gap-2 whitespace-pre-line break-keep border-b-[3px] border-solid border-black py-3.5 text-2xl font-bold">
            <PassSVG width="21" height="21" className="mr-1 fill-sub-color1" />
            제목
          </h2>

          <section className="mt-5 rounded-md px-4 py-[1.31rem] shadow-vertical">
            <div className="w-full whitespace-nowrap">
              <h3 className="mb-3 text-lg font-semibold">패스권 정보</h3>
              <dl className="grid grid-cols-[4rem,1fr] gap-x-3 gap-y-2 text-sm [&>dt]:font-semibold [&>dt]:text-gray-500">
                <dt>이용기간</dt>
                <dd>1개월</dd>
                <dt>횟수</dt>
                <dd>10회</dd>
                <dt>가격</dt>
                <dd>60000원</dd>
                <dt>강사</dt>
                <dd>10회</dd>
              </dl>
            </div>
          </section>

          <div className="mt-4 rounded-md px-4 py-[1.31rem] shadow-vertical">
            <section className="w-full whitespace-nowrap">
              <h3 className="text-lg font-semibold">예약자 정보</h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm font-semibold text-gray-100 ">
                <li className="flex items-center gap-4 py-[0.31rem]">
                  <label className="flex items-center gap-4">
                    <span>대표자 이름</span>
                    <input className="h-7 w-full max-w-[20rem] rounded-md border border-solid border-gray-500 px-[0.62rem] py-[0.31rem] focus:outline-sub-color1" />
                  </label>

                  <div className="w-24 shrink-0" />
                </li>
                <li className="flex items-center gap-4 py-[0.31rem]">
                  <label className="flex items-center gap-4">
                    <span>대표 연락처</span>
                    <input className="h-7 w-full max-w-[20rem] rounded-md border border-solid border-gray-500 px-[0.62rem] py-[0.31rem] focus:outline-sub-color1" />
                  </label>

                  <button className="h-7 w-24 shrink-0 cursor-pointer whitespace-nowrap rounded-md border border-solid border-black bg-black font-medium text-white">
                    인증하기
                  </button>
                </li>
              </ul>
            </section>
          </div>

          <section className="mt-4 min-h-[447px] overflow-hidden rounded-md shadow-vertical">
            {/* <h3 className="text-lg font-semibold">결제 방법 선택</h3> */}
            {/* 페이 버튼 */}
            <PaymentType price={111} />
          </section>
        </section>

        <aside className="mt-3.5 h-full w-full rounded-md shadow-vertical lg:max-w-[17rem] lg:shadow-none">
          <section className="sticky top-20 mt-5 flex flex-col whitespace-pre-line break-keep px-3.5 text-sm text-gray-100 lg:mt-14 lg:px-0">
            <h4 className="text-lg font-bold">결제 금액</h4>
            <ul className="mb-5 mt-6 flex flex-col gap-3 border-b border-solid border-gray-500 pb-[0.81rem]">
              <li className="flex items-center justify-between">
                주문 금액
                <span className="min-w-[1.25rem]">
                  {'100000'.toLocaleString()}원
                </span>
              </li>
            </ul>

            <div className="mb-2 flex items-center justify-between font-bold">
              <p>최종 결제 금액</p>
              <span className="min-w-[2rem] text-2xl text-black">
                {'100000'.toLocaleString()}원
              </span>
            </div>

            <ul className="gap-2">
              <li className="flex items-center">
                <p className="flex-1">ㅂㅂㅂㅂ</p>
                <button aria-label="자세히보기">
                  <ArrowUpSVG
                    className={`h-[34px] w-[34px] fill-gray-500 ${
                      false ? '' : 'rotate-180'
                    }`}
                  />
                </button>
              </li>
              <li className="flex items-center">
                <p className="flex-1">ㅂㅂㅂㅂ</p>
                <button aria-label="자세히보기">
                  <ArrowUpSVG
                    className={`h-[34px] w-[34px] fill-gray-500 ${
                      false ? '' : 'rotate-180'
                    }`}
                  />
                </button>
              </li>
            </ul>

            <p className="mb-4 mt-[1.31rem] font-bold">
              상기 필수약관을 확인하였으며 결제에 동의합니다.
            </p>

            <div className="fixed bottom-4 left-0 w-screen px-9 lg:static lg:w-full lg:px-0">
              <ApplyButton
                label={
                  <>
                    <p className="hidden lg:block">결제하기</p>
                    <p className="lg:hidden">
                      {'100000'.toLocaleString()}원 결제하기
                    </p>
                  </>
                }
              />
            </div>
          </section>
        </aside>
      </div>
    </>
  );
};

export default page;
