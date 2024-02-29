import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 로그인',
  description: 'Connection | 로그인',
};

const AuthLayout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
};

export default AuthLayout;
