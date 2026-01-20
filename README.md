# 🎤 글로벌노마드 (Global Nomad)

> 캘린더와 지도 뷰를 활용해 예약 가능한 날짜를 설정하고, 체험 상품을 예약하는 웹 어플리케이션

## 🌟 프로젝트 소개

글로벌노마드(Global Nomad)는  
체험형 여행 상품을 쉽고 직관적으로 예약할 수 있도록 돕는 웹 애플리케이션입니다.

캘린더와 지도 기반 UI를 통해  
사용자는 예약 가능한 날짜를 한눈에 확인하고,  
원하는 체험 상품을 선택하여 간편하게 예약할 수 있습니다.

본 프로젝트는 실제 서비스 흐름을 고려한  
**예약 시스템 설계**, **상태 관리**, **공통 컴포넌트화**를 목표로 하여  
팀 협업을 통해 구현되었습니다. 



## 🗓️ 프로젝트 기간

2025/12/20 (토) ~ 2025/01/19 (월)

## ✨ 주요 기능

- **체험 상품 탐색**
  - 메인 페이지에서 체험 상품 리스트 조회
  - 지도 뷰를 통해 체험 위치를 직관적으로 확인

- **캘린더 기반 예약 시스템**
  - 캘린더 UI로 예약 가능한 날짜 및 시간 확인
  - 선택한 일정에 따라 체험 예약 진행

- **체험 상세 페이지**
  - 체험 상세 정보(설명, 가격, 위치, 일정) 제공
  - 예약 가능 일정 확인 및 예약 플로우 연결

- **예약 및 예약 내역 관리**
  - 체험 예약 신청 기능
  - 예약 상태(대기, 승인, 취소, 완료)에 따른 예약 내역 관리

- **체험 등록 기능**
  - 체험 제공자를 위한 체험 상품 등록
  - 일정, 가격, 인원 등 체험 정보 설정

- **회원 인증 및 내정보 관리**
  - 로그인 기능을 통한 사용자 인증
  - 내정보 페이지에서 사용자 정보 및 예약 내역 확인

- **공통 컴포넌트 기반 UI 설계**
  - Button, Input, Modal 등 공통 컴포넌트 분리
  - 재사용성과 유지보수를 고려한 UI 구조 설계


## 🌐 배포 주소

➡️ [GlobalNomad](https://github.com/5team-gn/GlobalNomad)

## 🛠 기술 스택

| 구분                | 사용 기술                                                                                                                                                                                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**        | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=white) |
| **Styling**         | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)                                                                                                                                                                                                |
| **서버 상태 관리**  | ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)                                                                                                                                                                                                  |
| **HTTP 클라이언트** | ![axios](https://img.shields.io/badge/axios-API-blue)                                                                                                                                                                                                                                                               |
| **Routing**         | Next.js (App Router)                                                                                                                                                                                                                                                                                                 |
| **배포**            | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel)                                                                                                                                                                                                                                 |
| **협업**            | ![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion) |                                                                                                                          |

## 🚀 시작하기

### 필수 조건

- Node.js 18.0 이상
- npm

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/5team-gn/GlobalNomad.git

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 📁 프로젝트 구조

```bash
GLOBALNOMAD
 ┣ app/                 # Next.js App Router 기반 페이지 및 레이아웃
 ┣ components/          # 공통 UI 컴포넌트
 ┣ feature/             # 도메인(기능) 단위 컴포넌트 및 로직
 ┣ hooks/               # 공통 커스텀 훅
 ┣ adapters/            # API 응답 → 프론트엔드 데이터 변환 로직
 ┣ lib/                 # API 설정, 공통 라이브러리
 ┣ constants/           # 전역 상수 관리
 ┣ types/               # TypeScript 타입 정의
 ┣ utils/               # 공통 유틸 함수
 ┣ style/               # 전역 스타일 및 스타일 설정
 ┣ public/              # 정적 리소스
 ┣ Mocks/               # 목 데이터
 ┗ .env.local           # 환경 변수
```

## 🔗 API 문서

- **Swagger UI**: https://sp-globalnomad-api.vercel.app/docs/#/


## 🎯 주요 페이지

### 메인 페이지

<img width="1679" height="849" alt="메인로그인x" src="https://github.com/user-attachments/assets/eb7ba205-fc13-4997-9303-60f8d28042c5" />


### 로그인 페이지
<img width="1149" height="828" alt="로그인페이지" src="https://github.com/user-attachments/assets/8f00cc7c-6ce8-414f-b8d1-6e21e2d2bead" />


### 체험 상세 페이지
<img width="1592" height="946" alt="예약 상세1" src="https://github.com/user-attachments/assets/1d275664-7e81-402d-bec6-4f7fd8a9e726" />


### 내정보 페이지

