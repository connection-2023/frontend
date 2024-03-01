import Register from '../_components/Register/Register';

const RegisterPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { token, userEmail, type } = searchParams;
  if (!token || !userEmail || !type) throw new Error('유저 정보가 없습니다.');

  return <Register token={token} userEmail={userEmail} signUpType={type} />;
};

export default RegisterPage;
