import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 신고하기',
  description: 'Connection 신고하기',
};

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
