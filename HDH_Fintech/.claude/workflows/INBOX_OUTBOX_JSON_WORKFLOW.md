# Inbox/Outbox JSON Workflow

> **작성일**: 2025-11-18
> **대상**: Claude Code AI Agent
> **목적**: Inbox/Outbox JSON 시스템을 통한 완벽한 작업 추적 및 세션 간 연속성 유지

---

## 🎯 핵심 개념

### Inbox/Outbox = AI의 작업 기억 시스템

**기존 문제 (work_log.md):**
- ❌ 비구조화된 텍스트
- ❌ 검색 어려움
- ❌ 통계 추출 불가능
- ❌ 대시보드 연동 복잡
- ❌ 세션 간 컨텍스트 파악 불완전

**해결책 (Inbox/Outbox JSON):**
- ✅ 구조화된 JSON 데이터
- ✅ 필드별 즉시 검색
- ✅ 통계 자동 추출
- ✅ 대시보드 실시간 연동
- ✅ 세션 간 완벽한 연속성
- ✅ 프로젝트 전체 상황 한눈에

---

## 📂 디렉토리 구조

```
Web_ClaudeCode_Bridge/
├── Inbox/          ← 새로운 작업 지시 (JSON)
│   ├── task_001.json
│   ├── task_002.json
│   └── ...
├── Outbox/         ← 완료된 작업 보고 (JSON)
│   ├── task_001_completion.json
│   ├── task_002_completion.json
│   └── ...
└── inbox_server.js
```

---

## 🔄 완전한 워크플로우

### Phase 1: 세션 시작 시 (자동)

**🚨 최우선 작업: Inbox 확인 (사용자 요청 전에 자동 실행)**

```bash
# 세션 시작하자마자 자동 실행
ls Web_ClaudeCode_Bridge/Inbox/*.json 2>/dev/null
```

**동작:**

1. **Inbox에 JSON 파일 있음:**
   ```
   "📬 inbox에서 새 작업을 발견했습니다:

   작업 ID: P1BA1
   작업명: 회원가입 API 구현
   우선순위: high
   담당자: backend-developer

   바로 시작하겠습니다!"
   ```

2. **Inbox에 파일 없음:**
   ```bash
   # 최근 Outbox 확인하여 이전 작업 파악
   ls -t Web_ClaudeCode_Bridge/Outbox/*.json | head -1
   ```

   마지막 완료 작업의 `next_steps`를 확인하여 다음 할 일 파악

---

### Phase 2: 작업 수행

**Inbox JSON 읽기:**

```json
// Web_ClaudeCode_Bridge/Inbox/task_P1BA1.json
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
    "description": "사용자 회원가입 API 구현",
    "endpoints": ["/api/auth/signup"],
    "methods": ["POST"],
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
    "이메일 중복 검사",
    "비밀번호 암호화",
    "JWT 토큰 발급",
    "입력 데이터 검증"
  ],

  "expected_files": [
    "3_개발/3-2_Backend_APIs/auth/P1BA1_signup.ts"
  ],

  "dependencies": [],

  "estimated_duration": "작성 금지 (시간 추정 절대 금지)"
}
```

**작업 수행 및 TodoWrite 활용:**

```javascript
// 작업 시작 시 TodoWrite
todos = [
  {content: "Inbox 작업 읽기", status: "completed", activeForm: "..."},
  {content: "회원가입 API 구현", status: "in_progress", activeForm: "..."},
  {content: "테스트 작성 및 실행", status: "pending", activeForm: "..."},
  {content: "검증 도구 실행", status: "pending", activeForm: "..."},
  {content: "Outbox 보고서 작성", status: "pending", activeForm: "..."}
]
```

---

### Phase 3: 작업 완료 시 (필수!)

**🚨 완료 후 필수 3단계:**

#### Step 1: 검증 수행

```
"작업이 완료되었습니다.

완료 항목:
- ✅ 회원가입 API 구현 (P1BA1_signup.ts)
- ✅ 입력 검증 로직
- ✅ 이메일 중복 검사
- ✅ 비밀번호 암호화
- ✅ JWT 토큰 발급

이제 검증을 수행하겠습니다:

검증 도구:
- code-reviewer: 코드 품질 검토
- test-runner: 자동 테스트 실행
- /test: 전체 테스트

검증을 진행하시겠습니까?"
```

#### Step 2: Outbox 보고서 작성

