import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 강의 상세페이지',
  description: 'Connection 강의 상세페이지',
};

export default function ClassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
