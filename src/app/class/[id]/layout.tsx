import type { Metadata } from 'next';
import { getClassInfo } from '@/lib/apis/serverApis/classPostApis';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const { id } = params;

  const classData = await getClassInfo(id);
  if (classData instanceof Error) {
    return {
      title: 'Connection | 강의 상세페이지',
      description: 'Connection 강의 상세페이지',
    };
  }

  return {
    title: `Connection | ${classData.lecture.title}`,
    description: classData.lecture.introduction,
  };
};

export default function ClassDetailLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children} {modal}
    </>
  );
}
