## 시작하기

이 애플리케이션은 React Native와 Expo를 사용하여 개발되었습니다.

[사전 설치]

```bash
#이미 설치되었을 경우, 생략
npm install -g eas-cli # eas build
xCode # ios build
AndroidStudio # android build
```

[xcode 설정]

- EXPO 계정 생성하기 : https://expo.dev/ -> Sign Up
- 추후 `npm start` 후 xcode 실행 시 로그인

- **참고**

  - iOS 네이티브 코드 빌드

    - 라이브러리가 네이티브 코드를 포함하고 있으면, iOS 빌드를 다시 해야 함. 아래 명령어로 iOS 네이티브 코드에 대한 의존성 설치.

    ```zsh
    cd ios
    pod install
    cd ..
    ```

  - `Unable to run simctl: Error: xcrun simctl help exited with non-zero code: 72`

    ```zsh
    # 해결책
    sudo xcode-select reset
    xcrun simctl erase all
    ```

[안드로이드 스튜디오 설정하기]

- [EXPO 공식문서 android 설정 방법](https://docs.expo.dev/workflow/android-studio-emulator/#set-up-android-studio)
- 안드로이드 스튜디오 설치
- `Projects` > `More Actions` > `SDK Manager` 이동
- `SDK platform` 탭에서 우측 하단 `Show Package Details` 체크
  - Android 15.0
    - ✅ Android SDK platform 35
    - ✅ Sources for Android
    - ✅ Google APIs ARM 64 v8a System Image
    - ✅ Google Play ARM 64 v8a System Image
  - Android 14.0
    - ✅ Android SDK platform 34
    - ✅ Sources for Android
    - ✅ Google APIs ARM 64 v8a System Image
    - ✅ Google Play ARM 64 v8a System Image
  - Android 13.0
    - ✅ Android SDK platform 33
    - ✅ Sources for Android
    - ✅ Google APIs ARM 64 v8a System Image
    - ✅ Google Play ARM 64 v8a System Image
- `SDK Tools` 탭에서 우측 하단 `Show Package Details` 체크
  - `Android SDK Build Tools ~~`
    - ✅ 35.0.1
    - ✅ 34.0.0
    - ✅ 33.0.3
  - `Show Package Details` 체크 해제 후
    - ✅ Android Emulator
    - ✅ Android SDK Platform-Tools
    - ✅ Google Play services
- 설정 체크 후 install
- 터미널에서 `vi ~/.zshrc` 실행
- `i` 누른 후, 해당 코드 붙여넣기
  ```zsh
  export ANDROID_HOME=$HOME/Library/Android/sdk # Android SDK Location
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```
  - `esc` , `:wq` 를 통해 저장
- `source ~/.zshrc` 를 통해 실행
- Android Studio 실행 화면 > `Projects` > `More Actions` > `Virtual Device Manager`
- 좌측 상단의 추가 버튼(+) 에서 Medium Phone 선택 후 35, 34, 33 emulator 각각 생성

[시작하기]

```bash
npm install
npm start
```

## script

다음은 현재 프로젝트에서 사용할 수 있는 npm 명령어입니다:

- `npm start`: Expo 개발 서버를 시작합니다.
- `npm run android`: Android 에뮬레이터에서 앱을 실행합니다.
- `npm run ios`: iOS 시뮬레이터에서 앱을 실행합니다.
- `npm run web`: 웹에서 앱을 실행합니다.
- `npm run lint`: 코드 린트를 실행합니다.
- `npm run lint:fix`: 린트 오류를 자동으로 수정합니다.
- `npm run format`: 코드를 포맷팅합니다.
- `npm run format:check`: 코드 포맷팅을 확인합니다.
- `npm run type:check`: TypeScript 타입 체크를 수행합니다.
- `npm test`: Jest를 사용하여 테스트를 실행합니다.
- `npm run test:watch`: Jest를 사용하여 테스트를 감시 모드로 실행합니다.
- `npm run test:coverage`: Jest를 사용하여 테스트 커버리지를 확인합니다.
- `npm run reset-project`: 프로젝트를 초기화합니다.
- `npm run build:android`: Android APK를 빌드합니다.
- `npm run build:ios`: iOS 앱을 빌드합니다.

## 🔧 주요 개발 도구 및 설정

- 테스트
  - TypeScript
  - Jest
  - React Native Testing Library
- 코드 포맷팅
  - ESLint
  - Prettier
- 라우팅
  - React Navigation
- 네트워크
  - Axios
- 상태 관리
  - React-query
  - React-hook-form
  - zustand

## 🤝 커밋 메시지 규칙

커밋 메시지는 다음과 같은 형식을 따라야 합니다:

```
<타입>(<범위>): <설명>

예시 : feat(Button): 버튼 컴포넌트 추가
```

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 수정
- **style**: 코드 포맷팅, 세미콜론 누락 등 (기능 변화 X)
- **refactor**: 코드 리팩토링 (기능 변화 X)
- **test**: 테스트 추가 또는 수정
- **chore**: 빌드 업무 수정, 패키지 매니저 설정 등

## 기능

- **탭 탐색**: 하단 탭을 통해 다양한 화면으로 탐색할 수 있습니다.
- **푸시 알림**: 사용자에게 푸시 알림을 보낼 수 있습니다.
- **오프라인 지원**: 오프라인에서도 앱을 사용할 수 있습니다.

## 참고

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
- [file-based routing](https://docs.expo.dev/router/introduction).
