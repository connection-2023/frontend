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
  return <>{children}</>;
}
