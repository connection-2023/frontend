import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 신청 완료',
  description: 'Connection 클래스 신청 완료',
};

export default function ApplyCompleteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
