import Sidebar from '../../_components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 강사 마이페이지',
  description: 'Connection 강사 마이페이지',
};

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-max w-full flex-1 grid-cols-1 justify-between gap-x-4 bg-sub-color1-transparent pb-20 pt-4 xl:grid-cols-[1fr,3fr] xl:px-9">
      <aside
        className={`hidden w-full rounded-lg bg-white shadow-float xl:block`}
      >
        <Sidebar />
      </aside>
      {children}
    </div>
  );
}
