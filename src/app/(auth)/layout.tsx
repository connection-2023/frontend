import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 회원가입 페이지',
  description: 'Connection 회원가입 페이지',
};

const AuthLayout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <section className="flex h-max flex-grow flex-col bg-gray-900 py-10">
      {children}
      {modal}
    </section>
  );
};

export default AuthLayout;
