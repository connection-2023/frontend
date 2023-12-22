import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 강사페이지',
  description: 'Connection 강사페이지',
};

export default async function MyPageLayout({
  children,
  writeReviewModal,
}: {
  children: React.ReactNode;
  writeReviewModal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {writeReviewModal}
    </>
  );
}
