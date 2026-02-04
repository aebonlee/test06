# My 설정 트리 구조 최종안

**작성일**: 2025-12-07
**목적**: 계좌 관리부터 트리 구조로 접기/펼치기

---

## 📋 My 설정 메뉴 (트리 구조)

### 구조도

```
⚙️ My 설정
│
├─ 거래 시작일 설정             (클릭 → 모달)
│
├─ 누적손익 목표 설정           (클릭 → 모달)
│
├─ 💼 계좌 관리 ▶              (클릭 → 펼침/접힘)
│  ├─── 📊 계좌 현황 보기
│  ├─── ➕ 새 계좌 추가
│  ├─── 🔗 연결된 계좌 관리
│  └─── 📜 연동 로그
│
├─ 🔌 API 연결 설정 ▶          (클릭 → 펼침/접힘)
│  ├─── 🔑 API 키 관리
│  ├─── 🧪 연결 테스트
│  ├─── 🔐 권한 확인
│  ├─── 📊 사용량 통계
│  └─── ⏰ 만료 알림 설정
│
├─ 🔔 알림 설정 ▶              (클릭 → 펼침/접힘)
│  ├─── 💰 포지션 청산 알림
│  ├─── 🔗 계좌 연동 알림
│  ├─── ⚠️ 동기화 오류 알림
│  └─── 🔴 API 오류 알림
│
├─ 📊 데이터 관리 ▶            (클릭 → 펼침/접힘)
│  ├─── 📥 데이터 다운로드
│  │    ├─── CSV 거래 내역
│  │    ├─── PDF 손익 리포트
│  │    └─── TXT 연동 로그
│  ├─── 🗑️ 데이터 삭제
│  │    ├─── 거래 내역 삭제
│  │    └─── 캐시 삭제
│  └─── 🔄 동기화 설정
│
└─ 👤 프로필 관리 ▶            (클릭 → 펼침/접힘)
   ├─── 📷 프로필 사진
   ├─── ✏️ 닉네임 변경
   ├─── 📧 이메일 변경
   ├─── 📱 전화번호 변경
   ├─── 🔑 비밀번호 변경
   ├─── 📊 회원 정보 (조회만)
   └─── 🚪 회원 탈퇴
```

---

## 🎨 화면 구성 (접기/펼치기)

### 1단계: 기본 상태 (모두 접힘)

```
┌────────────────────────────────┐
│ ⚙️ My 설정                     │
├────────────────────────────────┤
│                                │
│ 거래 시작일 설정                │
│                                │
│ 누적손익 목표 설정              │
│                                │
│ 💼 계좌 관리 ▶                 │
│                                │
│ 🔌 API 연결 설정 ▶             │
│                                │
│ 🔔 알림 설정 ▶                 │
│                                │
│ 📊 데이터 관리 ▶               │
│                                │
│ 👤 프로필 관리 ▶               │
│                                │
└────────────────────────────────┘
```

---

### 2단계: "계좌 관리" 펼침

```
┌────────────────────────────────┐
│ ⚙️ My 설정                     │
├────────────────────────────────┤
│                                │
│ 거래 시작일 설정                │
│                                │
│ 누적손익 목표 설정              │
│                                │
│ 💼 계좌 관리 ▼                 │ ← 클릭하면 화살표 아래로
│   ├─ 📊 계좌 현황 보기         │
│   ├─ ➕ 새 계좌 추가           │
│   ├─ 🔗 연결된 계좌 관리       │
│   └─ 📜 연동 로그              │
│                                │
│ 🔌 API 연결 설정 ▶             │
│                                │
│ 🔔 알림 설정 ▶                 │
│                                │
│ 📊 데이터 관리 ▶               │
│                                │
│ 👤 프로필 관리 ▶               │
│                                │
└────────────────────────────────┘
```

---

### 3단계: "API 연결 설정" 펼침 (계좌 관리 접힘)

