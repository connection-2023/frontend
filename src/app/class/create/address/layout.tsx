import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 주소 찾기',
  description: 'Connection 주소 찾기 페이지',
};

export default function ClassCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
