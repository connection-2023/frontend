export interface State {
  sendAuthenticationCode: boolean;
  authenticationCodeView: boolean;
  authenticationCode: boolean;
  certification: boolean;
}

export type Action =
  | { type: 'RESET' }
  | { type: 'TOGGLE_AUTHENTICATION_CODE_VIEW' }
  | { type: 'ENABLE_SEND_AUTHENTICATION_CODE' }
  | { type: 'TOGGLE_AUTHENTICATION_CODE' }
  | { type: 'CERTIFY' }
  | { type: 'VERIFICATION_CODE_SENT_SUCCESSFULLY' }
  | { type: 'ENABLE_AUTHENTICATION_BUTTON' }
  | { type: 'DISABLED_AUTHENTICATION_BUTTON' };
