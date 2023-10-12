import { useState } from 'react';
import Modal from 'react-modal';
import AuthHome from './AuthHome';
import SignUp from './SignUp';
import { CloseSVG } from '@/../public/icons/svg';
import { SignInResponse } from '@/types/auth';

interface IAuthModal {
  isOpened: boolean;
  isClosed: () => void;
}

const AuthModal = ({ isOpened, isClosed }: IAuthModal) => {
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<SignInResponse | null>();

  const handleStatusCode = (code: number) => {
    setStatusCode(code);
  };

  const handleUserInfo = (info: SignInResponse) => {
    setUserInfo(info);
  };

  const onClickPrev = () => {
    setStatusCode(null);
    setUserInfo(null);
  };

  return (
    // --- 배경 누르면 자동으로 닫히게 해야하나..? ---
    <Modal isOpen={isOpened} ariaHideApp={false} style={authModalStyles}>
      <button>
        <CloseSVG
          width={16}
          height={16}
          onClick={isClosed}
          className="absolute right-[1rem] top-[0.81rem] cursor-pointer stroke-sub-color2 stroke-2"
        />
      </button>

      {!statusCode && (
        <AuthHome
          handleStatusCode={handleStatusCode}
          handleUserInfo={handleUserInfo}
        />
      )}

      {statusCode === 201 && userInfo && (
        <SignUp userInfo={userInfo} onClickPrev={onClickPrev} />
      )}
    </Modal>
  );
};

export default AuthModal;

const authModalStyles: ReactModal.Styles = {
  content: {
    width: '80%',
    height: 'fit-content',
    maxWidth: '450px',
    zIndex: '10',
    boxSizing: 'border-box',
    padding: '0 1.12rem',
    borderRadius: '0.3125rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 2px 5px 1px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
};
