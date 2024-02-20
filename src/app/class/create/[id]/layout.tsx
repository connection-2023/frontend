import { redirect } from 'next/navigation';
import { getClassDraft } from '@/lib/apis/serverApis/classApi';
import ClassStoreInitializer from './_components/ClassStoreInitializer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 클래스 작성',
  description: 'Connection 클래스 작성 페이지',
};

export default async function ClassCreateLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  let data;

  try {
    if (isNaN(Number(params.id))) {
      throw new Error('id의 값이 숫자가 아닙니다.');
    }

    data = await getClassDraft(params.id);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      redirect('/class/create/drafts');
    }
  }

  if (!data) {
    redirect('/class/create/drafts');
  }

  return (
    <>
      <ClassStoreInitializer data={data} />
      {children}
    </>
  );
}
