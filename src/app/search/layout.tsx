import UserLikesInitializer from './_components/UserLikesInitializer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 검색',
  description: 'Connection 전체 검색',
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserLikesInitializer />
      {children}
    </>
  );
}
