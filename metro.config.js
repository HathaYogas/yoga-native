const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

// `@testing-library/react-native`를 번들에서 제외 (프로덕션 환경에서만)
defaultConfig.resolver.blockList = process.env.NODE_ENV !== 'test' ? [
  /node_modules\/@testing-library\/react-native\/.*/,
] : [];

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    blacklistRE: /__tests__\/.*/,
  },
  watchFolders: [
    path.resolve(__dirname, 'app'), // 필요한 경우 다른 폴더 추가
  ],
};
