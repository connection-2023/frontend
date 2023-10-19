import Sidebar from './_components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 회원페이지',
  description: 'Connection 회원페이지',
};

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto mb-[11.5rem] flex w-full max-w-[1440px] justify-between">
      <Sidebar />
      {children}
    </main>
  );
}
