## 프로젝트 개요

# 💻 React + TypeScript + Vite + MariaDB 개발 규칙

# React 프론트엔드에서는 이 API를 호출하여 데이터를 주고받는 방식

# UI Ant Design 프레임워크 사용 (기존 Tailwind CSS에서 전환)

# MariaDB와의 연동은 백엔드(Node.js + Express 등)에서 API


# 여행사 CRM 프로젝트 폴더 구조

```
travel-crm/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/           # 재사용 가능한 컴포넌트
│   │   ├── ui/              # 기본 UI 컴포넌트 (Ant Design 기반)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts
│   │   ├── layout/          # 레이아웃 컴포넌트 (Ant Design 기반)
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   └── index.ts
│   │   ├── forms/           # 폼 관련 컴포넌트
│   │   │   ├── CustomerForm.tsx
│   │   │   ├── ScheduleForm.tsx
│   │   │   └── index.ts
│   │   └── common/          # 공통 컴포넌트
│   │       ├── Loading.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── index.ts
│   ├── pages/               # 페이지 컴포넌트 (Ant Design 기반)
│   │   ├── customers/       # 고객 관리 페이지
│   │   │   ├── CustomerList.tsx
│   │   │   ├── CustomerDetail.tsx
│   │   │   ├── CustomerCreate.tsx
│   │   │   └── index.ts
│   │   ├── schedules/       # 일정 관리 페이지
│   │   │   ├── ScheduleList.tsx
│   │   │   ├── ScheduleDetail.tsx
│   │   │   ├── ScheduleCreate.tsx
│   │   │   ├── ScheduleEdit.tsx # 새로 추가됨
│   │   │   └── index.ts
│   │   ├── dashboard/       # 대시보드
│   │   │   ├── Dashboard.tsx
│   │   │   ├── StatCards.tsx
│   │   │   └── index.ts
│   │   ├── reservations/    # 예약 관리 페이지
│   │   │   ├── ReservationList.tsx
│   │   │   ├── ReservationCreate.tsx
│   │   │   ├── ReservationDetail.tsx
│   │   │   ├── ReservationEdit.tsx
│   │   │   └── index.ts
│   │   └── auth/           # 인증 페이지
│   │       ├── Login.tsx
│   │       ├── Register.tsx
│   │       └── index.ts
│   ├── hooks/              # 커스텀 훅
│   │   ├── useKeyboard.ts  # 키보드 단축키 훅
│   │   ├── useCustomers.ts # 고객 관리 훅
│   │   ├── useSchedules.ts # 일정 관리 훅
│   │   ├── useReservations.ts # 예약 관리 훅 (기존)
│   │   └── index.ts
│   ├── services/           # API 서비스
│   │   ├── api.ts          # API 기본 설정
│   │   ├── customers.ts    # 고객 API
│   │   ├── schedules.ts    # 일정 API
│   │   └── auth.ts         # 인증 API
│   ├── types/              # TypeScript 타입 정의
│   │   ├── customer.ts
│   │   ├── schedule.ts
│   │   ├── reservation.ts # 예약 타입 (기존)
│   │   ├── api.ts
│   │   └── index.ts
│   ├── utils/              # 유틸리티 함수
│   │   ├── constants.ts    # 상수
│   │   ├── formatters.ts   # 포맷터 함수
│   │   ├── validators.ts   # 유효성 검사
│   │   └── helpers.ts      # 헬퍼 함수
│   ├── store/              # 상태 관리 (옵션)
│   │   ├── index.ts
│   │   ├── customerStore.ts
│   │   └── authStore.ts
│   ├── styles/             # 스타일 파일
│   │   ├── globals.css
│   │   ├── components.css
│   │   └── antd-overrides.css
│   ├── assets/             # 정적 자원
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── .env                    # 환경변수
├── .env.local             # 로컬 환경변수
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 주요 폴더 설명

### `src/components/`
- **ui/**: 기본 UI 컴포넌트 (Button, Input 등) - **Ant Design 기반으로 교체됨**
- **layout/**: 레이아웃 관련 컴포넌트 - **Ant Design 기반으로 교체됨**
- **forms/**: 폼 관련 컴포넌트
- **common/**: 공통으로 사용되는 컴포넌트

### `src/pages/`
- 각 기능별로 폴더 분리 - **모든 페이지 Ant Design 기반으로 업데이트됨**
- 페이지별 컴포넌트와 하위 컴포넌트 포함

### `src/hooks/`
- 커스텀 훅 모음
- 비즈니스 로직과 UI 분리
- `useReservations.ts`에 예약 관리 CRUD 훅 구현 (기존)
- `useSchedules.ts`에 일정 관리 CRUD 훅 구현 (수정 기능 추가)

### `src/services/`
- API 호출 관련 함수들
- 백엔드와의 통신 로직

### `src/types/`
- TypeScript 타입 정의
- 데이터 모델 타입

### `src/utils/`
- 유틸리티 함수들
- 상수, 포맷터, 검증 함수 등

## 명명 규칙

### 파일명
- **컴포넌트**: PascalCase (CustomerList.tsx)
- **훅**: camelCase (useCustomers.ts)
- **유틸리티**: camelCase (formatters.ts)
- **타입**: camelCase (customer.ts)

### 폴더명
- **kebab-case** 또는 **camelCase** 일관성 유지
- 기능별 그룹핑

## 설정 파일 구성

### `.env` 파일
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_APP_NAME=Travel CRM
```

### `tailwind.config.js`
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
    }
  },
  plugins: [],
}
```

### UI 프레임워크 변경: Ant Design 도입
이 프로젝트는 기존 Tailwind CSS에서 Ant Design으로 UI 프레임워크를 전환하여 더욱 세련되고 강력한 사용자 경험을 제공합니다.

- **설치된 패키지**: `antd`
- **적용된 스타일**: 바이올렛 계열의 커스텀 테마가 적용되었습니다.
- **주요 변경 사항**: 
    - `src/main.tsx`: Ant Design 기본 CSS 임포트 (`antd/dist/reset.css`)
    - `src/components/ui/`: `Button`, `Input`, `Card`, `SectionCard` 컴포넌트가 Ant Design 기반으로 재작성되었습니다.
    - `src/components/layout/`: `Header`와 `MainLayout` 컴포넌트가 Ant Design `Layout` 및 `Menu` 컴포넌트를 사용하여 업데이트되었습니다.
    - `src/pages/`: 모든 고객, 일정, 예약, 대시보드 페이지가 Ant Design 컴포넌트를 활용하도록 업데이트되었습니다.
    - `src/hooks/useSchedules.ts`: 일정 수정(`updateSchedule`) 기능이 추가되었습니다.
    - `src/pages/schedules/ScheduleEdit.tsx`: 새로운 일정 수정 페이지가 추가되고 라우팅에 연결되었습니다.
    - `tailwind.config.js`: Ant Design 사용에 따라 Tailwind CSS의 커스텀 컬러 정의가 제거되었습니다.
    - **참고**: `src/App.css` 파일은 여전히 불필요한 스타일을 포함하고 있을 수 있습니다. UI가 예상대로 작동하지 않는다면, `src/App.css` 파일을 열어 `@tailwind base; @tailwind components; @tailwind utilities;` 세 줄만 남기고 모든 내용을 수동으로 삭제하는 것을 권장합니다.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
