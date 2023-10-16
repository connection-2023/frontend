import type { Metadata } from 'next';
import RecoilProvider from '@/recoil/RecoilProvider';

export const metadata: Metadata = {
  title: 'Connection | 클래스 작성',
  description: 'Connection 클래스 생성 페이지',
};

export default function ClassCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilProvider>{children}</RecoilProvider>;
}