```
┌────────────────────────────────┐
│ ⚙️ My 설정                     │
├────────────────────────────────┤
│                                │
│ 거래 시작일 설정                │
│                                │
│ 누적손익 목표 설정              │
│                                │
│ 💼 계좌 관리 ▶                 │ ← 다시 접힘
│                                │
│ 🔌 API 연결 설정 ▼             │ ← 펼침
│   ├─ 🔑 API 키 관리            │
│   ├─ 🧪 연결 테스트            │
│   ├─ 🔐 권한 확인              │
│   ├─ 📊 사용량 통계            │
│   └─ ⏰ 만료 알림 설정         │
│                                │
│ 🔔 알림 설정 ▶                 │
│                                │
│ 📊 데이터 관리 ▶               │
│                                │
│ 👤 프로필 관리 ▶               │
│                                │
└────────────────────────────────┘
```

---

### 4단계: "데이터 관리" 펼침 (2단계 트리)

```
┌────────────────────────────────┐
│ ⚙️ My 설정                     │
├────────────────────────────────┤
│                                │
│ 거래 시작일 설정                │
│                                │
│ 누적손익 목표 설정              │
│                                │
│ 💼 계좌 관리 ▶                 │
│                                │
│ 🔌 API 연결 설정 ▶             │
│                                │
│ 🔔 알림 설정 ▶                 │
│                                │
│ 📊 데이터 관리 ▼               │ ← 펼침
│   ├─ 📥 데이터 다운로드 ▶      │ ← 2단계 접힘
│   ├─ 🗑️ 데이터 삭제 ▶         │
│   └─ 🔄 동기화 설정            │
│                                │
│ 👤 프로필 관리 ▶               │
│                                │
└────────────────────────────────┘
```

---

### 5단계: "데이터 다운로드" 2단계 펼침

```
┌────────────────────────────────┐
│ ⚙️ My 설정                     │
├────────────────────────────────┤
│                                │
│ 거래 시작일 설정                │
│                                │
│ 누적손익 목표 설정              │
│                                │
│ 💼 계좌 관리 ▶                 │
│                                │
│ 🔌 API 연결 설정 ▶             │
│                                │
│ 🔔 알림 설정 ▶                 │
│                                │
│ 📊 데이터 관리 ▼               │
│   ├─ 📥 데이터 다운로드 ▼      │ ← 2단계 펼침
│   │   ├─ CSV 거래 내역         │
│   │   ├─ PDF 손익 리포트       │
│   │   └─ TXT 연동 로그         │
│   ├─ 🗑️ 데이터 삭제 ▶         │
│   └─ 🔄 동기화 설정            │
│                                │
│ 👤 프로필 관리 ▶               │
│                                │
└────────────────────────────────┘
```

---

## 💻 HTML 코드

