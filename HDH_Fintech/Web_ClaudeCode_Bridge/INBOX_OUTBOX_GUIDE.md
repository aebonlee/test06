# Inbox/Outbox 시스템 사용 가이드

> **작성일**: 2025-11-18
> **대상**: 모든 사용자 (개발자, 프로젝트 관리자)
> **목적**: Inbox/Outbox JSON 시스템을 통한 효율적인 작업 관리

---

## 📖 개요

**Inbox/Outbox 시스템**은 Claude Code AI와 사용자 간의 작업 지시 및 결과 보고를 위한 구조화된 시스템입니다.

### 핵심 개념

```
사용자 → Inbox → Claude Code AI
              ↓
         작업 수행
              ↓
Claude Code AI → Outbox → 사용자
```

**장점:**
- ✅ 명확한 작업 지시
- ✅ 상세한 결과 보고
- ✅ 웹 대시보드 실시간 연동
- ✅ 작업 추적 및 통계
- ✅ 자동화 가능

---

## 📂 디렉토리 구조

```
Web_ClaudeCode_Bridge/
├── Inbox/              ← 여기에 작업 지시 JSON 파일을 넣으세요
│   ├── Archive/        ← 완료된 작업은 자동으로 이동됩니다
│   └── *.json
├── Outbox/             ← 완료된 작업 보고서가 생성됩니다
│   └── *.json
└── inbox_server.js     ← 로컬 서버 (항상 실행 중이어야 함)
```

---

## 🚀 빠른 시작

### 1. 서버 시작

```bash
cd Web_ClaudeCode_Bridge
node inbox_server.js
```

**확인:**
- 브라우저에서 `http://localhost:3030` 접속
- "Inbox 서버가 실행 중입니다" 메시지 확인

### 2. 작업 지시하기

**방법 A: 웹 대시보드 사용 (추천)**
1. `dashboard-mockup.html` 열기
2. "새 작업" 버튼 클릭
3. 작업 정보 입력
4. "Inbox에 추가" 클릭

**방법 B: 수동으로 JSON 파일 생성**
1. `Inbox/` 폴더에 JSON 파일 생성
2. 아래 템플릿 참고하여 작성
3. 저장

### 3. 결과 확인하기

**방법 A: 웹 대시보드**
- 대시보드에서 "완료된 작업" 탭 클릭
- 자동으로 Outbox 파일 표시

**방법 B: 직접 확인**
- `Outbox/` 폴더의 JSON 파일 열기
- 상세한 결과 보고서 확인

---

## 📝 Inbox JSON 작성 가이드

### 기본 템플릿

```json
{
  "task_id": "UNIQUE_ID",
  "task_name": "작업 이름",
  "phase": 1,
  "area": "BA",
  "priority": "high",
  "assigned_to": "backend-developer",
  "created_at": "2025-11-18T09:00:00Z",
  "status": "대기 중",

  "requirements": {
    "description": "무엇을 만들어야 하는지 설명",
    "details": "구체적인 요구사항"
  },

  "acceptance_criteria": [
    "완료 조건 1",
    "완료 조건 2",
    "완료 조건 3"
  ],

  "expected_files": [
    "생성될 파일 경로 1",
    "생성될 파일 경로 2"
  ],

  "dependencies": []
}
```

### 필드 설명

| 필드 | 필수 | 설명 | 예시 |
|------|------|------|------|
| `task_id` | ✅ | 고유 작업 ID | `"P1BA1"` |
| `task_name` | ✅ | 작업 이름 | `"회원가입 API 구현"` |
| `phase` | ✅ | 프로젝트 단계 (1~4) | `1` |
| `area` | ✅ | 작업 영역 | `"BA"`, `"FA"`, `"DB"` |
| `priority` | ✅ | 우선순위 | `"low"`, `"medium"`, `"high"`, `"critical"` |
| `assigned_to` | ✅ | 담당 에이전트 | `"backend-developer"` |
| `created_at` | ✅ | 생성 시간 | `"2025-11-18T09:00:00Z"` |
| `status` | ✅ | 상태 | `"대기 중"`, `"진행 중"` |
| `requirements` | ✅ | 요구사항 객체 | `{ description, details }` |
| `acceptance_criteria` | ✅ | 완료 조건 배열 | `["조건1", "조건2"]` |
| `expected_files` | ✅ | 생성될 파일 목록 | `["경로1", "경로2"]` |
| `dependencies` | ✅ | 의존 작업 ID | `["P1BA0"]` 또는 `[]` |

