# HDH Fintech 기술 스택 명세서

> **작성일**: 2025-12-09
> **최종 수정**: 2025-12-09
> **버전**: v1.1
> **용도**: 프로젝트의 모든 기술 스택 및 버전 정의

---

## 📌 서비스 개요

**HDH Fintech 정체성:**
- HDH 솔루션 운영자를 위한 지원 플랫폼
- 월 10만원 구독료 (AI 자동화 프로그램 포함)
- 교육, 매뉴얼, 운영 관리 도구 제공

**HDH 솔루션 구조:**
- 84:16 구조 (챌린지 계좌 84% + 보험 계좌 16%)
- 10년 검증된 프롭펌 헤지 트레이딩 전략
- AI 자동화 프로그램 기반 운영

---

## 📋 목차

1. [프론트엔드](#1-프론트엔드)
2. [백엔드](#2-백엔드)
3. [AI 연동](#3-ai-연동)
4. [데이터베이스](#4-데이터베이스)
5. [인증 & 보안](#5-인증--보안)
6. [배포 & 인프라](#6-배포--인프라)
7. [개발 도구](#7-개발-도구)
8. [매뉴얼 & 콘텐츠 제공](#8-매뉴얼--콘텐츠-제공)
9. [버전 정책](#9-버전-정책)
10. [의존성 관리](#10-의존성-관리)
11. [환경 변수](#11-환경-변수)

---

## 1. 프론트엔드

### 1.1 프레임워크 & 라이브러리

| 기술 | 버전 | 용도 | 선정 이유 |
|------|------|------|-----------|
| **Next.js** | 14.x | React 프레임워크 | SSR, API Routes, 파일 기반 라우팅 |
| **React** | 18.x | UI 라이브러리 | 컴포넌트 기반 개발, 대규모 생태계 |
| **TypeScript** | 5.x | 타입 시스템 | 타입 안정성, 코드 품질 향상 |
| **Tailwind CSS** | 3.x | CSS 프레임워크 | 유틸리티 클래스, 빠른 스타일링 |

### 1.2 상태 관리

- **Context API** (React 내장) - 간단한 전역 상태
- **Zustand** (선택) - 복잡한 상태 관리 필요 시

### 1.3 폼 & 검증

- **React Hook Form** - 폼 상태 관리
- **Zod** - 스키마 검증 및 타입 추론

### 1.4 UI 컴포넌트

- **Custom Components** - 자체 제작 (HDH_DESIGN_SYSTEM.md 기준)
- **Headless UI** (선택) - 접근성 보장된 기본 컴포넌트
- **Font Awesome** - 아이콘 (CDN)

### 1.5 차트 & 시각화

- **Chart.js** - 손익 그래프, 통계 차트
- **Recharts** (선택) - 고급 차트 필요 시

### 1.6 마크다운 렌더링

- **next-mdx-remote** 또는 **remark** - 매뉴얼 콘텐츠 렌더링
- **Prism.js** 또는 **highlight.js** - 코드 하이라이팅

---

## 2. 백엔드

### 2.1 인프라

| 기술 | 버전 | 용도 | 선정 이유 |
|------|------|------|-----------|
| **Supabase** | Latest | BaaS (Backend as a Service) | DB + Auth + Storage + Realtime 올인원 |
| **PostgreSQL** | 15.x | 데이터베이스 | Supabase 내장, 안정적, 확장 가능 |
| **Node.js** | 20.x | JavaScript 런타임 | 서버 사이드 로직 실행 |

### 2.2 API

- **Next.js API Routes** - 서버리스 API 엔드포인트
- **Supabase Auto-generated REST API** - DB 직접 접근 (RLS로 보호)
- **RESTful API** 설계 원칙

### 2.3 실시간 통신

| 기술 | 버전 | 용도 | 구현 계획 |
|------|------|------|-----------|
| **Supabase Realtime** | Latest | DB 변경 실시간 동기화 | Phase 2 |
| **WebSocket** | - | 실시간 알림 (선택) | Phase 3 |

---

## 3. AI 연동

### 3.1 AI Chatbot (Sunny)

| 서비스 | 용도 | 구현 방식 | 우선순위 |
|--------|------|----------|----------|
| **OpenAI API (ChatGPT/GPT-4)** | Sunny 챗봇 | API 직접 연동 | 1순위 |
| **Google Gemini API** | Sunny 챗봇 | API 직접 연동 | 2순위 |
| **Perplexity API** | Sunny 챗봇 | API 직접 연동 | 3순위 |

### 3.2 AI 자동화 프로그램

- **Python** - AI 트레이딩 로직
- **Windows/Mac 실행 파일** - 사용자 로컬 실행
- **API 연동** - 프롭펌 계좌 연결

### 3.3 연동 방식

- **직접 API 호출** - Next.js API Routes에서 AI API 호출
- **스트리밍 응답** - 실시간 답변 표시

---

## 4. 데이터베이스

### 4.1 DBMS

- **PostgreSQL 15.x** (Supabase 호스팅)

### 4.2 클라이언트 라이브러리

- **@supabase/supabase-js** (JavaScript Client)

### 4.3 스키마 관리

- **Supabase Migration Tools** - SQL 마이그레이션
- **SQL Scripts** - `HDH_Fintech/supabase/` 폴더

### 4.4 주요 테이블

**사용자 관련:**
- `users` - 사용자 정보 (프로필, 인증)
- `user_settings` - 사용자 설정 (API 키, 트레이딩 파라미터)

**교육 및 추천인 코드:**
- `academy_applications` - 아카데미 교육 신청
- `referral_codes` - 추천인 코드 (신청 및 발급)

**손익 관리:**
- `cumulative_pl` - 누적 손익 데이터
- `pl_journal` - 손익 저널 (일별 트레이딩 기록)

**문의 및 지원:**
- `sunny_chat_logs` - Sunny AI 챗봇 대화 로그
- `support_tickets` - 고객센터 문의

**콘텐츠:**
- `notices` - 공지사항
- `manuals` - 매뉴얼 콘텐츠

**통계:**
- `rankings` - 순이익 랭킹

---

## 5. 인증 & 보안

### 5.1 인증

- **Supabase Auth** - JWT 기반 인증
- **이메일/비밀번호** 인증 (기본)
- **이메일 인증** - 회원가입 시 필수

### 5.2 보안

| 기술/방법 | 용도 |
|----------|------|
| **Row Level Security (RLS)** | 데이터 접근 제어 |
| **HTTPS** | Vercel 자동 제공 |
| **환경 변수** | API 키 보호 (.env) |
| **bcrypt** | 비밀번호 해싱 (Supabase 자동) |
| **CSRF 방지** | Next.js 내장 |
| **Content Security Policy** | XSS 방어 |

### 5.3 데이터 보호

- **개인정보 암호화** - 전화번호, 이메일 등
- **API 키 암호화** - 사용자 계좌 API 키
- **로그 보안** - 민감 정보 마스킹

---

## 6. 배포 & 인프라

### 6.1 호스팅

| 서비스 | 용도 | URL |
|--------|------|-----|
| **Vercel** | 프론트엔드 + API Routes | hdhfintech.com (예정) |
| **Supabase** | 데이터베이스 + Auth | 자동 제공 |

### 6.2 도메인

- **hdhfintech.com** (메인 도메인 - 예정)

### 6.3 CI/CD

- **Vercel Git Integration** - Git push → 자동 배포 (30초 이내)
- **프리뷰 배포** - PR 생성 시 자동 프리뷰 URL 생성

### 6.4 CDN

- **Vercel Edge Network** - 글로벌 CDN (자동 제공)

### 6.5 정적 파일

- **GitHub Repository** - 매뉴얼 콘텐츠 저장
- **Vercel Static Hosting** - 마크다운 → HTML 렌더링

### 6.6 AI 프로그램 배포

- **GitHub Releases** - Windows/Mac 실행 파일 배포
- **다운로드 링크** - Dashboard에서 제공

---

## 7. 개발 도구

### 7.1 버전 관리

- **Git** - 버전 관리
- **GitHub** - 원격 저장소

### 7.2 코드 품질

- **ESLint** - JavaScript/TypeScript 린팅
- **Prettier** - 코드 포맷팅
- **TypeScript Compiler** - 타입 체크

### 7.3 테스트

| 도구 | 용도 |
|------|------|
| **Jest** | Unit 테스트 |
| **React Testing Library** | 컴포넌트 테스트 |
| **Playwright** | E2E 테스트 |

### 7.4 IDE

- **VS Code** (권장)
- **Claude Code** 확장

### 7.5 패키지 관리자

- **npm** (기본) 또는 **yarn**

---

## 8. 매뉴얼 & 콘텐츠 제공

### 8.1 제공 방식

**선택:** GitHub + Vercel 정적 파일 배포

### 8.2 구조

```
Next.js 프로젝트/
├── public/manuals/
│   ├── solution/          (HDH 솔루션 이해)
│   ├── account/           (계좌 개설 가이드)
│   ├── api/               (API 연결 가이드)
│   ├── trading/           (트레이딩 설정 가이드)
│   └── risk/              (리스크 관리 가이드)
└── app/manual/
    └── [category]/[slug]/page.tsx  (마크다운 → HTML 렌더링)
```

### 8.3 선택 이유

- ✅ 무료 (GitHub + Vercel)
- ✅ 빠름 (CDN 캐싱)
- ✅ 안정적 (99.9% 업타임)
- ✅ 버전 관리 자동 (Git)
- ✅ 배포 자동 (git push → 30초 배포)
- ✅ SEO 최적화
- ✅ 마크다운 → 예쁜 HTML 자동 변환

### 8.4 대안 (제외됨)

- ❌ Google Drive API (느림, 복잡)
- ❌ Notion Database (비용, API 제한)
- ❌ DB 저장 (불필요한 복잡도)

---

## 9. 버전 정책

### 9.1 Node.js

- **최소 버전:** 20.x
- **권장 버전:** 20.10+
- **확인 방법:** `node --version`

### 9.2 패키지 관리자

- **npm:** 10.x+
- **yarn:** 1.22+ (선택)

### 9.3 브라우저 지원

| 브라우저 | 최소 버전 |
|---------|-----------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### 9.4 디바이스 지원

- **데스크톱:** 1920×1080 이상 (권장)
- **태블릿:** 768px 이상
- **모바일:** 375px 이상

---

## 10. 의존성 관리

### 10.1 package.json 주요 의존성

```json
{
  "name": "hdh-fintech",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "next-mdx-remote": "^4.4.0",
    "openai": "^4.20.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.0",
    "jest": "^29.0.0",
    "@testing-library/react": "^14.0.0",
    "@playwright/test": "^1.40.0"
  }
}
```

### 10.2 의존성 업데이트

- **매월 1회** 의존성 업데이트 확인
- **보안 패치** 즉시 적용
- **메이저 버전** 업그레이드는 신중히 검토

---

## 11. 환경 변수

### 11.1 필수 환경 변수 (.env)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI APIs (Sunny Chatbot)
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
PERPLEXITY_API_KEY=your-perplexity-api-key

# Next.js
NEXT_PUBLIC_APP_URL=https://hdhfintech.com

# Email (SendGrid or SMTP)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@hdhfintech.com

# Admin
ADMIN_EMAIL=admin@hdhfintech.com
ADMIN_ALERT_EMAIL=alert@hdhfintech.com
```

### 11.2 환경 변수 예시 (.env.example)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI APIs
OPENAI_API_KEY=
GEMINI_API_KEY=
PERPLEXITY_API_KEY=

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email
SENDGRID_API_KEY=
FROM_EMAIL=noreply@hdhfintech.com

# Admin
ADMIN_EMAIL=admin@hdhfintech.com
ADMIN_ALERT_EMAIL=alert@hdhfintech.com
```

### 11.3 환경 변수 보안

- ✅ `.env` 파일은 `.gitignore`에 추가
- ✅ `.env.example` 파일은 Git에 커밋
- ✅ Vercel에서 환경 변수 별도 설정
- ❌ 절대 공개 저장소에 노출 금지

---

## 12. 참고 문서

### 12.1 기획 문서

- **프로젝트 계획:** `0_프로젝트_기획/Project_Plan/`
- **사용자 플로우:** `0_프로젝트_기획/User_Flows/`
- **워크플로우:** `0_프로젝트_기획/Workflows/`
- **디자인 시스템:** `0_프로젝트_기획/Design_System/HDH_DESIGN_SYSTEM.md`
- **UI/UX 목업:** `0_프로젝트_기획/UI_UX_Mockup/`
- **기술 스택:** `0_프로젝트_기획/Tech_Stack/TECH_STACK.md` (이 문서)

### 12.2 프로젝트 구조

- **디렉토리 구조:** (작성 예정)
- **프로젝트 상태:** (작성 예정)

### 12.3 개발 가이드

- **개발 가이드:** (작성 예정)
- **Git 워크플로우:** (작성 예정)

---

## 13. 기술 스택 결정 히스토리

### 13.1 주요 결정 사항

| 날짜 | 결정 | 이유 |
|------|------|------|
| 2025-12-09 | Next.js 14 선택 | SSR, API Routes, App Router |
| 2025-12-09 | Supabase 선택 | DB + Auth + Realtime 올인원, 무료 티어 |
| 2025-12-09 | ChatGPT/Gemini/Perplexity 선택 | Sunny 챗봇 구현 (다중 AI API) |
| 2025-12-09 | Chart.js 선택 | 손익 그래프 시각화 |
| 2025-12-09 | GitHub + Vercel 정적 배포 | 매뉴얼 콘텐츠 제공 (무료, 빠름, 안정적) |
| 2025-12-09 | 테이블 명명 규칙 정리 | functional_requirements.md 기준 통일 |

### 13.2 향후 검토 사항

- **Supabase Realtime** 본격 도입 (Phase 2)
- **모바일 앱** React Native 검토 (Phase 3)
- **AI 자동화 프로그램** Python → Rust 전환 검토 (성능 향상)

---

## 14. 특수 기능 구현

### 14.1 Sunny 챗봇

**구현 방식:**
```typescript
// app/api/sunny/route.ts
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  const { message } = await request.json()

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "당신은 HDH Fintech의 AI 어시스턴트 Sunny입니다. HDH 솔루션 운영자를 돕는 역할입니다."
      },
      {
        role: "user",
        content: message
      }
    ],
    stream: true,
  })

  // 스트리밍 응답 반환
  return new Response(completion)
}
```

### 14.2 손익 차트

**구현 방식:**
```typescript
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

export default function PLChart({ data }) {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [{
      label: '누적 손익',
      data: data.map(d => d.cumulative_pl),
      borderColor: '#F59E0B',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
    }]
  }

  return <Line data={chartData} />
}
```

### 14.3 추천인 코드 자동 생성

**구현 방식:**
```typescript
// 추천인 코드 생성 함수
function generateReferralCode(): string {
  const prefix = 'HDH2025'
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}${randomString}` // 예: HDH2025ABC123
}

// 사용 예시
const referralCode = generateReferralCode()
```

---

## 15. 버전 히스토리

| 버전 | 날짜 | 변경 내용 |
|------|------|-----------|
| v1.0 | 2025-12-09 | 초안 작성 (HDH Fintech 기술 스택 정의) |

---

**Document Complete**

이 기술 스택 명세서는 HDH Fintech 프로젝트의 모든 기술적 결정을 문서화합니다.
추가 기술 도입 시 이 문서를 업데이트하고 버전을 올려주세요.
