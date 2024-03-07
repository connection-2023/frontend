import { Suspense } from 'react';
import {
  getClassPreview,
  getClassDetail,
  getUserReservation,
} from '@/lib/apis/serverApis/classPostApis';
import ClassDetail from './_components/ClassDetail';
import ClassPreview from './_components/ClassPreview';
import ClassDetailLoading from './_components/Loading/ClassDetailLoading';
import ClassTopLoading from './_components/Loading/ClassTopLoading';
import UserReservation from './_components/UserReservation';
import type { Metadata } from 'next';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const { id } = params;
  const classData = await getClassPreview(id);
  const classDetailData = await getClassDetail(id);

  if (classData instanceof Error || classDetailData instanceof Error) {
    return {
      title: 'Connection | 강의 상세페이지',
      description: 'Connection 강의 상세페이지',
    };
  }

  return {
    title: classData.title,
    description: classDetailData.introduction,
  };
};

const ClassDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const userReservationData = await getUserReservation(id);

  return (
    <main className="border-box mx-auto mt-[1.38rem] box-border grid grid-cols-1 gap-x-12 lg:grid-cols-[3fr_1fr] lg:gap-x-5 xl:grid-cols-[1fr_2fr_1fr]">
      <Suspense fallback={<ClassTopLoading />}>
        <ClassPreview id={id} />
      </Suspense>

      <div className="fixed bottom-[6rem] z-modal flex w-full justify-center px-4 xl:bottom-6 ">
        <UserReservation userReservation={userReservationData} />
      </div>

      {/* 임시 빈 공간 */}
      <div className="hidden xl:block" />

      <Suspense fallback={<ClassDetailLoading />}>
        <ClassDetail id={id} />
      </Suspense>
    </main>
  );
};

export default ClassDetailPage;