---

## 📤 Outbox JSON 읽기 가이드

### 구조 이해하기

완료된 작업의 보고서는 다음 정보를 포함합니다:

```json
{
  "task_id": "P1BA1",
  "task_name": "회원가입 API 구현",
  "completion_time": "2025-11-18T11:30:00Z",
  "status": "완료",

  "deliverables": {
    "files_created": [
      {
        "path": "파일 경로",
        "purpose": "파일 목적",
        "size_kb": 12,
        "lines": 245
      }
    ]
  },

  "verification_completed": {
    "static_analysis": {
      "code_review": "✅ 통과",
      "lint": "✅ 0 errors"
    },
    "dynamic_analysis": {
      "unit_tests": "✅ 24/24 통과",
      "build": "✅ 성공"
    }
  },

  "next_steps": [
    {
      "task_id": "P1BA2",
      "task_name": "다음 작업"
    }
  ]
}
```

### 주요 섹션

**1. 기본 정보**
- `task_id`: 작업 ID
- `task_name`: 작업 이름
- `completion_time`: 완료 시간
- `status`: 완료 상태

**2. 결과물 (`deliverables`)**
- `files_created`: 생성된 파일 목록
- `files_modified`: 수정된 파일 목록
- `files_deleted`: 삭제된 파일 목록

**3. 검증 결과 (`verification_completed`)**
- `static_analysis`: 정적 분석 (코드 리뷰, Lint 등)
- `dynamic_analysis`: 동적 분석 (테스트, 빌드 등)

**4. 다음 단계 (`next_steps`)**
- 다음에 해야 할 작업 목록
- 의존성 정보 포함

---

## 🎯 사용 시나리오

### 시나리오 1: API 개발 작업 지시

**1. Inbox JSON 생성**

파일명: `Inbox/task_signup_api.json`

```json
{
  "task_id": "P1BA1",
  "task_name": "회원가입 API 구현",
  "phase": 1,
  "area": "BA",
  "priority": "high",
  "assigned_to": "backend-developer",
  "created_at": "2025-11-18T09:00:00Z",
  "status": "대기 중",

  "requirements": {
    "description": "사용자 회원가입 API 엔드포인트 구현",
    "endpoint": "/api/auth/signup",
    "method": "POST",
    "input": {
      "email": "string (required)",
      "password": "string (required)",
      "name": "string (required)"
    },
    "output": {
      "success": "boolean",
      "user_id": "string",
      "token": "string"
    }
  },

  "acceptance_criteria": [
    "이메일 중복 검사 구현",
    "비밀번호 암호화 (bcrypt)",
    "JWT 토큰 발급",
    "입력 데이터 검증 (Joi)",
    "에러 처리 구현"
  ],

  "expected_files": [
    "3_개발/3-2_Backend_APIs/auth/P1BA1_signup.ts"
  ],

  "dependencies": []
}
```

**2. Claude Code 작업 수행**

Claude Code가 자동으로:
1. Inbox 파일 감지
2. 요구사항 읽기
3. API 구현
4. 테스트 작성
5. 검증 수행

**3. Outbox에서 결과 확인**

파일: `Outbox/P1BA1_completion_2025-11-18.json`

```json
{
  "task_id": "P1BA1",
  "status": "완료",
  "deliverables": {
    "files_created": [
      {
        "path": "C:\\!SSAL_Works_Private\\3_개발\\3-2_Backend_APIs\\auth\\P1BA1_signup.ts",
        "purpose": "회원가입 API 엔드포인트",
        "size_kb": 12,
        "lines": 245
      }
    ]
  },
  "verification_completed": {
    "dynamic_analysis": {
      "unit_tests": "✅ 24/24 통과",
      "build": "✅ 성공"
    }
  }
}
```

---

### 시나리오 2: UI 컴포넌트 개발

**Inbox JSON:**

