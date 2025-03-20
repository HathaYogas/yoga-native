export const LOGIN_MESSAGE = {
  email: {
    required: '이메일을 입력해주세요',
  },
  password: {
    required: '비밀번호를 입력해주세요',
  },
  error: {
    loginFailed: '로그인 실패',
  },
};

export const JOIN_MESSAGE = {
  email: {
    required: '이메일을 입력해주세요',
  },
  password: {
    required: '비밀번호를 입력해주세요',
  },
  passwordConfirm: {
    required: '비밀번호 확인을 입력해주세요',
  },
  name: {
    required: '닉네임을 입력해주세요',
  },
  success: { join: '회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.' },
  error: {
    passwordNotMatch: '비밀번호가 일치하지 않습니다.',
    joinFailed: '회원가입 실패',
  },
};

export const FORGOT_PASSWORD_MESSAGE = {
  email: {
    required: '이메일을 입력해주세요.',
  },
  success: {
    forgotPassword: '가입 시 입력한 이메일로 임시 비밀번호를 보냈습니다.',
  },
  error: {
    emailNotFound: '가입 시 입력한 이메일을 찾을 수 없습니다.',
  },
};