**파일명 규칙:**
```
{task_id}_completion_{date}.json
예: P1BA1_completion_2025-11-18.json
```

**필수 JSON 구조:**

```json
{
  "task_id": "P1BA1",
  "task_name": "회원가입 API 구현",
  "completion_time": "2025-11-18T11:30:00Z",
  "status": "완료",

  "execution_info": {
    "assigned_agent": "backend-developer",
    "executor": "Claude Code",
    "session_id": "2025-11-18_session_1"
  },

  "duration": {
    "actual_minutes": 45,
    "note": "시간 추정은 하지 않음, 실제 소요 시간만 기록"
  },

  "deliverables": {
    "files_created": [
      {
        "path": "C:\\!SSAL_Works_Private\\3_개발\\3-2_Backend_APIs\\auth\\P1BA1_signup.ts",
        "purpose": "회원가입 API 엔드포인트",
        "size_kb": 12,
        "lines": 245
      }
    ],
    "files_modified": [],
    "files_deleted": []
  },

  "acceptance_criteria_met": {
    "이메일 중복 검사": "✅ 구현 완료",
    "비밀번호 암호화": "✅ bcrypt 사용",
    "JWT 토큰 발급": "✅ jsonwebtoken 라이브러리 사용",
    "입력 데이터 검증": "✅ Joi 스키마 검증"
  },

  "verification_completed": {
    "static_analysis": {
      "code_review": "✅ 통과",
      "lint": "✅ 0 errors, 0 warnings",
      "type_check": "✅ TypeScript 통과"
    },
    "dynamic_analysis": {
      "unit_tests": "✅ 24/24 통과",
      "integration_tests": "✅ 5/5 통과",
      "e2e_tests": "✅ 3/3 통과",
      "build": "✅ 성공"
    }
  },

  "issues_found": [],

  "next_steps": [
    {
      "task_id": "P1BA2",
      "task_name": "로그인 API 구현",
      "priority": "high",
      "dependencies": ["P1BA1"],
      "status": "대기 중"
    }
  ],

  "lessons_learned": [
    "Joi 스키마 검증이 입력 데이터 처리에 효과적",
    "bcrypt의 saltRounds는 10이 적절",
    "JWT 만료 시간은 환경 변수로 설정하는 것이 좋음"
  ],

  "notes": "모든 요구사항 충족. 보안 모범 사례 적용됨."
}
```

#### Step 3: Inbox 파일 처리 + 자동 다음 작업 확인

```bash
# 1. 완료된 Inbox 파일을 Archive로 이동
mv Web_ClaudeCode_Bridge/Inbox/task_P1BA1.json \
   Web_ClaudeCode_Bridge/Inbox/Archive/

# 2. 자동으로 다음 Inbox 작업 확인
ls Web_ClaudeCode_Bridge/Inbox/*.json 2>/dev/null
```

**동작:**
- ✅ **다음 작업 있음:**
  ```
  "✅ P1BA1 작업 완료 및 검증 완료

  📬 inbox에서 다음 작업을 발견했습니다:
  - 작업 ID: P1BA2
  - 작업명: 로그인 API 구현

  이어서 진행하시겠습니까?"
  ```

- ✅ **다음 작업 없음:**
  ```
  "✅ P1BA1 작업 완료 및 검증 완료

  📬 inbox에 새 작업이 없습니다.
  다음 작업 지시를 기다리겠습니다."
  ```

---

## 🔍 Inbox JSON 필드 명세

### 필수 필드

```typescript
interface InboxTask {
  // 식별자
  task_id: string;              // 예: "P1BA1" (Phase1-BackendAPI-1)
  task_name: string;            // 예: "회원가입 API 구현"

  // 분류
  phase: number;                // 1~4 (프로젝트 Phase)
  area: string;                 // BA, FA, DB, etc.
  priority: "low" | "medium" | "high" | "critical";

  // 할당
  assigned_to: string;          // 예: "backend-developer"
  created_at: string;           // ISO 8601 timestamp
  status: "대기 중" | "진행 중" | "보류" | "취소";

  // 요구사항
  requirements: {
    description: string;
    // 작업 유형별로 다름 (API, UI, DB, etc.)
  };

  // 검증 기준
  acceptance_criteria: string[];

  // 결과물
  expected_files: string[];

  // 의존성
  dependencies: string[];       // 다른 task_id 배열
}
```