```json
{
  "task_id": "P1FA5",
  "task_name": "로그인 폼 컴포넌트",
  "phase": 1,
  "area": "FA",
  "priority": "medium",
  "assigned_to": "frontend-developer",
  "created_at": "2025-11-18T10:00:00Z",
  "status": "대기 중",

  "requirements": {
    "description": "사용자 로그인 폼 React 컴포넌트",
    "features": [
      "이메일/비밀번호 입력 필드",
      "로그인 버튼",
      "비밀번호 표시/숨김 토글",
      "입력 검증 및 에러 메시지",
      "로딩 상태 표시"
    ],
    "design": "DESIGN_SYSTEM.md 준수"
  },

  "acceptance_criteria": [
    "React 18 + TypeScript 사용",
    "DESIGN_SYSTEM.md의 색상/폰트 적용",
    "반응형 디자인 (모바일/데스크톱)",
    "접근성 (ARIA 레이블)",
    "단위 테스트 작성"
  ],

  "expected_files": [
    "3_개발/3-1_Frontend/components/auth/LoginForm.tsx",
    "3_개발/3-1_Frontend/components/auth/LoginForm.test.tsx"
  ],

  "dependencies": []
}
```

---

### 시나리오 3: 데이터베이스 스키마

**Inbox JSON:**

```json
{
  "task_id": "P1DB1",
  "task_name": "사용자 테이블 스키마",
  "phase": 1,
  "area": "DB",
  "priority": "high",
  "assigned_to": "database-developer",
  "created_at": "2025-11-18T11:00:00Z",
  "status": "대기 중",

  "requirements": {
    "description": "Supabase users 테이블 스키마 생성",
    "table_name": "users",
    "columns": [
      "id (UUID, PK)",
      "email (VARCHAR, UNIQUE, NOT NULL)",
      "password_hash (VARCHAR, NOT NULL)",
      "name (VARCHAR, NOT NULL)",
      "created_at (TIMESTAMP)",
      "updated_at (TIMESTAMP)"
    ],
    "indexes": [
      "email (UNIQUE INDEX)"
    ]
  },

  "acceptance_criteria": [
    "Supabase에 테이블 생성",
    "제약조건 적용",
    "인덱스 생성",
    "RLS 정책 설정",
    "테스트 데이터 삽입"
  ],

  "expected_files": [
    "2_개발준비/2-2_Database/schema/users_table.sql"
  ],

  "dependencies": []
}
```

---

## 🔍 고급 활용

### 1. 의존성 관리

작업 간 의존성이 있는 경우:

```json
{
  "task_id": "P1BA2",
  "task_name": "로그인 API",
  "dependencies": ["P1BA1"],  // 회원가입 API가 먼저 완료되어야 함
  ...
}
```

Claude Code는:
1. `P1BA1`이 Outbox에 있는지 확인
2. 있으면 `P1BA2` 시작
3. 없으면 대기

### 2. 작업 우선순위

```json
{
  "priority": "critical"  // 즉시 처리
}
```

**우선순위 레벨:**
- `critical`: 즉시 처리 필요
- `high`: 높은 우선순위
- `medium`: 보통 우선순위
- `low`: 낮은 우선순위

### 3. 배치 작업

여러 작업을 한 번에 지시:

```
Inbox/
├── task_001.json
├── task_002.json
├── task_003.json
└── task_004.json
```

Claude Code가:
1. 우선순위 순으로 정렬
2. 의존성 확인
3. 순차적으로 처리

---

## 📊 웹 대시보드 활용

### 대시보드에서 할 수 있는 것

**1. 작업 생성**
- GUI를 통한 Inbox JSON 자동 생성
- 템플릿 선택 가능
- 입력 검증

**2. 진행 상황 모니터링**
- 대기 중인 작업 목록
- 진행 중인 작업 상태
- 완료된 작업 통계

**3. 결과 확인**
- Outbox 보고서 시각화
- 검증 결과 표시
- 생성된 파일 목록

**4. 통계 및 분석**
- 완료율 그래프
- 에이전트별 작업량
- 평균 소요 시간

---

## ⚠️ 주의사항

### 1. 서버 실행 필수

```bash
# 반드시 실행 중이어야 함
node Web_ClaudeCode_Bridge/inbox_server.js
```

**확인 방법:**
```bash
# 포트 확인
netstat -ano | findstr :3030
```

### 2. JSON 문법 오류 방지

**잘못된 예:**
```json
{
  "task_id": "P1BA1",
  "task_name": "회원가입 API"  // ❌ 마지막 쉼표 없어야 함
}
```

**올바른 예:**
```json
{
  "task_id": "P1BA1",
  "task_name": "회원가입 API"
}
```

