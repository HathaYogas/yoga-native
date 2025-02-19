export type NavigatorStackParamList = {
  [navigatorParams.HOME]: undefined;
  [navigatorParams.LOGIN]: undefined;
  [navigatorParams.SIGNUP]: undefined;
  [navigatorParams.FORGOT_PASSWORD]: undefined;
};

export const navigatorParams = {
  HOME: 'HOME',
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
} as const;
