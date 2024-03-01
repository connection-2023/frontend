import Register from '../../_components/Register/Register';
import RouterModal from '@/components/Modal/RouterModal';

const RegisterModal = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { token, userEmail, type } = searchParams;
  if (!token || !userEmail || !type) throw new Error('유저 정보가 없습니다.');

  return (
    <RouterModal>
      <Register token={token} userEmail={userEmail} signUpType={type} />
    </RouterModal>
  );
};

export default RegisterModal;
