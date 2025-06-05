# 여행사 CRM 프로젝트 폴더 구조

```
travel-crm/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/           # 재사용 가능한 컴포넌트
│   │   ├── ui/              # 기본 UI 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts
│   │   ├── layout/          # 레이아웃 컴포넌트
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
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── customers/       # 고객 관리 페이지
│   │   │   ├── CustomerList.tsx
│   │   │   ├── CustomerDetail.tsx
│   │   │   ├── CustomerCreate.tsx
│   │   │   └── index.ts
│   │   ├── schedules/       # 일정 관리 페이지
│   │   │   ├── ScheduleList.tsx
│   │   │   ├── ScheduleDetail.tsx
│   │   │   ├── ScheduleCreate.tsx
│   │   │   └── index.ts
│   │   ├── dashboard/       # 대시보드
│   │   │   ├── Dashboard.tsx
│   │   │   ├── StatCards.tsx
│   │   │   └── index.ts
│   │   └── auth/           # 인증 페이지
│   │       ├── Login.tsx
│   │       ├── Register.tsx
│   │       └── index.ts
│   ├── hooks/              # 커스텀 훅
│   │   ├── useKeyboard.ts  # 키보드 단축키 훅
│   │   ├── useCustomers.ts # 고객 관리 훅
│   │   ├── useSchedules.ts # 일정 관리 훅
│   │   └── index.ts
│   ├── services/           # API 서비스
│   │   ├── api.ts          # API 기본 설정
│   │   ├── customers.ts    # 고객 API
│   │   ├── schedules.ts    # 일정 API
│   │   └── auth.ts         # 인증 API
│   ├── types/              # TypeScript 타입 정의
│   │   ├── customer.ts
│   │   ├── schedule.ts
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
- **ui/**: 기본 UI 컴포넌트 (Button, Input 등)
- **layout/**: 레이아웃 관련 컴포넌트
- **forms/**: 폼 관련 컴포넌트
- **common/**: 공통으로 사용되는 컴포넌트

### `src/pages/`
- 각 기능별로 폴더 분리
- 페이지별 컴포넌트와 하위 컴포넌트 포함

### `src/hooks/`
- 커스텀 훅 모음
- 비즈니스 로직과 UI 분리

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
      colors: {
        primary: '#1890ff',
        secondary: '#722ed1',
      }
    },
  },
  plugins: [],
}
```


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