<img width="1603" height="742" alt="내정보페이지" src="https://github.com/user-attachments/assets/f007fd28-fc67-452b-9cc3-7c2af37034bb" />


### 체험등록 페이지
<img width="1679" height="943" alt="체험등록페이지" src="https://github.com/user-attachments/assets/7d373a90-f4f9-4aae-b9bf-c4883f16fd2f" />




## 👥 팀원

| 김재승 | 배정민 | 최희락 | 황태우 | 선기훈 |
| --- | --- | --- | --- | --- |
| <img src="https://github.com/Sseung22.png" width="100" alt="김재승" /> | <img src="https://github.com/baejm.png" width="100" alt="배정민" /> | <img src="https://github.com/Greensod-96.png" width="100" alt="최희락" /> | <img src="https://github.com/taewoo26.png" width="100" alt="황태우" /> | <img src="https://github.com/seongihun.png" width="100" alt="선기훈" /> |
| [김재승](https://github.com/Sseung22) | [배정민](https://github.com/baejm) | [최희락](https://github.com/Greensod-96) | [황태우](https://github.com/taewoo26) | [선기훈](https://github.com/seongihun) |

## 🏷️역할

🖥️ **김재승**

- **공통 컴포넌트**
  - 공통 Header 컴포넌트 구현
  - 공통 Footer 컴포넌트 구현


- **로그인 페이지**
  - 로그인 페이지 구현

- **배포**

- **발표 및 발표 자료 제작**

🖥️ **배정민**

- **전역 세팅**
- axios 인스턴스 세팅
- 인증/토큰 및 헤더 동기화
- Header 알림 기능 및 ui 세팅
- 리엑트 쿼리 전역 세팅
- kakao 지도 구현 
- 로딩 ux 개선

- **공통 컴포넌트**
  - 공통 Card 컴포넌트 구현

- **체험 상세 페이지**
 - 체험 상세 UI 및 기능 구현
 - 예약 상태(`대기 / 승인 / 취소 / 완료`)를 기준으로 한 도메인 상태 관리
 - 예약 모달 → 예약 확정 → 예약 내역 반영까지의 예약 플로우 설계
 - React Query를 활용한 예약 데이터 캐싱 및 상태 변경 시 자동 동기화 처리
 - 캘린더 UI 구현을 통한 예약 가능 일정 시각화

🖥️ **최희락**

- **전역 세팅 / 인프라**
  - AuthProvider 기반 전역 인증 상태 관리 및 초기화 처리
  - 스크롤 잠금 기능 구현
  - ToastProvider 전역 세팅 및 공통 유틸 구성

- **공통 컴포넌트**
  - 공통 Input 컴포넌트 설계 및 구현

- **내정보(MyInfo) 페이지**
  - 내정보 페이지 UI 및 사용자 정보 조회·수정 기능 구현

- **예약내역(ReservationView) 페이지**
  - 예약내역 페이지 UI 및 기능 전반 구현
  - 예약/리뷰 타입 정의 및 API 응답 매핑 구조 정리
  - 예약 관련 커스텀 훅 및 상태 관리 구성
  - 인피니티 스크롤 도입 및 성능/안정성 개선
  - 필터 전환 및 Empty 상태 처리 로직 안정화

🖥️ **황태우**

- **공통 컴포넌트**
  - 공통 Modal 컴포넌트 구현

- **체험 등록 페이지**
  - 체험 등록 페이지 구현
 
- **랜딩 페이지**
  - 랜딩 페이지 구현
 
🖥️ **선기훈**

- **전역 세팅**

- 컬러 토큰, 텍스트 토큰 세팅

- **공통 컴포넌트**
  - 공통 Button 컴포넌트 시스템 구축
  - 공통 컴포넌트/코드 정리 및 리팩토링

- **예약 페이지**
  - App 라우트 기본 layout 
  - 내 정보 페이지 spa 구현 및 사이드 바 
  - 에약 모달 구현 
  **내 체험관리 페이지**
  - 내 체험관리 페이지 구현
  - 내 체험 등록 및 수정 페이지 구현
  **예약 현황 페이지**
  - 예약 현황 페이지 구현
  - 예약 플로우 로직 구현
  - 예약 관련 API 연동

  
## 🎓 학습 포인트

- **React 컴포넌트 설계**: 재사용 가능한 컴포넌트 개발
- **팀 협업**: Git 브랜치 전략 및 코드 리뷰 프로세스
- **SDK 활용**: 예약 시스템, 지도 기능, UI/UX 개선에 SDK 활용을 통해 복잡한 기능을 구현해보고자 하는 개발

## 📜 라이센스

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 감사의 글

이 프로젝트는 **코드잇 스프린트 Front-End 19기** 교육 과정의 팀 프로젝트로 제작되었습니다.
