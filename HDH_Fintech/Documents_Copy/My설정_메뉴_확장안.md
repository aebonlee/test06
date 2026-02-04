# My 설정 메뉴 확장안

**작성일**: 2025-12-07
**목적**: My 설정 섹션에 추가할 메뉴 항목 정리

---

## 📌 현재 My 설정 메뉴 구조

```
⚙️ My 설정
├─ 거래 시작일 설정
├─ 누적손익 목표 설정
└─ 계좌 관리
```

---

## 🎯 확장된 My 설정 메뉴 구조

```
⚙️ My 설정
├─ 거래 시작일 설정
├─ 누적손익 목표 설정
├─ 계좌 관리
│
├─ 🔔 알림 설정                    ← 신규 추가
├─ 🎨 테마 설정                    ← 신규 추가
├─ 🔐 보안 설정                    ← 신규 추가
├─ 📊 데이터 관리                  ← 신규 추가
├─ 🌐 언어 설정                    ← 신규 추가
└─ 👤 프로필 관리                  ← 신규 추가
```

---

## 📋 추가할 메뉴 항목 상세

### 1. 🔔 알림 설정

**클릭 시 동작**: 알림 설정 모달 열림

**설정 항목**:
- ☑️ 포지션 청산 알림
- ☑️ 목표 달성 알림 (일/월/연)
- ☑️ 손절 발생 알림
- ☑️ 계좌 연동 상태 변경 알림
- ☑️ 데이터 동기화 오류 알림
- ☑️ 공지사항 알림
- ☐ 잔고 변동 알림 (선택)

**알림 방식**:
- ☑️ 웹 푸시 알림
- ☑️ 이메일 알림
- ☐ SMS 알림 (유료)

---

### 2. 🎨 테마 설정

**클릭 시 동작**: 테마 설정 모달 열림

**설정 항목**:
- ⚪ 라이트 모드 (기본)
- ⚫ 다크 모드
- 🌓 시스템 설정 따라가기

**색상 테마**:
- 🔵 기본 블루
- 🟢 그린
- 🟣 퍼플
- 🔴 레드

---

### 3. 🔐 보안 설정

**클릭 시 동작**: 보안 설정 모달 열림

**설정 항목**:
- 비밀번호 변경
- 2단계 인증 설정 (OTP)
- 로그인 알림 설정
- 접속 기록 확인
- API 키 관리 (보기/재발급)

---

### 4. 📊 데이터 관리

**클릭 시 동작**: 데이터 관리 모달 열림

**설정 항목**:
- 📥 내 데이터 다운로드
  - 거래 내역 전체 다운로드 (CSV)
  - 손익 리포트 다운로드 (PDF)
  - 계좌 연동 로그 다운로드

- 🗑️ 데이터 삭제
  - 거래 내역 삭제 (특정 기간)
  - 캐시 데이터 삭제

- 🔄 데이터 동기화
  - 수동 동기화 실행
  - 자동 동기화 간격 설정 (5초/10초/30초)

---

### 5. 🌐 언어 설정

**클릭 시 동작**: 언어 설정 모달 열림

**설정 항목**:
- 🇰🇷 한국어 (기본)
- 🇺🇸 English
- 🇯🇵 日本語
- 🇨🇳 简体中文

---

### 6. 👤 프로필 관리

**클릭 시 동작**: 프로필 관리 모달 열림

**설정 항목**:
- 프로필 사진 변경
- 닉네임 변경
- 이메일 변경
- 전화번호 변경
- 회원 탈퇴

---

## 💻 HTML 코드 예시

### 확장된 My 설정 위젯

```html
<!-- My 설정 -->
<div class="widget">
    <div class="widget-title">
        <span class="widget-icon">⚙️</span>
        My 설정
    </div>

    <!-- 기존 메뉴 -->
    <div class="settings-item" onclick="openSettingsModal(event)">
        거래 시작일 설정
    </div>
    <div class="settings-item" onclick="openGoalModal(event)">
        누적손익 목표 설정
    </div>
    <div class="settings-item" onclick="openAccountModal(event)">
        계좌 관리
    </div>

    <!-- 신규 메뉴 추가 -->
    <div class="settings-item" onclick="openNotificationSettingsModal(event)">
        🔔 알림 설정
    </div>
    <div class="settings-item" onclick="openThemeSettingsModal(event)">
        🎨 테마 설정
    </div>
    <div class="settings-item" onclick="openSecuritySettingsModal(event)">
        🔐 보안 설정
    </div>
    <div class="settings-item" onclick="openDataManagementModal(event)">
        📊 데이터 관리
    </div>
    <div class="settings-item" onclick="openLanguageSettingsModal(event)">
        🌐 언어 설정
    </div>
    <div class="settings-item" onclick="openProfileModal(event)">
        👤 프로필 관리
    </div>
</div>
```

