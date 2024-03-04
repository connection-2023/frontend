import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 강사 마이페이지',
  description: 'Connection 강사 마이페이지',
};

export default async function MyPageLayout({
  children,
  managementCouponModal,
}: {
  children: React.ReactNode;
  managementCouponModal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {managementCouponModal}
    </>
  );
}
