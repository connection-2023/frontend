import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 회원가입 페이지',
  description: 'Connection 회원가입 페이지',
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex h-max flex-grow flex-col bg-gray-900 py-10">
      {children}
    </section>
  );
};

export default AuthLayout;
