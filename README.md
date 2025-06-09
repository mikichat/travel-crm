# 🧳 소규모 여행사 CRM 시스템

React + TypeScript + Vite + MariaDB 기반의 소규모 여행사 맞춤 일정 및 견적 관리 시스템입니다.

## 🏗 기술 스택

| 구분       | 기술                                    |
|------------|----------------------------------------|
| 프론트엔드 | React, TypeScript, Vite, Tailwind CSS |
| 백엔드     | Node.js + Express + TypeScript        |
| 데이터베이스 | MariaDB, Axios                       |
| 개발 도구  | Cursor, VSCode, Git                   |

## 📁 프로젝트 구조

```
travel-crm/
├── 📁 backend/                          # 백엔드 서버
│   ├── 📁 src/
│   │   ├── 📁 config/                   # 데이터베이스 설정
│   │   │   ├── create.sql              # 데이터베이스 스키마
│   │   │   └── db.ts                   # 데이터베이스 연결 설정
│   │   ├── 📁 controllers/             # 컨트롤러
│   │   │   └── index.ts                # 컨트롤러 인덱스
│   │   ├── 📁 models/                  # 데이터 모델
│   │   │   └── user.ts                 # 사용자 모델
│   │   ├── 📁 routes/                  # API 라우트
│   │   │   └── index.ts                # 라우트 인덱스
│   │   └── app.ts                      # Express 앱 설정
│   ├── package.json                    # 백엔드 의존성
│   ├── package-lock.json
│   └── tsconfig.json                   # TypeScript 설정
│
├── 📁 src/                             # 프론트엔드 소스 코드
│   ├── 📁 assets/                      # 정적 자산
│   │   └── react.svg                   # React 로고
│   ├── 📁 components/                  # 재사용 가능한 컴포넌트
│   │   ├── 📁 layout/                  # 레이아웃 컴포넌트
│   │   │   ├── Header.tsx              # 헤더 컴포넌트
│   │   │   ├── MainLayout.tsx          # 메인 레이아웃
│   │   │   └── Sidebar.tsx             # 사이드바 컴포넌트
│   │   └── 📁 ui/                      # UI 컴포넌트
│   │       ├── Button.tsx              # 버튼 컴포넌트
│   │       ├── Card.tsx                # 카드 컴포넌트
│   │       ├── Input.tsx               # 입력 컴포넌트
│   │       └── SectionCard.tsx         # 섹션 카드 컴포넌트
│   ├── 📁 hooks/                       # 커스텀 훅
│   │   ├── useCustomers.ts             # 고객 관련 훅
│   │   ├── useReservations.ts          # 예약 관련 훅
│   │   └── useSchedules.ts             # 일정 관련 훅
│   ├── 📁 pages/                       # 페이지 컴포넌트
│   │   ├── 📁 customers/               # 고객 관리 페이지
│   │   │   ├── CustomerCreate.tsx      # 고객 생성 페이지
│   │   │   ├── CustomerDetail.tsx      # 고객 상세 페이지
│   │   │   ├── CustomerList.tsx        # 고객 목록 페이지
│   │   │   └── index.ts                # 페이지 인덱스
│   │   ├── 📁 dashboard/               # 대시보드 페이지
│   │   │   ├── Dashboard.tsx           # 대시보드 컴포넌트
│   │   │   └── index.ts                # 페이지 인덱스
│   │   ├── 📁 reservations/            # 예약 관리 페이지
│   │   │   ├── ReservationCreate.tsx   # 예약 생성 페이지
│   │   │   ├── ReservationDetail.tsx   # 예약 상세 페이지
│   │   │   ├── ReservationEdit.tsx     # 예약 수정 페이지
│   │   │   ├── ReservationList.tsx     # 예약 목록 페이지
│   │   │   └── index.ts                # 페이지 인덱스
│   │   └── 📁 schedules/               # 일정 관리 페이지
│   │       ├── ScheduleCreate.tsx      # 일정 생성 페이지
│   │       ├── ScheduleDetail.tsx      # 일정 상세 페이지
│   │       ├── ScheduleEdit.tsx        # 일정 수정 페이지
│   │       ├── ScheduleList.tsx        # 일정 목록 페이지
│   │       └── index.ts                # 페이지 인덱스
│   ├── 📁 types/                       # TypeScript 타입 정의
│   │   ├── customer.ts                 # 고객 타입
│   │   ├── reservation.ts              # 예약 타입
│   │   └── schedule.ts                 # 일정 타입
│   ├── App.css                         # 앱 스타일
│   ├── App.tsx                         # 메인 앱 컴포넌트
│   ├── index.css                       # 글로벌 스타일
│   ├── main.tsx                        # 앱 진입점
│   └── vite-env.d.ts                   # Vite 타입 정의
│
├── 📁 public/                          # 정적 파일
│   └── vite.svg                        # Vite 로고
│
├── 📁 .cursor/                         # Cursor IDE 설정
├── 📁 .git/                            # Git 저장소
├── 📁 .git_/                           # Git 관련 파일
├── 📁 .vscode/                         # VS Code 설정
├── 📁 node_modules/                    # 의존성 모듈
│
├── .cursorignore                       # Cursor 무시 파일
├── .cursorrules                        # Cursor 규칙
├── .gitattributes                      # Git 속성
├── .gitignore                          # Git 무시 파일
├── .gitignore-                         # 추가 Git 무시 파일
├── eslint.config.js                    # ESLint 설정
├── index.html                          # HTML 템플릿
├── LICENSE                             # 라이선스
├── package.json                        # 프로젝트 의존성
├── package-lock.json                   # 의존성 잠금 파일
├── package - 복사본.json               # 패키지 복사본
├── postcss.config.cjs                  # PostCSS 설정
├── README.md                           # 프로젝트 문서
├── tailwind.config.js                  # Tailwind CSS 설정
├── tsconfig.app.json                   # 앱 TypeScript 설정
├── tsconfig.json                       # 루트 TypeScript 설정
├── tsconfig.node.json                  # Node.js TypeScript 설정
└── vite.config.ts                      # Vite 설정
```

