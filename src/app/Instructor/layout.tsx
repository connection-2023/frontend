import UserLikesInstructorInitializer from './_components/UserLikesInstructorInitializer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 강사 검색페이지',
  description: 'Connection 강사 검색페이지',
};

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserLikesInstructorInitializer />
      {children}
    </>
  );
}
