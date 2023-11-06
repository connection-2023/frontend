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
    <main className="bg-main-color-transparent mx-auto mb-20 grid w-full grid-cols-1 pb-12 md:grid-cols-8 md:gap-4 md:px-[2.25rem] lg:grid-cols-4 lg:px-[4.37rem]">
      {children}
    </main>
  );
}
