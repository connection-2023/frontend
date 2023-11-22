import Sidebar from '../_components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 회원페이지',
  description: 'Connection 회원페이지',
};

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className=" mx-auto grid w-full grid-cols-[1fr,2fr,1fr] justify-between gap-x-4 bg-sub-color1-transparent px-16 pb-20 pt-4">
      <Sidebar />
      {children}
    </main>
  );
}
