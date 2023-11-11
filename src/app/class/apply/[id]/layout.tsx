import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 클래스 신청',
  description: 'Connection 클래스 신청 페이지',
};

export default function ClassCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="mx-auto mb-6 flex w-full items-center justify-center py-4 text-2xl font-bold shadow-float">
        클래스 신청하기
      </h1>
      {children}
    </>
  );
}
