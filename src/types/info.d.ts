export interface certificationState {
  sendAuthenticationCode: boolean;
  authenticationCodeView: boolean;
  authenticationCode: boolean;
  certification: boolean;
}

export type certificationAction =
  | { type: 'RESET' }
  | { type: 'TOGGLE_AUTHENTICATION_CODE_VIEW' }
  | { type: 'ENABLE_SEND_AUTHENTICATION_CODE' }
  | { type: 'TOGGLE_AUTHENTICATION_CODE' }
  | { type: 'CERTIFY' }
  | { type: 'VERIFICATION_CODE_SENT_SUCCESSFULLY' }
  | { type: 'ENABLE_AUTHENTICATION_BUTTON' }
  | { type: 'DISABLED_AUTHENTICATION_BUTTON' };

export interface EmailFormValues {
  emailFront: string;
  emailBack: string;
  authenticationCode: string;
}

export interface accountCertificationState {
  sendAuthenticationCode: boolean;
  certification: boolean;
}

export type accountCertificationAction =
  | { type: 'RESET' }
  | { type: 'ENABLE_SEND_AUTHENTICATION_CODE' }
  | { type: 'CERTIFY' };

export interface accountFormValues {
  name: string;
  bank: {
    value: string;
    label: string;
  } | null;
  accountNumber: string;
}
