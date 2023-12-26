import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 강사 마이페이지',
  description: 'Connection 강사 마이페이지',
};

export default async function MyPageLayout({
  children,
  managementModal,
}: {
  children: React.ReactNode;
  managementModal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {managementModal}
    </>
  );
}
