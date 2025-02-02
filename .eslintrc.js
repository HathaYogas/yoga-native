module.exports = {
  env: { // 환경 설정
    browser: true, // 브라우저 환경
    es2021: true, // ES2021 사용
  },
  extends: [ // 확장할 규칙
    'eslint:recommended', // 추천 규칙
    'plugin:react/recommended', // React 추천 규칙
    'plugin:prettier/recommended', // Prettier와 통합
  ],
  parserOptions: { // 파서 옵션
    ecmaFeatures: { // ECMAScript 기능
      jsx: true, // JSX 사용
    },
    ecmaVersion: 12, // ECMAScript 버전
    sourceType: 'module', // 모듈 사용
  },
  plugins: ['react'], // 사용할 플러그인
  rules: { // 규칙 설정
    // 필요에 따라 규칙을 추가하세요
  },
}; 