### 선택 필드

```typescript
interface InboxTaskOptional {
  // 추가 정보
  reference_docs?: string[];    // 참고 문서 경로
  related_tasks?: string[];     // 관련 작업 ID
  tags?: string[];              // 태그 (예: ["authentication", "security"])

  // 제약사항
  constraints?: {
    max_file_size?: string;
    performance?: string;
    security?: string[];
  };

  // 테스트
  test_requirements?: {
    unit_tests: boolean;
    integration_tests: boolean;
    e2e_tests: boolean;
    min_coverage?: number;
  };
}
```

---

## 📤 Outbox JSON 필드 명세

### 필수 필드

```typescript
interface OutboxCompletion {
  // 기본 정보
  task_id: string;
  task_name: string;
  completion_time: string;      // ISO 8601
  status: "완료" | "부분 완료" | "실패";

  // 실행 정보
  execution_info: {
    assigned_agent: string;
    executor: string;           // "Claude Code" 등
    session_id?: string;
  };

  // 소요 시간 (추정 아님!)
  duration: {
    actual_minutes: number;
    note?: string;
  };

  // 결과물
  deliverables: {
    files_created: FileInfo[];
    files_modified: FileInfo[];
    files_deleted: string[];
  };

  // 검증
  verification_completed: {
    static_analysis: Record<string, string>;
    dynamic_analysis: Record<string, string>;
  };

  // 다음 단계
  next_steps: NextTask[];
}

interface FileInfo {
  path: string;
  purpose: string;
  size_kb: number;
  lines: number;
}

interface NextTask {
  task_id: string;
  task_name: string;
  priority: string;
  dependencies: string[];
  status: string;
}
```

---

## 🎯 AI Agent 필수 규칙

### Rule 1: 세션 시작 시 Inbox 자동 확인

**🚨 사용자가 아무 말 안 해도 자동 실행!**

```bash
# 첫 번째 메시지 전에 실행
ls Web_ClaudeCode_Bridge/Inbox/*.json 2>/dev/null
```

**우선순위:**
1. Inbox에 파일 있음 → 즉시 읽고 작업 시작
2. Inbox에 파일 없음 → 마지막 Outbox 확인하여 컨텍스트 파악

### Rule 2: 작업 완료 시 Outbox 보고 필수

**완료 기준:**
- ✅ 모든 요구사항 구현
- ✅ 테스트 작성 및 통과
- ✅ 검증 도구 실행 완료
- ✅ 빌드 성공

**Outbox 보고 전에 반드시:**
1. 검증 도구 실행 제안
2. 사용자 승인 후 검증
3. 검증 완료 후 Outbox JSON 작성
4. Inbox 파일 Archive로 이동
5. **자동으로 다음 Inbox 작업 확인**

### Rule 3: 검증 완료 후 자동 Inbox 확인

**🚨 검증 완료할 때마다 자동으로 다음 작업 확인!**

```bash
# 검증 완료 즉시 실행
ls Web_ClaudeCode_Bridge/Inbox/*.json 2>/dev/null
```

**동작:**
- 새 작업 있음 → 사용자에게 알리고 이어서 진행 여부 확인
- 새 작업 없음 → 다음 지시 대기

### Rule 4: 시간 추정 절대 금지

**❌ 절대 금지:**
```json
{
  "estimated_duration": "2시간",  // ❌
  "expected_time": "30분"        // ❌
}
```

**✅ 올바름:**
```json
{
  "duration": {
    "actual_minutes": 45,  // 실제 소요된 시간만
    "note": "시간 추정은 하지 않음"
  }
}
```

### Rule 5: 거짓 보고 금지

**완료 보고 전 체크리스트:**
- [ ] 모든 `acceptance_criteria` 충족?
- [ ] 모든 테스트 통과?
- [ ] 빌드 성공?
- [ ] 검증 도구 실행?
- [ ] 오류 없음?

**모두 YES일 때만 `"status": "완료"`**

### Rule 6: next_steps 명시

**Outbox JSON에 반드시 포함:**

```json
{
  "next_steps": [
    {
      "task_id": "P1BA2",
      "task_name": "로그인 API",
      "priority": "high",
      "dependencies": ["P1BA1"],
      "status": "대기 중"
    }
  ]
}
```

**이유:**
- 다음 세션에서 무엇을 할지 명확
- 작업 연속성 유지
- 의존성 관리 용이

