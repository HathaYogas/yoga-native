export type NavigatorStackParamList = {
  [navigatorParams.HOME]: undefined;
  [navigatorParams.LOGIN]: undefined;
  [navigatorParams.JOIN]: undefined;
  [navigatorParams.FORGOT_PASSWORD]: undefined;
};

export const navigatorParams = {
  HOME: 'HOME',
  LOGIN: 'LOGIN',
  JOIN: 'JOIN',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
} as const;