---

## 📱 알림 설정 모달 예시

```html
<!-- 알림 설정 모달 -->
<div class="modal-overlay" id="notificationSettingsModal" onclick="closeNotificationSettingsModal(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
            <div class="modal-title">🔔 알림 설정</div>
            <button class="modal-close" onclick="closeNotificationSettingsModal()">&times;</button>
        </div>
        <div class="modal-body">
            <!-- 거래 알림 -->
            <div class="settings-section">
                <div class="settings-label">거래 알림</div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox" checked>
                        <span class="toggle-text">포지션 청산 시 알림</span>
                    </label>
                </div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox" checked>
                        <span class="toggle-text">손익 목표 달성 시 알림</span>
                    </label>
                </div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox" checked>
                        <span class="toggle-text">손절 발생 시 알림</span>
                    </label>
                </div>
            </div>

            <!-- 계좌 알림 -->
            <div class="settings-section">
                <div class="settings-label">계좌 알림</div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox" checked>
                        <span class="toggle-text">계좌 연동 상태 변경 시</span>
                    </label>
                </div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox" checked>
                        <span class="toggle-text">데이터 동기화 오류 시</span>
                    </label>
                </div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox">
                        <span class="toggle-text">잔고 변동 시 (선택)</span>
                    </label>
                </div>
            </div>

            <!-- 목표 알림 -->
            <div class="settings-section">
                <div class="settings-label">목표 알림</div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox" checked>
                        <span class="toggle-text">일일 목표 달성 시</span>
                    </label>
                </div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox" checked>
                        <span class="toggle-text">월간 목표 달성 시</span>
                    </label>
                </div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox" checked>
                        <span class="toggle-text">등급 승급 시</span>
                    </label>
                </div>
            </div>

            <!-- 시스템 알림 -->
            <div class="settings-section">
                <div class="settings-label">시스템 알림</div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox" checked>
                        <span class="toggle-text">공지사항 등록 시</span>
                    </label>
                </div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox" checked>
                        <span class="toggle-text">시스템 점검 시</span>
                    </label>
                </div>
            </div>

            <!-- 알림 방식 -->
            <div class="settings-section">
                <div class="settings-label">알림 방식</div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox" checked>
                        <span class="toggle-text">웹 푸시 알림</span>
                    </label>
                </div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox" checked>
                        <span class="toggle-text">이메일 알림</span>
                    </label>
                </div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox">
                        <span class="toggle-text">SMS 알림 (유료)</span>
                    </label>
                </div>
            </div>

            <!-- 저장 버튼 -->
            <div class="settings-actions">
                <button class="btn-settings-cancel" onclick="closeNotificationSettingsModal()">취소</button>
                <button class="btn-settings-save" onclick="saveNotificationSettings()">저장</button>
            </div>
        </div>
    </div>
</div>
```

---

## 🎨 테마 설정 모달 예시

```html
<!-- 테마 설정 모달 -->
<div class="modal-overlay" id="themeSettingsModal" onclick="closeThemeSettingsModal(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
            <div class="modal-title">🎨 테마 설정</div>
            <button class="modal-close" onclick="closeThemeSettingsModal()">&times;</button>
        </div>
        <div class="modal-body">
            <!-- 다크 모드 -->
            <div class="settings-section">
                <div class="settings-label">화면 모드</div>
                <div class="theme-options">
                    <div class="theme-option active" onclick="selectTheme('light')">
                        <div class="theme-preview light-preview">
                            <div class="preview-header"></div>
                            <div class="preview-content"></div>
                        </div>
                        <div class="theme-name">⚪ 라이트 모드</div>
                    </div>
                    <div class="theme-option" onclick="selectTheme('dark')">
                        <div class="theme-preview dark-preview">
                            <div class="preview-header"></div>
                            <div class="preview-content"></div>
                        </div>
                        <div class="theme-name">⚫ 다크 모드</div>
                    </div>
                    <div class="theme-option" onclick="selectTheme('auto')">
                        <div class="theme-preview auto-preview">
                            <div class="preview-header"></div>
                            <div class="preview-content"></div>
                        </div>
                        <div class="theme-name">🌓 자동</div>
                    </div>
                </div>
            </div>

            <!-- 색상 테마 -->
            <div class="settings-section">
                <div class="settings-label">색상 테마</div>
                <div class="color-options">
                    <div class="color-option active" onclick="selectColor('blue')" style="background: #3B82F6;">
                        🔵 블루
                    </div>
                    <div class="color-option" onclick="selectColor('green')" style="background: #10B981;">
                        🟢 그린
                    </div>
                    <div class="color-option" onclick="selectColor('purple')" style="background: #8B5CF6;">
                        🟣 퍼플
                    </div>
                    <div class="color-option" onclick="selectColor('red')" style="background: #EF4444;">
                        🔴 레드
                    </div>
                </div>
            </div>

            <!-- 저장 버튼 -->
            <div class="settings-actions">
                <button class="btn-settings-cancel" onclick="closeThemeSettingsModal()">취소</button>
                <button class="btn-settings-save" onclick="saveThemeSettings()">저장</button>
            </div>
        </div>
    </div>
</div>
```

