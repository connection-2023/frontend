import { useGoogleLogin } from '@react-oauth/google';
import { GoogleSVG } from '@/icons/svg';

interface GoogleAuthProps {
  onSuccess: (token: string) => void;
  onError: (response: any) => void;
}

declare global {
  interface Window {
    onGoogleScriptLoad: () => void;
    google: any;
  }
}

const GoogleAuth = ({ onSuccess, onError }: GoogleAuthProps) => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onSuccess(tokenResponse.access_token),
    onError,
  });

  return (
    <button id="google-signin-btn" type="button" onClick={() => login()}>
      <GoogleSVG width="58" height="57" />
    </button>
  );
};

export default GoogleAuth;