```html
<!-- My 설정 위젯 -->
<div class="widget">
    <div class="widget-title">
        <span class="widget-icon">⚙️</span>
        My 설정
    </div>

    <!-- 거래 시작일 설정 (단순 클릭) -->
    <div class="settings-item" onclick="openSettingsModal(event)">
        거래 시작일 설정
    </div>

    <!-- 누적손익 목표 설정 (단순 클릭) -->
    <div class="settings-item" onclick="openGoalModal(event)">
        누적손익 목표 설정
    </div>

    <!-- 계좌 관리 (트리 구조) -->
    <div class="settings-item tree-toggle" onclick="toggleTree(this)">
        <span>💼 계좌 관리</span>
        <span class="arrow">▶</span>
    </div>
    <div class="tree-content" style="display: none;">
        <div class="tree-item" onclick="openAccountDashboard()">
            📊 계좌 현황 보기
        </div>
        <div class="tree-item" onclick="openAccountModal(event)">
            ➕ 새 계좌 추가
        </div>
        <div class="tree-item" onclick="openAccountList()">
            🔗 연결된 계좌 관리
        </div>
        <div class="tree-item" onclick="openAccountLog()">
            📜 연동 로그
        </div>
    </div>

    <!-- API 연결 설정 (트리 구조) -->
    <div class="settings-item tree-toggle" onclick="toggleTree(this)">
        <span>🔌 API 연결 설정</span>
        <span class="arrow">▶</span>
    </div>
    <div class="tree-content" style="display: none;">
        <div class="tree-item" onclick="openAPIKeyManagement()">
            🔑 API 키 관리
        </div>
        <div class="tree-item" onclick="openConnectionTest()">
            🧪 연결 테스트
        </div>
        <div class="tree-item" onclick="openPermissionCheck()">
            🔐 권한 확인
        </div>
        <div class="tree-item" onclick="openUsageStats()">
            📊 사용량 통계
        </div>
        <div class="tree-item" onclick="openExpiryAlert()">
            ⏰ 만료 알림 설정
        </div>
    </div>

    <!-- 알림 설정 (트리 구조) -->
    <div class="settings-item tree-toggle" onclick="toggleTree(this)">
        <span>🔔 알림 설정</span>
        <span class="arrow">▶</span>
    </div>
    <div class="tree-content" style="display: none;">
        <div class="tree-item" onclick="toggleNotification('position')">
            <input type="checkbox" checked> 💰 포지션 청산 알림
        </div>
        <div class="tree-item" onclick="toggleNotification('account')">
            <input type="checkbox" checked> 🔗 계좌 연동 알림
        </div>
        <div class="tree-item" onclick="toggleNotification('sync')">
            <input type="checkbox" checked> ⚠️ 동기화 오류 알림
        </div>
        <div class="tree-item" onclick="toggleNotification('api')">
            <input type="checkbox" checked> 🔴 API 오류 알림
        </div>
    </div>

    <!-- 데이터 관리 (트리 구조 - 2단계) -->
    <div class="settings-item tree-toggle" onclick="toggleTree(this)">
        <span>📊 데이터 관리</span>
        <span class="arrow">▶</span>
    </div>
    <div class="tree-content" style="display: none;">
        <!-- 데이터 다운로드 (2단계) -->
        <div class="tree-item tree-toggle" onclick="toggleTree(this)">
            <span>📥 데이터 다운로드</span>
            <span class="arrow">▶</span>
        </div>
        <div class="tree-content sub-tree" style="display: none;">
            <div class="tree-item sub-item" onclick="downloadCSV()">
                CSV 거래 내역
            </div>
            <div class="tree-item sub-item" onclick="downloadPDF()">
                PDF 손익 리포트
            </div>
            <div class="tree-item sub-item" onclick="downloadLog()">
                TXT 연동 로그
            </div>
        </div>

        <!-- 데이터 삭제 (2단계) -->
        <div class="tree-item tree-toggle" onclick="toggleTree(this)">
            <span>🗑️ 데이터 삭제</span>
            <span class="arrow">▶</span>
        </div>
        <div class="tree-content sub-tree" style="display: none;">
            <div class="tree-item sub-item" onclick="deleteTradeHistory()">
                거래 내역 삭제
            </div>
            <div class="tree-item sub-item" onclick="deleteCache()">
                캐시 삭제
            </div>
        </div>

        <!-- 동기화 설정 -->
        <div class="tree-item" onclick="openSyncSettings()">
            🔄 동기화 설정
        </div>
    </div>

    <!-- 프로필 관리 (트리 구조) -->
    <div class="settings-item tree-toggle" onclick="toggleTree(this)">
        <span>👤 프로필 관리</span>
        <span class="arrow">▶</span>
    </div>
    <div class="tree-content" style="display: none;">
        <div class="tree-item" onclick="changeProfilePhoto()">
            📷 프로필 사진
        </div>
        <div class="tree-item" onclick="changeNickname()">
            ✏️ 닉네임 변경
        </div>
        <div class="tree-item" onclick="changeEmail()">
            📧 이메일 변경
        </div>
        <div class="tree-item" onclick="changePhone()">
            📱 전화번호 변경
        </div>
        <div class="tree-item" onclick="changePassword()">
            🔑 비밀번호 변경
        </div>
        <div class="tree-item" onclick="viewMemberInfo()">
            📊 회원 정보 (조회만)
        </div>
        <div class="tree-item" onclick="withdrawMembership()">
            🚪 회원 탈퇴
        </div>
    </div>
</div>
```

---

## 📜 JavaScript 코드

