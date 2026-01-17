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


## 🌐 배포 주소

➡️ [GlobalNomad](https://github.com/5team-gn/GlobalNomad)

## 🛠 기술 스택

| 구분                | 사용 기술                                                                                                                                                                                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**        | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=white) |
| **Styling**         | ![Styled Components](https://img.shields.io/badge/Styled_Components-DB7093?style=flat&logo=styled-components&logoColor=white) ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)                                                                                         |
| **상태 관리**       | ![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat&logo=react&logoColor=white) ![localStorage](https://img.shields.io/badge/localStorage-✓-green)                                                                                                                                                    |
| **HTTP 클라이언트** | ![axios](https://img.shields.io/badge/axios-API-blue)                                                                                                                                                                                                                                                               |
| **Routing**         | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)                                                                                                                                                                                               |
| **배포**            | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel)                                                                                                                                                                                                                                 |
| **협업**            | ![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion)                                                                                                                          |

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


### 🚫NotFound 페이지

- 잘못된 경로로 접근했을 때, 에러를 안내하고 이전 또는 메인 페이지로 이동

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

- **공통 컴포넌트**
  - 공통 Card 컴포넌트 구현

- **체험 상세 페이지**
  - 체험 상세 페이지 구현

🖥️ **최희락**

- **공통 컴포넌트**
  - 공통 Input 컴포넌트 구현

- **내정보 페이지**
  - 내정보 페이지 구현
 
- **예약내역 페이지**
  - 예약내역 페이지 구현

🖥️ **황태우**

- **공통 컴포넌트**
  - 공통 Modal 컴포넌트 구현

- **체험 등록 페이지**
  - 체험 등록 페이지 구현
 
- **랜딩 페이지**
  - 랜딩 페이지 구현
 
🖥️ **선기훈**

- **공통 컴포넌트**
  - 공통 Button 컴포넌트 구현

- **예약 페이지**
  - 예약 페이지 구현
  **내 체험관리 페이지**
  - 내 체험관리 페이지 구현
  **예약 현황 페이지**
  - 예약 현황 페이지 구현

  
## 🎓 학습 포인트

- **React 컴포넌트 설계**: 재사용 가능한 컴포넌트 개발
- **팀 협업**: Git 브랜치 전략 및 코드 리뷰 프로세스
- **SDK 활용**: 예약 시스템, 지도 기능, UI/UX 개선에 SDK 활용을 통해 복잡한 기능을 구현해보고자 하는 개발

## 📜 라이센스

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 감사의 글

이 프로젝트는 **코드잇 스프린트 Front-End 19기** 교육 과정의 팀 프로젝트로 제작되었습니다.
