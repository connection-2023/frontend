import type { Metadata } from 'next';
import { getClassPost } from '@/lib/apis/classApis';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const { id } = params;

  const classData = await getClassPost(id);
  if (classData instanceof Error) {
    return {
      title: 'Connection | 강의 상세페이지',
      description: 'Connection 강의 상세페이지',
    };
  }

  return {
    title: `Connection | ${classData.title}`,
    description: classData.introduction,
  };
};

export default function ClassDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