**검증 도구 사용:**
- [JSONLint](https://jsonlint.com/)
- VS Code의 JSON 검증 기능

### 3. 파일명 규칙

**Inbox:**
```
task_{설명}.json
예: task_signup_api.json
```

**Outbox (자동 생성):**
```
{task_id}_completion_{날짜}.json
예: P1BA1_completion_2025-11-18.json
```

### 4. Archive 폴더

완료된 Inbox 파일은 자동으로 `Inbox/Archive/`로 이동됩니다.
- ✅ 수동 삭제 불필요
- ✅ 히스토리 보존
- ✅ Inbox 폴더 깔끔 유지

---

## 🔧 문제 해결

### 문제 1: Inbox 파일이 처리되지 않음

**원인:**
- 서버가 실행 중이 아님
- JSON 문법 오류
- 파일명 문제

**해결:**
```bash
# 1. 서버 상태 확인
curl http://localhost:3030

# 2. JSON 유효성 검사
cat Inbox/task.json | jq .

# 3. 서버 재시작
cd Web_ClaudeCode_Bridge
node inbox_server.js
```

### 문제 2: Outbox에 결과가 안 나타남

**원인:**
- 작업이 아직 완료 안 됨
- 검증 단계에서 대기 중

**확인:**
```bash
# Claude Code 로그 확인
# work_logs/current.md 확인
```

### 문제 3: 대시보드에서 파일이 안 보임

**원인:**
- 서버 연결 문제
- 경로 설정 오류

**해결:**
1. `dashboard-mockup.html`의 `PROJECT_CONFIGS` 확인
2. `inboxPath` 경로가 올바른지 확인
3. 브라우저 개발자 도구에서 네트워크 오류 확인

---

## 📚 참고 자료

### 관련 문서
- `.claude/workflows/INBOX_OUTBOX_JSON_WORKFLOW.md` - AI 에이전트용 상세 지침
- `PROJECT_DIRECTORY_STRUCTURE.md` - 전체 프로젝트 구조
- `inbox_server.js` - 서버 소스 코드

### 예제 파일
- `Inbox/Archive/` - 완료된 작업 예제
- `Outbox/` - 보고서 예제

### API 문서
```
GET  /inbox     - Inbox 파일 목록
POST /inbox     - 새 작업 추가
GET  /outbox    - Outbox 파일 목록
GET  /status    - 서버 상태
```

---

## 💡 팁과 요령

### 1. 템플릿 활용

자주 사용하는 작업 타입별로 템플릿 생성:

```
Inbox/templates/
├── api_task_template.json
├── ui_component_template.json
├── db_schema_template.json
└── test_task_template.json
```

### 2. 작업 ID 규칙

```
P{Phase}{Area}{Number}
예:
- P1BA1: Phase1 - Backend API - 1번
- P1FA5: Phase1 - Frontend - 5번
- P2DB3: Phase2 - Database - 3번
```

### 3. 완료 조건 명확히

```json
{
  "acceptance_criteria": [
    "✅ 구체적으로: 단위 테스트 커버리지 80% 이상",
    "❌ 모호하게: 테스트 작성"
  ]
}
```

### 4. 주기적 점검

```bash
# 매일 아침 확인
ls Inbox/*.json          # 대기 중인 작업
ls Outbox/*.json | tail  # 최근 완료 작업
```

---

## ✅ 체크리스트

### 시작하기 전
- [ ] `inbox_server.js` 실행 중
- [ ] `http://localhost:3030` 접속 가능
- [ ] `Inbox/` 폴더 확인

### 작업 지시할 때
- [ ] `task_id` 고유한지 확인
- [ ] `acceptance_criteria` 명확한지 확인
- [ ] JSON 문법 오류 없는지 확인
- [ ] `expected_files` 경로 정확한지 확인

### 결과 확인할 때
- [ ] `Outbox/` 폴더 확인
- [ ] `status`가 "완료"인지 확인
- [ ] `verification_completed` 모두 ✅인지 확인
- [ ] `next_steps` 확인

---

## 🎓 추가 학습 자료

### JSON 기초
- [JSON 소개](https://www.json.org/json-ko.html)
- [JSON 검증 도구](https://jsonlint.com/)

### API 개념
- REST API 기초
- HTTP 메서드 (GET, POST, PUT, DELETE)

### 프로젝트 관리
- Kanban 보드
- 의존성 그래프

---

**작성자**: Claude Code
**버전**: 1.0
**최종 수정**: 2025-11-18
**문의**: 프로젝트 관리자