```javascript
// 트리 토글 함수
function toggleTree(element) {
    // 클릭한 항목의 다음 형제 요소 (tree-content) 찾기
    const treeContent = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');

    if (treeContent && treeContent.classList.contains('tree-content')) {
        if (treeContent.style.display === 'none' || treeContent.style.display === '') {
            // 펼치기
            treeContent.style.display = 'block';
            arrow.textContent = '▼';
            element.classList.add('active');
        } else {
            // 접기
            treeContent.style.display = 'none';
            arrow.textContent = '▶';
            element.classList.remove('active');

            // 2단계 트리도 모두 접기
            const subTrees = treeContent.querySelectorAll('.sub-tree');
            subTrees.forEach(subTree => {
                subTree.style.display = 'none';
                const subArrow = subTree.previousElementSibling.querySelector('.arrow');
                if (subArrow) subArrow.textContent = '▶';
            });
        }
    }

    // 이벤트 전파 중지 (상위 클릭 이벤트 방지)
    event.stopPropagation();
}

// 알림 토글
function toggleNotification(type) {
    const checkbox = event.target;
    const isEnabled = checkbox.checked;

    console.log(`${type} 알림: ${isEnabled ? 'ON' : 'OFF'}`);

    // API 호출하여 설정 저장
    // saveNotificationSetting(type, isEnabled);

    event.stopPropagation();
}
```

---

## 🎨 CSS 스타일

```css
/* 트리 토글 항목 */
.settings-item.tree-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
}

.settings-item.tree-toggle:hover {
    background: #F0F9FF;
    color: #3B82F6;
}

.settings-item.tree-toggle.active {
    background: #EFF6FF;
    color: #2563EB;
    font-weight: 600;
}

/* 화살표 */
.arrow {
    font-size: 10px;
    color: #94A3B8;
    transition: transform 0.3s;
}

/* 트리 콘텐츠 (1단계) */
.tree-content {
    padding-left: 20px;
    border-left: 2px solid #E2E8F0;
    margin-left: 10px;
    margin-top: 8px;
    margin-bottom: 8px;
}

/* 트리 항목 */
.tree-item {
    padding: 10px 12px;
    font-size: 13px;
    color: #475569;
    background: white;
    border-radius: 6px;
    margin-bottom: 6px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.tree-item:hover {
    background: #F8FAFC;
    color: #3B82F6;
    transform: translateX(4px);
}

/* 2단계 트리 */
.tree-content.sub-tree {
    padding-left: 16px;
    border-left: 2px solid #F1F5F9;
    margin-left: 8px;
}

.tree-item.sub-item {
    font-size: 12px;
    padding: 8px 10px;
    background: #FAFAFA;
}

.tree-item.sub-item:hover {
    background: #F0F9FF;
}

/* 체크박스 */
.tree-item input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
}

/* 애니메이션 */
.tree-content {
    animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        max-height: 0;
    }
    to {
        opacity: 1;
        max-height: 500px;
    }
}
```

---

## ✅ 동작 방식 정리

### 기본 동작

1. **접힌 상태** (기본):
   - 화살표: ▶
   - 트리 콘텐츠: `display: none`

2. **클릭** → **펼침**:
   - 화살표: ▼
   - 트리 콘텐츠: `display: block`
   - 배경색 변경 (활성 상태)

3. **다시 클릭** → **접힘**:
   - 화살표: ▶
   - 트리 콘텐츠: `display: none`
   - 2단계 트리도 자동으로 모두 접힘

---

### 2단계 트리 (데이터 관리)

1. **"데이터 관리" 클릭** → 펼침
   - 📥 데이터 다운로드 ▶
   - 🗑️ 데이터 삭제 ▶
   - 🔄 동기화 설정

2. **"데이터 다운로드" 클릭** → 2단계 펼침
   - CSV 거래 내역
   - PDF 손익 리포트
   - TXT 연동 로그

3. **"데이터 관리" 다시 클릭** → 모두 접힘
   - 1단계, 2단계 모두 접힘

---

## 🎯 최종 메뉴 구조

```
⚙️ My 설정
│
├─ 거래 시작일 설정 (모달)
├─ 누적손익 목표 설정 (모달)
│
├─ 💼 계좌 관리 ▶ (트리 - 4개 항목)
├─ 🔌 API 연결 설정 ▶ (트리 - 5개 항목)
├─ 🔔 알림 설정 ▶ (트리 - 4개 체크박스)
├─ 📊 데이터 관리 ▶ (트리 - 2단계)
└─ 👤 프로필 관리 ▶ (트리 - 7개 항목)
```

**총 메뉴**: 7개
**트리 구조**: 5개 (계좌 관리부터)
**2단계 트리**: 1개 (데이터 관리)

---

**문서 버전**: 1.0
**최종 수정**: 2025-12-07
