import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
  },
};

export default async function memberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
