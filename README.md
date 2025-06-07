# 🧳 소규모 여행사 CRM 시스템

React + TypeScript + Vite + MariaDB 기반의 소규모 여행사 맞춤 일정 및 견적 관리 시스템입니다.

## 🏗 기술 스택

| 구분       | 기술                                    |
|------------|----------------------------------------|
| 프론트엔드 | React, TypeScript, Vite, Ant Design   |
| 백엔드     | Node.js + Express (또는 FastAPI)      |
| 데이터베이스 | MariaDB, Axios                       |
| 개발 도구  | Cursor, VSCode, Git                   |

## 📁 프로젝트 구조

```
travel-crm/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── ui/             # 기본 UI 컴포넌트 (Ant Design 기반)
│   │   ├── layout/         # 레이아웃 컴포넌트
│   │   ├── forms/          # 폼 관련 컴포넌트
│   │   └── common/         # 공통 컴포넌트
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── customers/      # 고객 관리
│   │   ├── schedules/      # 일정 관리
│   │   ├── reservations/   # 예약 관리
│   │   ├── dashboard/      # 대시보드
│   │   └── auth/          # 인증
│   ├── hooks/              # 커스텀 훅
│   ├── services/           # API 서비스
│   ├── types/              # TypeScript 타입 정의
│   ├── utils/              # 유틸리티 함수
│   ├── store/              # 상태 관리 (옵션)
│   ├── styles/             # 스타일 파일
│   └── assets/             # 정적 자원
├── .env                    # 환경변수
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 📂 주요 디렉토리 설명

### `src/components/`
- **ui/**: Ant Design 기반 기본 UI 컴포넌트 (Button, Input, Modal 등)
- **layout/**: 레이아웃 관련 컴포넌트 (Header, Sidebar, MainLayout)
- **forms/**: 폼 관련 컴포넌트 (CustomerForm, ScheduleForm 등)
- **common/**: 공통 컴포넌트 (Loading, ErrorBoundary 등)

### `src/pages/`
- **customers/**: 고객 관리 페이지 (목록, 상세, 생성)
- **schedules/**: 일정 관리 페이지 (목록, 상세, 생성, 수정)
- **reservations/**: 예약 관리 페이지 (목록, 생성, 상세, 수정)
- **dashboard/**: 대시보드 및 통계 페이지
- **auth/**: 로그인, 회원가입 페이지

### `src/hooks/`
- **useKeyboard.ts**: 키보드 단축키 관리
- **useCustomers.ts**: 고객 관리 CRUD 훅
- **useSchedules.ts**: 일정 관리 CRUD 훅 (수정 기능 포함)
- **useReservations.ts**: 예약 관리 CRUD 훅

### `src/services/`
- **api.ts**: API 기본 설정
- **customers.ts**: 고객 관련 API
- **schedules.ts**: 일정 관련 API
- **auth.ts**: 인증 관련 API

### `src/types/`
- **customer.ts**: 고객 관련 타입
- **schedule.ts**: 일정 관련 타입
- **reservation.ts**: 예약 관련 타입
- **api.ts**: API 응답 타입

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

## 🎨 UI 프레임워크: Ant Design

이 프로젝트는 **Ant Design**을 주요 UI 프레임워크로 사용하여 세련되고 일관된 사용자 경험을 제공합니다.

### 주요 특징
- **설치된 패키지**: `antd`
- **테마**: 바이올렛 계열 커스텀 테마 적용
- **그리드 시스템**: Ag-grid 사용

### 주요 변경 사항
- `src/main.tsx`: Ant Design CSS 임포트 (`antd/dist/reset.css`)
- `src/components/ui/`: Button, Input, Card 등 Ant Design 기반 재작성
- `src/components/layout/`: Header, MainLayout Ant Design Layout 사용
- `src/pages/`: 모든 페이지 Ant Design 컴포넌트 활용
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

1. 의존성 설치
```bash
npm install
```

2. 환경변수 설정
```bash
cp .env.example .env
```

3. 개발 서버 실행
```bash
npm run dev
```

## 📋 주요 기능

- 👥 **고객 관리**: 고객 정보 등록, 수정, 조회
- 📅 **일정 관리**: 여행 일정 생성, 수정, 관리
- 🎫 **예약 관리**: 예약 생성, 수정, 상태 관리
- 📊 **대시보드**: 통계 및 현황 조회
- 🔐 **인증**: 로그인, 회원가입