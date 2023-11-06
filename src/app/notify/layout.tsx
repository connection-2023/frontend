import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 알림',
  description: 'Connection 알림',
};

export default function NotifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
