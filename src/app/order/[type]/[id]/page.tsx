import { MusicalNoteSVG, PassSVG } from '@/icons/svg';
import {
  getClassPreview,
  getClassDetail,
} from '@/lib/apis/serverApis/classPostApis';
import { getPassInfoForId } from '@/lib/apis/serverApis/passApis';
import ApplySidebar from './_components/ApplySidebar';
import ClassInfo from './_components/Class';
import Coupon from './_components/Class/Coupon';
import Pass from './_components/Class/Pass';
import PassInfo from './_components/Pass';
import PaymentType from './_components/PaymentType';
import ReservationInfo from './_components/ReservationInfo';
import { IClassDetailResponse } from '@/types/class';
import { IPassInfoForIdData } from '@/types/pass';
import type { Metadata } from 'next';

export const generateMetadata = async ({
  params,
}: {
  params: { type: string; id: string };
}): Promise<Metadata> => {
  const { type, id } = params;
  if (type === 'class') {
    const classData = await getClassPreview(id);

    return {
      title: `${classData.title} 클래스 신청`,
      description: `${classData.title} 클래스 신청 페이지`,
    };
  } else {
    const passInfo = await getPassInfoForId(id);

    return {
      title: `${passInfo?.title} 구매하기`,
      description: `${passInfo?.title} 구매하기 페이지`,
    };
  }
};

const OrderPage = async ({
  params: { type, id },
  searchParams,
}: {
  params: { type: string; id: string };
  searchParams: { [key: string]: string };
}) => {
  if (type !== 'class' && type !== 'pass')
    throw Error('타입(클래스/패스권)을 설정해주세요!');

  const isClass = type === 'class';

  const data = isClass ? await getClassDetail(id) : await getPassInfoForId(id);

  if (!data) return null;

  const pageTitle = isClass ? '클래스 신청하기' : '패스권 결제하기';
  const orderTitle = isClass
    ? (await getClassPreview(id)).title
    : (data as IPassInfoForIdData).title;

  return (
    <main className="mx-auto w-full flex-1">
      <h1 className="mb-6 w-full border-b border-solid border-gray-700 py-4 text-center text-2xl font-bold">
        {pageTitle}
      </h1>
      <div className="border-box mb-20 grid w-full grid-cols-1 justify-items-center gap-x-12 px-4 md:px-[4.5rem] lg:grid-cols-[2fr_1fr] xl:grid-cols-[1fr_2fr_1fr]">
        {/* 임시 빈 공간 */}
        <div className="hidden xl:block" />

        <section className="w-full lg:w-[40rem]">
          <h2 className="flex w-full items-center gap-2 whitespace-pre-line break-keep border-b-[3px] border-solid border-black py-3.5 text-2xl font-bold">
            {isClass ? (
              <MusicalNoteSVG
                width="21"
                height="21"
                className="mr-1 shrink-0 stroke-black"
              />
            ) : (
              <PassSVG
                width="21"
                height="21"
                className="mr-1 fill-sub-color1"
              />
            )}
            {orderTitle}
          </h2>

          {isClass ? (
            <ClassInfo
              id={id}
              searchParams={searchParams}
              classDetailData={data as IClassDetailResponse}
            />
          ) : (
            <PassInfo passInfo={data as IPassInfoForIdData} />
          )}

          <ReservationInfo isClass={isClass} />

          {isClass && <Coupon id={id} price={data.price} />}

          {isClass && <Pass id={Number(id)} />}

          <section className="mt-4 min-h-[447px] overflow-hidden rounded-md shadow-vertical">
            {/* <h3 className="text-lg font-semibold">결제 방법 선택</h3> */}
            {/* 페이 버튼 */}
            <PaymentType price={data.price} />
          </section>
        </section>

        <aside className="mt-3.5 h-full w-full rounded-md shadow-vertical lg:max-w-[17rem] lg:shadow-none">
          <ApplySidebar
            postId={id}
            title={orderTitle}
            price={data.price}
            isClass={isClass}
          />
        </aside>
      </div>
    </main>
  );
};

export default OrderPage;
