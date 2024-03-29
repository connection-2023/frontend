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
    <main className="mx-auto grid w-full flex-1 grid-cols-1 grid-rows-[min-content_max-content] bg-main-color-transparent pb-12 md:grid-cols-2 md:gap-4 md:px-9 xl:grid-cols-4">
      {children}
    </main>
  );
}
