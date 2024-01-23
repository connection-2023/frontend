// 카카오 소셜 로그인
interface KakaoError {
  error: string;
  error_description: string;
}

interface RequestParams {
  url: string;
  success: (profile: UserProfile) => void;
  fail: (error: KakaoError) => void;
}

interface KakaoAPI {
  request: (params: RequestParams) => void;
}

interface AuthSettings {
  redirectUri?: string;
  state?: string;
  scope?: string;
  prompt?: string;
  loginHint?: string;
  nonce?: string;
}

interface AuthError {
  error: { code: number; msg: string };
}

interface StatusResponse {
  statusInfo: StatusInfo;
}

export interface LoginResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
}

interface Profile {
  nickname: string;
  profile_image: string;
  thumbnail_image_url: string;
  profile_needs_agreement?: boolean;
}

interface KakaoAccount {
  profile: Profile;
  email: string;
  age_range: string;
  birthday: string;
  birthyear: string;
  gender: 'female' | 'male';
  phone_number: string;
  ci: string;
}

interface LoginParams extends AuthSettings {
  throughTalk?: boolean;
  success: (response: LoginResponse) => void;
  fail: (error: AuthError) => void;
}

interface StatusInfo {
  status: string;
  user: Object;
}

interface LogoutResponse {
  userInfo: { id: number };
}

export interface SignInResponse {
  authEmail: string;
  signUpType: 'NAVER' | 'KAKAO' | 'GOOGLE';
  idToken?: string;
}

export interface AuthResponse {
  status: number;
  data: SignInResponse;
}

interface UserProfile {
  id: number;
  kakao_account: KakaoAccount;
  synched_at: string;
  connected_at: string;
  properties: Profile;
}

export interface KakaoAuthProps {
  onSuccess: (response: {
    response: LoginResponse;
    profile?: UserProfile;
  }) => void;
  onFail: (error: AuthError | KakaoError) => void;
  throughTalk?: boolean;
  useLoginForm?: boolean;
  needProfile?: boolean;
}

interface KakaoAuth {
  authorize(settings: AuthSettings): void;
  cleanup(): void;
  getAccessToken(): string;
  getAppKey(): string;
  getStatusInfo(): Promise<StatusResponse | AuthError>;
  login: (params: LoginParams) => void;
  loginForm: (params: LoginParams) => void;
  setAccessToken(token: string, persist: boolean): void;
  logout(): Promise<LogoutResponse | AuthError>;
}

interface Kakao {
  init: (...args: any[]) => void;
  isInitialized: () => boolean;
  Auth: KakaoAuth;
  API: KakaoAPI;
}

export interface ExtendedWindow extends Window {
  Kakao: Kakao;
}

export interface ISignUp {
  name: string;
  nickname: string;
  isProfileOpen?: boolean;
  phoneNumber?: string;
  gender?: number;
  email: string;
  provider: SignInResponse[signUpType];
  authEmail: string;
  image?: File | null;
}

export interface userProfile {
  id: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  userProfileImage: { imageUrl: string | null };
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type userType = 'user' | 'lecturer';

export interface instructorProfile {
  id: string;
  profileCardImageUrl: string | null;
  nickname: string;
  name: string;
  phoneNumber: string;
  email: string;
}

interface IMarketingConsent {
  marketingChannelTalk: boolean;
  marketingEmail: boolean;
}

export interface IRegisterConsents {
  termsOfService: boolean;
  talk: boolean;
  email: boolean;
  marketing: IMarketingConsent;
}

type ConsentOptionType<T extends keyof any> = T extends keyof IRegisterConsents
  ? IRegisterConsents[T] extends boolean
    ? { id: T; title: string }
    : {
        id: T;
        title: string;
        subOptions: Array<{ id: keyof IRegisterConsents[T]; title: string }>;
      }
  : never;

export type ConsentListType = Array<ConsentOptionType<keyof IRegisterConsents>>;
