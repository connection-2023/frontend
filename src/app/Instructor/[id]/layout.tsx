import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 강사 상세페이지',
  description: 'Connection 강사 상세페이지',
};

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