---

## 📊 대시보드 연동

### Inbox/Outbox 시각화

**웹 대시보드에서 활용:**

```javascript
// Inbox 작업 목록
const inboxTasks = await fetch('http://localhost:3030/inbox')
  .then(r => r.json());

// 대기 중인 작업
const pendingTasks = inboxTasks.filter(t => t.status === "대기 중");

// 우선순위별 정렬
const sortedTasks = pendingTasks.sort((a, b) =>
  priorityOrder[a.priority] - priorityOrder[b.priority]
);

// 화면에 표시
displayTaskList(sortedTasks);
```

### 진행 상황 추적

```javascript
// Outbox에서 완료된 작업
const completedTasks = await fetch('http://localhost:3030/outbox')
  .then(r => r.json());

// 통계
const stats = {
  total: inboxTasks.length + completedTasks.length,
  completed: completedTasks.length,
  inProgress: inboxTasks.filter(t => t.status === "진행 중").length,
  pending: inboxTasks.filter(t => t.status === "대기 중").length,
  progress: (completedTasks.length / (inboxTasks.length + completedTasks.length)) * 100
};

displayStats(stats);
```

### 실시간 업데이트

```javascript
// 5초마다 새로고침
setInterval(async () => {
  const inbox = await fetchInbox();
  const outbox = await fetchOutbox();
  updateDashboard(inbox, outbox);
}, 5000);
```

---

## 🔄 워크플로우 다이어그램

```
┌─────────────────────────────────────────────────────────────┐
│ 세션 시작                                                    │
│ ↓                                                            │
│ 📬 Inbox 자동 확인 (사용자 요청 전)                          │
│ ├─ 파일 있음 → 읽고 작업 시작                                │
│ └─ 파일 없음 → 마지막 Outbox 확인                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 작업 수행                                                    │
│ ├─ Inbox JSON 읽기                                          │
│ ├─ TodoWrite로 작업 추적                                     │
│ ├─ 요구사항 구현                                             │
│ └─ 테스트 작성                                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 검증                                                         │
│ ├─ 검증 도구 실행 제안                                       │
│ ├─ 사용자 승인 대기                                          │
│ ├─ code-reviewer, test-runner, /test 등 실행                │
│ └─ 검증 결과 확인                                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 완료 보고                                                    │
│ ├─ Outbox JSON 작성 (상세 보고서)                            │
│ ├─ Inbox 파일 → Archive 이동                                │
│ ├─ 📬 자동으로 다음 Inbox 작업 확인                          │
│ │   ├─ 새 작업 있음 → 사용자에게 알림                        │
│ │   └─ 새 작업 없음 → 대기                                   │
│ └─ work_log 업데이트 (선택)                                  │
└─────────────────────────────────────────────────────────────┘
                          ↓
                    다음 작업으로
```

---

## 📋 체크리스트

### 세션 시작 시
- [ ] Inbox 폴더 확인 (JSON 파일 있는지)
- [ ] Inbox 파일 있으면 → 읽고 작업 시작
- [ ] Inbox 파일 없으면 → 마지막 Outbox 확인
- [ ] TodoWrite로 작업 계획 수립

### 작업 중
- [ ] Inbox JSON의 모든 요구사항 확인
- [ ] `acceptance_criteria` 체크
- [ ] `expected_files` 생성
- [ ] 테스트 작성
- [ ] TodoWrite 상태 업데이트

### 작업 완료 시
- [ ] 검증 도구 실행 제안
- [ ] 사용자 승인 후 검증 수행
- [ ] 모든 테스트 통과 확인
- [ ] Outbox JSON 작성 (상세 보고서)
- [ ] Inbox 파일 → Archive 이동
- [ ] **자동으로 다음 Inbox 작업 확인**
- [ ] work_log 업데이트 (선택)

---

## 🎓 모범 사례

### ✅ Good Examples

**1. 세션 시작 시 자동 Inbox 확인**
```
(사용자가 아무 말 안 함)

AI: "📬 inbox에서 새 작업을 발견했습니다:
     - 작업 ID: P1BA1
     - 작업명: 회원가입 API
     바로 시작하겠습니다!"
```

**2. 검증 완료 후 자동 다음 작업 확인**
```
AI: "✅ P1BA1 검증 완료

     검증 결과: 모든 테스트 통과

     📬 inbox에서 다음 작업을 발견했습니다:
     - 작업 ID: P1BA2
     - 작업명: 로그인 API

     이어서 진행하시겠습니까?"
```

