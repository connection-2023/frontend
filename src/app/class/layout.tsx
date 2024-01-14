import UserLikesClassInitializer from './_components/UserLikesClassInitializer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 클래스 검색페이지',
  description: 'Connection 클래스 검색페이지',
};

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserLikesClassInitializer />
      {children}
    </>
  );
}
