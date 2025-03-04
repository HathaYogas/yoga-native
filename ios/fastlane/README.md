# iOS TestFlight 배포 가이드

## 사전 준비사항

### 1. 환경 설정
- Node.js 설치
- Ruby 설치 (fastlane 요구사항)
- Xcode 최신 버전 설치
- Apple Developer Program 가입

### 2. Expo에서 Native 프로젝트 생성
```bash
# Expo 프로젝트 eject
expo eject
```

### 3. 필요한 파일 준비
1. 환경 변수 파일 (.env)
   - 노션 페이지 [비공개 문서]에서 환경 변수 확인
   - ios/ 디렉토리에 .env 파일 생성 및 값 복사

2. 인증서 및 프로비저닝 프로파일
   - fastlane match 저장소 접근 권한 필요
   - GitHub Personal Access Token 준비

## 설치 및 초기 설정

### 1. fastlane 설치
```bash
# ios 디렉토리로 이동
cd ios

# fastlane 설치
brew install fastlane

# 또는 gem을 통한 설치
gem install fastlane
```

### 2. fastlane 초기화
```bash
fastlane init
```

### 3. match 설정
```bash
fastlane match init
```

## TestFlight 배포 프로세스

### 1. 인증서 및 프로비저닝 프로파일 동기화
```bash
# App Store 배포용 프로파일 동기화
fastlane match appstore
```

### 2. 버전 관리
- ios/yoganative.xcodeproj/project.pbxproj 에서 버전 확인
- 필요시 버전 업데이트

### 3. TestFlight 배포
```bash
# beta 레인 실행
fastlane beta
```

## 문제 해결

### 일반적인 오류

1. "Could not find certificate" 또는 "Could not find profile"
   - match 재실행으로 해결
   ```bash
   fastlane match appstore --force
   ```

2. Xcode 빌드 오류
   - Pod 재설치
   ```bash
   pod deintegrate
   pod install
   ```

### 주의사항

1. 환경 변수
   - .env 파일이 올바른 위치에 있는지 확인
   - 모든 필수 환경 변수가 설정되어 있는지 확인

2. 인증서 관리
   - match 저장소의 접근 권한 확인
   - match passphrase 확인

3. 빌드 번호
   - 이전 빌드보다 높은 번호인지 확인
   - TestFlight에 이미 업로드된 버전 확인

## 유용한 명령어

```bash
# fastlane 환경 확인
fastlane env

# 특정 레인 상세 정보 확인
fastlane lanes

# 인증서 목록 확인
fastlane match list
```

## 참고 자료

- [Fastlane 공식 문서](https://docs.fastlane.tools)
- [Match 설정 가이드](https://docs.fastlane.tools/actions/match/)
- [TestFlight 가이드](https://developer.apple.com/testflight/)