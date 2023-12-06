import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 신청 완료',
  description: 'Connection 클래스 신청 완료',
};

export default function ApplyCompleteLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <main className="mx-auto max-w-[40rem]">{children}</main>
      {modal}
    </>
  );
}