**3. 상세한 Outbox 보고**
```json
{
  "task_id": "P1BA1",
  "deliverables": { /* 상세 정보 */ },
  "verification_completed": { /* 모든 검증 결과 */ },
  "next_steps": [ /* 다음 작업 명시 */ ]
}
```

### ❌ Bad Examples

**1. Inbox 확인 안 함**
```
(Inbox에 파일 있는데도 확인 안 함)
AI: "무엇을 도와드릴까요?"  // ❌
```

**2. 불완전한 Outbox 보고**
```json
{
  "task_id": "P1BA1",
  "status": "완료"  // ❌ 너무 간단, 정보 부족
}
```

**3. 시간 추정 포함**
```json
{
  "estimated_time": "2시간"  // ❌ 절대 금지
}
```

---

## 🚀 고급 활용

### Inbox JSON 자동 생성 (웹 대시보드)

```javascript
// 대시보드에서 작업 생성 시
async function createTask(taskData) {
  const inboxTask = {
    task_id: generateTaskId(),
    task_name: taskData.name,
    phase: taskData.phase,
    area: taskData.area,
    priority: taskData.priority,
    assigned_to: taskData.agent,
    created_at: new Date().toISOString(),
    status: "대기 중",
    requirements: taskData.requirements,
    acceptance_criteria: taskData.criteria,
    expected_files: taskData.files,
    dependencies: taskData.deps || []
  };

  // Inbox에 저장
  await fetch('http://localhost:3030/inbox', {
    method: 'POST',
    body: JSON.stringify(inboxTask)
  });

  alert('작업이 Inbox에 추가되었습니다!');
}
```

### Outbox 분석 및 통계

```javascript
// 완료된 작업 분석
async function analyzeCompletions() {
  const outboxFiles = await fetchAllOutbox();

  // 평균 소요 시간
  const avgDuration = outboxFiles.reduce((sum, task) =>
    sum + task.duration.actual_minutes, 0
  ) / outboxFiles.length;

  // 에이전트별 완료 작업 수
  const byAgent = outboxFiles.reduce((acc, task) => {
    const agent = task.execution_info.assigned_agent;
    acc[agent] = (acc[agent] || 0) + 1;
    return acc;
  }, {});

  // 실패율
  const failedTasks = outboxFiles.filter(t =>
    t.verification_completed.dynamic_analysis.unit_tests.includes('실패')
  );
  const failureRate = (failedTasks.length / outboxFiles.length) * 100;

  return { avgDuration, byAgent, failureRate };
}
```

### 의존성 그래프 생성

```javascript
// 작업 간 의존성 시각화
function buildDependencyGraph(inboxTasks, outboxTasks) {
  const allTasks = [...inboxTasks, ...outboxTasks];

  const graph = allTasks.map(task => ({
    id: task.task_id,
    name: task.task_name,
    status: task.status,
    dependencies: task.dependencies || [],
    dependents: allTasks
      .filter(t => t.dependencies?.includes(task.task_id))
      .map(t => t.task_id)
  }));

  return graph;
}
```

---

## 📝 요약

**핵심 원칙:**

1. **세션 시작 시 Inbox 자동 확인** (사용자 요청 전)
2. **작업 완료 시 Outbox 보고 필수** (상세한 JSON)
3. **검증 완료 후 자동 다음 작업 확인** (연속성 유지)
4. **시간 추정 절대 금지** (실제 소요 시간만)
5. **거짓 보고 금지** (검증 완료 후에만 완료)
6. **next_steps 명시** (다음 할 일 명확히)

**이 시스템의 가치:**
- 🧠 **완벽한 기억력**: 세션 간 100% 연속성
- 📊 **실시간 추적**: 프로젝트 진행 상황 즉시 파악
- 🔍 **쉬운 검색**: 필드별 즉시 쿼리
- 📈 **자동 분석**: 통계 및 인사이트 추출
- 🤝 **협업 용이**: 구조화된 정보 공유

**work_log vs Inbox/Outbox:**
- work_log: 백업용, 사람이 읽기 위한 로그
- Inbox/Outbox: 메인 시스템, 자동화 및 추적용

---

**작성자**: Claude Code
**버전**: 1.0
**최종 수정**: 2025-11-18