---

## 🔐 보안 설정 모달 예시

```html
<!-- 보안 설정 모달 -->
<div class="modal-overlay" id="securitySettingsModal" onclick="closeSecuritySettingsModal(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
            <div class="modal-title">🔐 보안 설정</div>
            <button class="modal-close" onclick="closeSecuritySettingsModal()">&times;</button>
        </div>
        <div class="modal-body">
            <!-- 비밀번호 변경 -->
            <div class="settings-section">
                <div class="settings-label">비밀번호 변경</div>
                <button class="settings-button" onclick="changePassword()">
                    비밀번호 변경하기
                </button>
            </div>

            <!-- 2단계 인증 -->
            <div class="settings-section">
                <div class="settings-label">2단계 인증 (OTP)</div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox" id="otpToggle" onchange="toggleOTP()">
                        <span class="toggle-text">2단계 인증 사용</span>
                    </label>
                </div>
                <div style="font-size: 12px; color: #64748B; margin-top: 8px;">
                    로그인 시 OTP 인증 코드를 추가로 요구합니다.
                </div>
            </div>

            <!-- 로그인 알림 -->
            <div class="settings-section">
                <div class="settings-label">로그인 알림</div>
                <div class="settings-toggle-item">
                    <label class="toggle-label">
                        <input type="checkbox" checked>
                        <span class="toggle-text">새로운 기기에서 로그인 시 알림</span>
                    </label>
                </div>
            </div>

            <!-- 접속 기록 -->
            <div class="settings-section">
                <div class="settings-label">접속 기록</div>
                <button class="settings-button" onclick="viewLoginHistory()">
                    접속 기록 확인
                </button>
            </div>

            <!-- API 키 관리 -->
            <div class="settings-section">
                <div class="settings-label">API 키 관리</div>
                <button class="settings-button" onclick="manageAPIKeys()">
                    API 키 보기/재발급
                </button>
            </div>

            <!-- 닫기 버튼 -->
            <div class="settings-actions">
                <button class="btn-settings-cancel" onclick="closeSecuritySettingsModal()">닫기</button>
            </div>
        </div>
    </div>
</div>
```

---

## 🎯 우선순위별 구현 순서

### 1단계 (필수)
1. **🔔 알림 설정** - 가장 중요
2. **📊 데이터 관리** - 내보내기 기능 필요
3. **🔐 보안 설정** - 계좌 관리 시 필수

### 2단계 (권장)
4. **🎨 테마 설정** - 사용자 경험 개선
5. **👤 프로필 관리** - 기본 기능

### 3단계 (선택)
6. **🌐 언어 설정** - 글로벌 확장 시

---

## ✅ 총정리

**My 설정에 추가할 메뉴**:

| 순서 | 메뉴명 | 우선순위 | 설명 |
|------|--------|----------|------|
| 1 | 거래 시작일 설정 | - | 기존 |
| 2 | 누적손익 목표 설정 | - | 기존 |
| 3 | 계좌 관리 | - | 기존 |
| 4 | 🔔 알림 설정 | ⭐⭐⭐ | 신규 (필수) |
| 5 | 🎨 테마 설정 | ⭐⭐ | 신규 (권장) |
| 6 | 🔐 보안 설정 | ⭐⭐⭐ | 신규 (필수) |
| 7 | 📊 데이터 관리 | ⭐⭐⭐ | 신규 (필수) |
| 8 | 🌐 언어 설정 | ⭐ | 신규 (선택) |
| 9 | 👤 프로필 관리 | ⭐⭐ | 신규 (권장) |

**총 6개 메뉴 항목 추가** (기존 3개 → 총 9개)

---

**문서 버전**: 1.0
**최종 수정**: 2025-12-07
