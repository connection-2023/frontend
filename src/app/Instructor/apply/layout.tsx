import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 강사 등록페이지',
  description: 'Connection 강사 등록페이지',
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
