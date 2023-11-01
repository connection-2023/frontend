import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 대시보드',
  description: 'Connection 강사 대시보드',
};

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-admin-bg-color mx-auto mb-20 grid w-full max-w-[1440px] grid-cols-4 gap-4 px-[4.37rem] pb-12">
      {children}
    </main>
  );
}
