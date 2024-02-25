import Link from 'next/link';
import { ButtonStyles } from '@/constants/constants';
import { getApplyClassDetail } from '@/lib/apis/serverApis/classApi';
import Back from './_components/Back';
import CancelApplicationButton from './_components/CancelApplicationButton';
import ClassLocation from './_components/ClassLocation';
import OneDayClass from './_components/OneDayClass';
import RegularClass from './_components/RegularClass';
import Notice from '@/components/ClassNotice/Notice';

const ApplyDetailPage = async ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) => {
  const { type } = searchParams;

  if (type !== '원데이' && type !== '정기')
    throw Error('type(원데이/정기)가 지정되지 않았습니다!');

  const data = await getApplyClassDetail(id, type);
  const { lecture, isCompleted } = data;

  return (
    <section className="mb-18 mx-auto flex h-full w-full max-w-[40rem] flex-col rounded-lg px-4 text-sm md:px-0 xl:mx-0">
      <div className="mb-2 flex flex-col items-center whitespace-nowrap border-solid border-gray-500 py-3 md:mb-3 md:flex-row md:border-b">
        <div className="mb-2.5 flex w-full border-b border-solid border-gray-500 py-3 md:mb-0 md:border-none md:py-0">
          <Back />
          <p className="text-2xl font-bold">{lecture.title}</p>
        </div>

        <div className="flex w-full gap-2 md:w-fit">
          {!isCompleted && <CancelApplicationButton {...data} />}

          <div className="w-1/2 md:hidden">
            <Link
              href={`/class/${lecture.id}#intro-section`}
              className={`h-[35px] font-semibold ${ButtonStyles.default}`}
            >
              커리큘럼
            </Link>
          </div>
          <div className="hidden w-[4.69rem] md:block">
            <Link
              href={`/class/${lecture.id}#intro-section`}
              className={`h-7 font-semibold ${ButtonStyles.default}`}
            >
              커리큘럼
            </Link>
          </div>
        </div>
      </div>

      {lecture?.notification && (
        <div className="mb-4 md:mt-3">
          <Notice
            content={lecture.notification.content}
            updateDate={lecture.notification.updatedAt}
          />
        </div>
      )}

      {type === '원데이' ? (
        <OneDayClass {...data} />
      ) : (
        <RegularClass {...data} />
      )}

      <ClassLocation {...data} />
    </section>
  );
};

export default ApplyDetailPage;