## 📂 주요 디렉토리 설명

### `src/components/`
- **layout/**: 레이아웃 관련 컴포넌트 (Header, MainLayout, Sidebar)
- **ui/**: 기본 UI 컴포넌트 (Button, Card, Input, SectionCard)

### `src/pages/`
- **customers/**: 고객 관리 페이지 (목록, 상세, 생성)
- **schedules/**: 일정 관리 페이지 (목록, 상세, 생성, 수정)
- **reservations/**: 예약 관리 페이지 (목록, 생성, 상세, 수정)
- **dashboard/**: 대시보드 및 통계 페이지

### `src/hooks/`
- **useCustomers.ts**: 고객 관리 CRUD 훅
- **useSchedules.ts**: 일정 관리 CRUD 훅 (수정 기능 포함)
- **useReservations.ts**: 예약 관리 CRUD 훅

### `src/types/`
- **customer.ts**: 고객 관련 타입
- **schedule.ts**: 일정 관련 타입
- **reservation.ts**: 예약 관련 타입

### `backend/src/`
- **config/**: 데이터베이스 설정 및 스키마
- **controllers/**: API 컨트롤러
- **models/**: 데이터 모델
- **routes/**: API 라우트 정의

## 📝 명명 규칙

### 파일명 규칙
- **컴포넌트**: PascalCase (`CustomerList.tsx`)
- **훅**: camelCase (`useCustomers.ts`)
- **유틸리티**: camelCase (`formatters.ts`)
- **타입**: camelCase (`customer.ts`)

### 폴더명 규칙
- **kebab-case** 또는 **camelCase** 일관성 유지
- 기능별 그룹핑

## ⚙️ 환경 설정

### `.env` 파일 예시
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_APP_NAME=Travel CRM
```

### Tailwind CSS 설정
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [],
}
```

## 🎨 UI 프레임워크: Tailwind CSS

이 프로젝트는 **Tailwind CSS**를 주요 UI 프레임워크로 사용하여 세련되고 일관된 사용자 경험을 제공합니다.

### 주요 특징
- **설치된 패키지**: `tailwindcss`
- **테마**: 바이올렛 계열 커스텀 테마 적용
- **그리드 시스템**: 기본 제공

### 주요 변경 사항
- `src/main.tsx`: Tailwind CSS 임포트 (`tailwindcss/tailwind.css`)
- `src/components/ui/`: Button, Input, Card 등 Tailwind CSS 기반 재작성
- `src/components/layout/`: Header, MainLayout Tailwind CSS Layout 사용
- `src/pages/`: 모든 페이지 Tailwind CSS 컴포넌트 활용
- `src/hooks/useSchedules.ts`: 일정 수정(`updateSchedule`) 기능 추가
- `src/pages/schedules/ScheduleEdit.tsx`: 새로운 일정 수정 페이지 추가

## 🔧 개발 가이드

### 데이터베이스 연동
- MariaDB와의 연동은 백엔드(Node.js + Express)에서 API를 통해 처리
- 프론트엔드에서는 Axios를 사용하여 API 호출

### 스타일링 주의사항
> **참고**: `src/App.css` 파일에 불필요한 스타일이 포함되어 있을 수 있습니다. 
> UI가 예상대로 작동하지 않는다면, `src/App.css` 파일을 열어 다음 세 줄만 남기고 모든 내용을 삭제하는 것을 권장합니다:
> ```css
> @tailwind base;
> @tailwind components; 
> @tailwind utilities;
> ```

## 🚀 시작하기

### 📋 사전 요구사항

- **Node.js**: 18.0.0 이상
- **npm**: 9.0.0 이상
- **MariaDB/MySQL**: 데이터베이스 서버
- **Git**: 버전 관리

### 🔧 프론트엔드 실행 (React + Vite)

1. **프로젝트 루트로 이동**
```bash
cd travel-crm
```

2. **의존성 설치**
```bash
npm install
```

3. **환경변수 설정** (선택사항)
```bash
# .env 파일 생성 (필요한 경우)
echo "VITE_API_URL=http://localhost:3001/api" > .env
```

4. **개발 서버 실행**
```bash
npm run dev
```

5. **브라우저에서 확인**
- 프론트엔드: http://localhost:5173
- Vite 개발 서버가 자동으로 실행됩니다

### 🔧 백엔드 실행 (Node.js + Express + SQLite)

1. **백엔드 디렉토리로 이동**
```bash
cd backend
```

2. **의존성 설치**
```bash
npm install
```

3. **환경변수 설정** (선택사항)
```bash
# .env 파일 생성 (필요한 경우)
echo "PORT=3001" > .env
```

4. **백엔드 서버 실행**
```bash
npm start
```

5. **API 서버 확인**
- 백엔드: http://localhost:3001
- API 엔드포인트: http://localhost:3001/api
- 상태 확인: http://localhost:3001/api/health

### 🗄️ 데이터베이스 (SQLite)

이 프로젝트는 **SQLite**를 사용하여 간단하고 빠른 설정을 제공합니다.

**SQLite 장점:**
- ✅ **설치 불필요**: 별도 데이터베이스 서버 설치 없음
- ✅ **파일 기반**: `data/travel_crm.db` 파일 하나로 모든 데이터 관리
- ✅ **자동 초기화**: 서버 시작 시 자동으로 테이블 생성
- ✅ **Zero Configuration**: 설정 파일만 있으면 바로 사용

**데이터베이스 파일 위치:**
```
backend/data/travel_crm.db
```

**자동 생성되는 테이블:**
- `users` - 사용자 정보
- `customers` - 고객 정보  
- `schedules` - 일정 정보
- `reservations` - 예약 정보

### 🚀 전체 애플리케이션 실행

**터미널 1 (백엔드)**
```bash
cd backend
npm install
npm start
```

**터미널 2 (프론트엔드)**
```bash
cd travel-crm
npm install
npm run dev
```

### 📝 주요 스크립트

#### 프론트엔드 스크립트
```bash
npm run dev          # 개발 서버 실행 (Vite)
npm run build        # 프로덕션 빌드
npm run lint         # ESLint 검사
npm run lint:fix     # ESLint 자동 수정
npm run type-check   # TypeScript 타입 검사
```

#### 백엔드 스크립트
```bash
npm start            # 개발 서버 실행 (ts-node)
npm test             # 테스트 실행
```

### 🔍 문제 해결

#### 프론트엔드 문제
- **포트 충돌**: `npm run dev -- --port 3000` (다른 포트 사용)
- **의존성 문제**: `rm -rf node_modules package-lock.json && npm install`
- **TypeScript 오류**: `npm run type-check`로 타입 검사

#### 백엔드 문제
- **데이터베이스 연결 실패**: `.env` 파일의 데이터베이스 설정 확인
- **포트 충돌**: `PORT=3002 npm start` (다른 포트 사용)
- **TypeScript 컴파일 오류**: `npx tsc --noEmit`로 타입 검사

### 🌐 접속 정보

- **프론트엔드**: http://localhost:5173
- **백엔드 API**: http://localhost:3001
- **API 문서**: http://localhost:3001/api (개발 중)

## 📋 주요 기능

- 👥 **고객 관리**: 고객 정보 등록, 수정, 조회
- 📅 **일정 관리**: 여행 일정 생성, 수정, 관리
- 🎫 **예약 관리**: 예약 생성, 수정, 상태 관리
- 📊 **대시보드**: 통계 및 현황 조회
- 🔐 **인증**: 로그인, 회원가입# 자동 push 테스트
