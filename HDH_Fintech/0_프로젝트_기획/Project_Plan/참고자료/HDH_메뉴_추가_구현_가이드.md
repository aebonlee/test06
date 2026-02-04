# HDH Fintech 메뉴 추가 구현 가이드

**작성일**: 2025-12-07
**목적**: 개선된 메뉴를 실제 index.html에 추가하는 단계별 구현 방법

---

## 📋 목차

1. [현재 메뉴 구조 확인](#1-현재-메뉴-구조-확인)
2. [Phase 1: 핵심 메뉴 추가 (즉시 구현)](#2-phase-1-핵심-메뉴-추가-즉시-구현)
3. [Phase 2: 확장 메뉴 추가](#3-phase-2-확장-메뉴-추가)
4. [JavaScript 함수 추가](#4-javascript-함수-추가)
5. [CSS 스타일 추가](#5-css-스타일-추가)

---

## 1. 현재 메뉴 구조 확인

### 현재 우측 사이드바 구조 (index.html 2783-2900줄)

```html
<!-- My 설정 (현재) -->
<div class="widget">
    <div class="widget-title">
        <span class="widget-icon">⚙️</span>
        My 설정
    </div>
    <div class="settings-item" onclick="openSettingsModal(event)">
        거래 시작일 설정
    </div>
    <div class="settings-item" onclick="openGoalModal(event)">
        누적손익 목표 설정
    </div>
    <div class="settings-item" onclick="openAccountModal(event)">
        계좌 관리
    </div>
</div>

<!-- My 누적손익 (현재) -->
<div class="widget">
    <div class="widget-title">
        <span class="widget-icon">📊</span>
        My 누적손익
    </div>
    <!-- 월/연 누적손익 표시 -->
</div>
```

---

## 2. Phase 1: 핵심 메뉴 추가 (즉시 구현)

### 2.1 빠른 액션 버튼 추가

**위치**: 우측 사이드바 최상단 (2714줄 직후)

**추가할 코드**:

```html
<!-- 빠른 액션 버튼 (신규 추가) -->
<div class="widget" style="background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%); color: white; border: none;">
    <div class="widget-title" style="color: white; border-bottom: 1px solid rgba(255,255,255,0.2);">
        <span class="widget-icon">⚡</span>
        빠른 액션
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 4px 0;">
        <button onclick="openAccountDashboard()" class="quick-action-btn">
            <span style="font-size: 20px;">💼</span>
            <span style="font-size: 12px; margin-top: 4px;">계좌 대시보드</span>
        </button>
        <button onclick="openAccountModal(event)" class="quick-action-btn">
            <span style="font-size: 20px;">➕</span>
            <span style="font-size: 12px; margin-top: 4px;">계좌 추가</span>
        </button>
        <button onclick="openTradeHistory()" class="quick-action-btn">
            <span style="font-size: 20px;">📅</span>
            <span style="font-size: 12px; margin-top: 4px;">거래 내역</span>
        </button>
        <button onclick="openNotificationCenter()" class="quick-action-btn">
            <span style="font-size: 20px;">🔔</span>
            <span style="font-size: 12px; margin-top: 4px;">알림 센터</span>
        </button>
    </div>
</div>
```

**CSS 추가** (styles.css 또는 `<style>` 태그 내):

```css
.quick-action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 12px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.quick-action-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.quick-action-btn:active {
    transform: translateY(0);
}
```

---

### 2.2 My 설정에 "계좌 현황 대시보드" 서브메뉴 추가

**위치**: 기존 "계좌 관리" (2795-2797줄) 수정

**기존 코드**:
```html
<div class="settings-item" onclick="openAccountModal(event)">
    계좌 관리
</div>
```

**변경 후**:
```html
<!-- 계좌 관리를 확장 가능한 메뉴로 변경 -->
<div class="settings-item expandable" onclick="toggleAccountSubmenu(this)">
    <span>💼 계좌 관리</span>
    <span class="expand-arrow">▶</span>
</div>
<div class="submenu-list" id="accountSubmenu" style="display: none;">
    <div class="submenu-item" onclick="openAccountDashboard()">
        <span style="color: #3B82F6;">📊</span> 계좌 현황 대시보드
    </div>
    <div class="submenu-item" onclick="openAccountModal(event)">
        <span style="color: #10B981;">➕</span> 새 계좌 추가
    </div>
    <div class="submenu-item" onclick="openAccountList()">
        <span style="color: #8B5CF6;">🔗</span> 연결된 계좌 관리
    </div>
    <div class="submenu-item" onclick="openAccountLog()">
        <span style="color: #64748B;">📜</span> 계좌 연동 로그
    </div>
</div>

<!-- 알림 설정 추가 (신규) -->
<div class="settings-item" onclick="openNotificationSettings(event)">
    🔔 알림 설정
</div>
```

**JavaScript 함수 추가**:

```javascript
// 계좌 관리 서브메뉴 토글
function toggleAccountSubmenu(element) {
    const submenu = document.getElementById('accountSubmenu');
    const arrow = element.querySelector('.expand-arrow');

    if (submenu.style.display === 'none') {
        submenu.style.display = 'block';
        arrow.textContent = '▼';
    } else {
        submenu.style.display = 'none';
        arrow.textContent = '▶';
    }
}
```

---

### 2.3 My 대시보드 (My 누적손익 개선)

**위치**: 기존 "My 누적손익" 위젯 (2800-2842줄) 전체 교체

**기존 제목 변경**:
```html
<div class="widget-title">
    <span class="widget-icon">📊</span>
    My 대시보드
</div>
```

**내용 개선** (기존 2807-2841줄 교체):

```html
<!-- 탭 네비게이션 추가 -->
<div class="dashboard-tabs" style="display: flex; gap: 8px; margin-bottom: 16px; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px;">
    <button class="tab-btn active" onclick="switchDashboardTab('summary')">종합</button>
    <button class="tab-btn" onclick="switchDashboardTab('account')">계좌별</button>
    <button class="tab-btn" onclick="switchDashboardTab('stats')">통계</button>
</div>

<!-- 종합 손익 현황 -->
<div id="dashboardSummary" class="dashboard-content">
    <!-- 월 누적 손익 (개선) -->
    <div style="margin-bottom: 16px; padding: 16px; background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%); border-radius: 12px; border: 1px solid #BBF7D0;">
        <div style="font-size: 12px; color: #166534; margin-bottom: 8px;">월 누적 손익</div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <span style="font-size: 22px; font-weight: 700; color: #15803D;">₩5,160,000</span>
            <span style="font-size: 11px; color: #15803D; background: #BBF7D0; padding: 4px 8px; border-radius: 6px;">+12% ▲</span>
        </div>
        <!-- 프로그레스 바 -->
        <div style="background: #DCFCE7; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
            <div style="background: #10B981; height: 100%; width: 97%; transition: width 0.5s;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: #166534;">
            <span>목표 달성률: 97% ✅</span>
            <span>목표: ₩5,320,000</span>
        </div>
    </div>

    <!-- 연 누적 손익 (개선) -->
    <div style="margin-bottom: 16px; padding: 16px; background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%); border-radius: 12px; border: 1px solid #A7F3D0;">
        <div style="font-size: 12px; color: #065F46; margin-bottom: 8px;">연 누적 손익</div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <span style="font-size: 22px; font-weight: 700; color: #047857;">₩58,920,000</span>
            <span style="font-size: 11px; color: #047857; background: #A7F3D0; padding: 4px 8px; border-radius: 6px;">+8% ▲</span>
        </div>
        <!-- 프로그레스 바 -->
        <div style="background: #D1FAE5; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
            <div style="background: #10B981; height: 100%; width: 84%; transition: width 0.5s;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: #065F46;">
            <span>목표 달성률: 84% 🎯</span>
            <span>목표: ₩70,000,000</span>
        </div>
    </div>

    <!-- My 레벨 & 랭킹 (기존 유지) -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div style="padding: 12px; background: #FEF2F2; border-radius: 10px; border: 1px solid #FEE2E2;">
            <div style="font-size: 11px; color: #991B1B; margin-bottom: 6px;">My 레벨</div>
            <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 18px; font-weight: 700; color: #DC2626;">Lv.10</span>
                <span style="font-size: 10px; color: #991B1B;">상위 1%</span>
            </div>
        </div>
        <div style="padding: 12px; background: #F0FDF4; border-radius: 10px; border: 1px solid #BBF7D0;">
            <div style="font-size: 11px; color: #166534; margin-bottom: 6px;">My 랭킹</div>
            <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 18px; font-weight: 700; color: #15803D;">5위</span>
                <span style="font-size: 10px; color: #166534;">/ 1,000명</span>
            </div>
        </div>
    </div>
</div>

<!-- 계좌별 손익 (신규) -->
<div id="dashboardAccount" class="dashboard-content" style="display: none;">
    <div style="font-size: 13px; font-weight: 600; color: #0F172A; margin-bottom: 12px;">계좌별 월 손익</div>

    <!-- 챌린지 계좌 -->
    <div class="account-profit-card" style="margin-bottom: 10px; padding: 12px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div>
                <div style="font-size: 12px; font-weight: 600; color: #0F172A;">챌린지 계좌</div>
                <div style="font-size: 10px; color: #64748B;">Enso Markets</div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 16px; font-weight: 700; color: #15803D;">+₩3,580,000</div>
                <div style="font-size: 10px; color: #15803D;">🟢 연동 중</div>
            </div>
        </div>
        <!-- 프로그레스 바 -->
        <div style="background: #DCFCE7; height: 6px; border-radius: 3px; overflow: hidden;">
            <div style="background: #10B981; height: 100%; width: 69%;"></div>
        </div>
    </div>

    <!-- 보험금 계좌 -->
    <div class="account-profit-card" style="margin-bottom: 10px; padding: 12px; background: #FEF2F2; border: 1px solid #FEE2E2; border-radius: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div>
                <div style="font-size: 12px; font-weight: 600; color: #0F172A;">보험금 계좌</div>
                <div style="font-size: 10px; color: #64748B;">Enso Markets</div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 16px; font-weight: 700; color: #DC2626;">-₩890,000</div>
                <div style="font-size: 10px; color: #15803D;">🟢 연동 중</div>
            </div>
        </div>
        <!-- 프로그레스 바 (손실) -->
        <div style="background: #FEE2E2; height: 6px; border-radius: 3px; overflow: hidden;">
            <div style="background: #EF4444; height: 100%; width: 17%;"></div>
        </div>
    </div>

    <!-- 펀딩 A 계좌 -->
    <div class="account-profit-card" style="margin-bottom: 10px; padding: 12px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div>
                <div style="font-size: 12px; font-weight: 600; color: #0F172A;">펀딩 A 계좌</div>
                <div style="font-size: 10px; color: #64748B;">INFINOX</div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 16px; font-weight: 700; color: #15803D;">+₩1,720,000</div>
                <div style="font-size: 10px; color: #EF4444;">🔴 연결 해제</div>
            </div>
        </div>
        <!-- 프로그레스 바 -->
        <div style="background: #DCFCE7; height: 6px; border-radius: 3px; overflow: hidden;">
            <div style="background: #10B981; height: 100%; width: 33%;"></div>
        </div>
    </div>

    <!-- 펀딩 B 계좌 -->
    <div class="account-profit-card" style="margin-bottom: 10px; padding: 12px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div>
                <div style="font-size: 12px; font-weight: 600; color: #0F172A;">펀딩 B 계좌</div>
                <div style="font-size: 10px; color: #64748B;">INFINOX</div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 16px; font-weight: 700; color: #15803D;">+₩750,000</div>
                <div style="font-size: 10px; color: #15803D;">🟢 연동 중</div>
            </div>
        </div>
        <!-- 프로그레스 바 -->
        <div style="background: #DCFCE7; height: 6px; border-radius: 3px; overflow: hidden;">
            <div style="background: #10B981; height: 100%; width: 14%;"></div>
        </div>
    </div>

    <button onclick="openAccountDashboard()" style="width: 100%; padding: 10px; margin-top: 8px; background: white; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 12px; color: #3B82F6; font-weight: 600; cursor: pointer;">
        전체 계좌 상세 보기 →
    </button>
</div>

<!-- 통계 요약 (신규) -->
<div id="dashboardStats" class="dashboard-content" style="display: none;">
    <div style="font-size: 13px; font-weight: 600; color: #0F172A; margin-bottom: 12px;">거래 통계</div>

    <div style="background: #F8FAFC; padding: 12px; border-radius: 10px; margin-bottom: 12px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
                <div style="font-size: 11px; color: #64748B; margin-bottom: 4px;">총 거래 횟수</div>
                <div style="font-size: 18px; font-weight: 700; color: #0F172A;">247회</div>
            </div>
            <div>
                <div style="font-size: 11px; color: #64748B; margin-bottom: 4px;">승률</div>
                <div style="font-size: 18px; font-weight: 700; color: #10B981;">84%</div>
            </div>
        </div>
    </div>

    <div style="background: #F8FAFC; padding: 12px; border-radius: 10px; margin-bottom: 12px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
                <div style="font-size: 11px; color: #64748B; margin-bottom: 4px;">평균 손익/건</div>
                <div style="font-size: 16px; font-weight: 700; color: #15803D;">+₩238,000</div>
            </div>
            <div>
                <div style="font-size: 11px; color: #64748B; margin-bottom: 4px;">최대 수익</div>
                <div style="font-size: 16px; font-weight: 700; color: #15803D;">+₩1,950,000</div>
            </div>
        </div>
    </div>

    <div style="background: #FEF2F2; padding: 12px; border-radius: 10px; border: 1px solid #FEE2E2;">
        <div style="font-size: 11px; color: #991B1B; margin-bottom: 4px;">최대 손실</div>
        <div style="font-size: 16px; font-weight: 700; color: #DC2626;">-₩369,000</div>
    </div>
</div>
```

**JavaScript 탭 전환 함수 추가**:

```javascript
// 대시보드 탭 전환
function switchDashboardTab(tabName) {
    // 모든 탭 버튼 비활성화
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 모든 콘텐츠 숨김
    document.querySelectorAll('.dashboard-content').forEach(content => {
        content.style.display = 'none';
    });

    // 선택된 탭 활성화
    event.target.classList.add('active');

    // 해당 콘텐츠 표시
    if (tabName === 'summary') {
        document.getElementById('dashboardSummary').style.display = 'block';
    } else if (tabName === 'account') {
        document.getElementById('dashboardAccount').style.display = 'block';
    } else if (tabName === 'stats') {
        document.getElementById('dashboardStats').style.display = 'block';
    }
}
```

**CSS 추가**:

```css
.dashboard-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    border-bottom: 1px solid #E2E8F0;
    padding-bottom: 8px;
}

.tab-btn {
    flex: 1;
    padding: 8px 12px;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 8px 8px 0 0;
    font-size: 12px;
    font-weight: 600;
    color: #64748B;
    cursor: pointer;
    transition: all 0.2s;
}

.tab-btn:hover {
    background: #F8FAFC;
    color: #3B82F6;
}

.tab-btn.active {
    background: #3B82F6;
    color: white;
    border-color: #3B82F6;
}
```

---

### 2.4 알림 센터 위젯 추가

**위치**: "My 손익 발생일지" 위젯 이전 (2844줄 이전)

**추가할 코드**:

```html
<!-- 알림 센터 (신규) -->
<div class="widget">
    <div class="widget-title">
        <span class="widget-icon">🔔</span>
        알림 센터
        <span style="background: #EF4444; color: white; font-size: 10px; padding: 2px 6px; border-radius: 10px; margin-left: auto;">3</span>
    </div>

    <!-- 알림 목록 -->
    <div style="max-height: 300px; overflow-y: auto;">
        <!-- 알림 항목 1 -->
        <div class="notification-item" style="padding: 12px; border-bottom: 1px solid #E2E8F0; background: #F0FDF4; border-left: 3px solid #10B981;">
            <div style="display: flex; align-items: start; gap: 10px;">
                <div style="font-size: 20px; line-height: 1;">🎉</div>
                <div style="flex: 1;">
                    <div style="font-size: 12px; font-weight: 600; color: #0F172A; margin-bottom: 4px;">목표 달성!</div>
                    <div style="font-size: 11px; color: #64748B; margin-bottom: 6px;">월 누적손익 목표 97% 달성</div>
                    <div style="font-size: 10px; color: #94A3B8;">10분 전</div>
                </div>
            </div>
        </div>

        <!-- 알림 항목 2 -->
        <div class="notification-item" style="padding: 12px; border-bottom: 1px solid #E2E8F0; background: #ECFDF5; border-left: 3px solid #10B981;">
            <div style="display: flex; align-items: start; gap: 10px;">
                <div style="font-size: 20px; line-height: 1;">💰</div>
                <div style="flex: 1;">
                    <div style="font-size: 12px; font-weight: 600; color: #0F172A; margin-bottom: 4px;">포지션 청산</div>
                    <div style="font-size: 11px; color: #64748B; margin-bottom: 6px;">챌린지 계좌 +₩1,950,000</div>
                    <div style="font-size: 10px; color: #94A3B8;">1시간 전</div>
                </div>
            </div>
        </div>

        <!-- 알림 항목 3 -->
        <div class="notification-item" style="padding: 12px; border-bottom: 1px solid #E2E8F0; background: #FEF2F2; border-left: 3px solid #EF4444;">
            <div style="display: flex; align-items: start; gap: 10px;">
                <div style="font-size: 20px; line-height: 1;">🔴</div>
                <div style="flex: 1;">
                    <div style="font-size: 12px; font-weight: 600; color: #0F172A; margin-bottom: 4px;">계좌 연동 해제</div>
                    <div style="font-size: 11px; color: #64748B; margin-bottom: 6px;">펀딩 A 계좌 연결이 해제됨</div>
                    <div style="font-size: 10px; color: #94A3B8;">2시간 전</div>
                    <button onclick="reconnectAccount('funding-a')" style="margin-top: 6px; padding: 6px 10px; background: #10B981; color: white; border: none; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer;">
                        재연결하기
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 전체 보기 -->
    <button onclick="openNotificationCenter()" style="width: 100%; padding: 10px; margin-top: 8px; background: white; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 12px; color: #3B82F6; font-weight: 600; cursor: pointer;">
        전체 알림 보기 →
    </button>
</div>
```

---

## 3. Phase 2: 확장 메뉴 추가

### 3.1 거래 내역 위젯 추가

**위치**: "My 손익 발생일지" 위젯 직후 (2876줄 이후)

```html
<!-- 거래 내역 조회 (신규) -->
<div class="widget">
    <div class="widget-title">
        <span class="widget-icon">🔍</span>
        거래 내역 조회
    </div>

    <!-- 빠른 필터 -->
    <div style="display: flex; gap: 6px; margin-bottom: 12px;">
        <button class="filter-chip active" onclick="filterTrades('all')">전체</button>
        <button class="filter-chip" onclick="filterTrades('today')">오늘</button>
        <button class="filter-chip" onclick="filterTrades('week')">이번 주</button>
        <button class="filter-chip" onclick="filterTrades('month')">이번 달</button>
    </div>

    <!-- 계좌 필터 -->
    <div style="margin-bottom: 12px;">
        <select id="accountFilter" class="settings-input" style="width: 100%; font-size: 12px; padding: 8px;" onchange="filterByAccount(this.value)">
            <option value="all">전체 계좌</option>
            <option value="challenge">챌린지 계좌</option>
            <option value="insurance">보험금 계좌</option>
            <option value="funding-a">펀딩 A 계좌</option>
            <option value="funding-b">펀딩 B 계좌</option>
        </select>
    </div>

    <!-- 거래 내역 미리보기 (최근 3건) -->
    <div style="margin-bottom: 12px;">
        <!-- 거래 1 -->
        <div class="trade-item" style="padding: 10px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 6px;">
                <div>
                    <div style="font-size: 11px; font-weight: 600; color: #0F172A;">XAUUSD (금 선물)</div>
                    <div style="font-size: 10px; color: #64748B;">챌린지 계좌 • 매수</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 13px; font-weight: 700; color: #15803D;">+₩1,950,000</div>
                    <div style="font-size: 10px; color: #94A3B8;">12/07 10:25</div>
                </div>
            </div>
            <div style="font-size: 10px; color: #64748B;">
                LOT 6.8 • 진입 2650 → 청산 2671.5
            </div>
        </div>

        <!-- 거래 2 -->
        <div class="trade-item" style="padding: 10px; background: #FEF2F2; border: 1px solid #FEE2E2; border-radius: 8px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 6px;">
                <div>
                    <div style="font-size: 11px; font-weight: 600; color: #0F172A;">XAUUSD (금 선물)</div>
                    <div style="font-size: 10px; color: #64748B;">보험금 계좌 • 매도</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 13px; font-weight: 700; color: #DC2626;">-₩194,000</div>
                    <div style="font-size: 10px; color: #94A3B8;">12/07 10:25</div>
                </div>
            </div>
            <div style="font-size: 10px; color: #64748B;">
                LOT 0.9 • 진입 2650 → 청산 2671.5
            </div>
        </div>

        <!-- 거래 3 -->
        <div class="trade-item" style="padding: 10px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 6px;">
                <div>
                    <div style="font-size: 11px; font-weight: 600; color: #0F172A;">XAUUSD (금 선물)</div>
                    <div style="font-size: 10px; color: #64748B;">챌린지 계좌 • 매수</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 13px; font-weight: 700; color: #15803D;">+₩1,950,000</div>
                    <div style="font-size: 10px; color: #94A3B8;">12/06 14:15</div>
                </div>
            </div>
            <div style="font-size: 10px; color: #64748B;">
                LOT 6.8 • 진입 2640 → 청산 2661.5
            </div>
        </div>
    </div>

    <!-- 액션 버튼 -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <button onclick="openTradeHistory()" style="padding: 10px; background: white; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 12px; color: #3B82F6; font-weight: 600; cursor: pointer;">
            전체 내역 →
        </button>
        <button onclick="exportTrades()" style="padding: 10px; background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; font-size: 12px; color: #059669; font-weight: 600; cursor: pointer;">
            📥 내보내기
        </button>
    </div>
</div>
```

**CSS 추가**:

```css
.filter-chip {
    padding: 6px 12px;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    color: #64748B;
    cursor: pointer;
    transition: all 0.2s;
}

.filter-chip:hover {
    background: #F8FAFC;
    border-color: #3B82F6;
    color: #3B82F6;
}

.filter-chip.active {
    background: #3B82F6;
    color: white;
    border-color: #3B82F6;
}

.trade-item {
    transition: all 0.2s;
}

.trade-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

---

## 4. JavaScript 함수 추가

모든 새로운 메뉴에 필요한 JavaScript 함수들을 `<script>` 태그 내 또는 별도 `.js` 파일에 추가합니다.

```javascript
// ========================================
// 계좌 대시보드
// ========================================

function openAccountDashboard() {
    alert('계좌 현황 대시보드를 준비 중입니다.\n\n이 페이지에서는:\n- 모든 계좌의 실시간 연동 상태 확인\n- 계좌별 손익 카드 형태로 표시\n- 빠른 액션 버튼 (상세/설정/해제)\n\n구현 예정');

    // 실제 구현 시:
    // window.location.href = 'account-dashboard.html';
}

function openAccountList() {
    alert('연결된 계좌 관리 페이지를 준비 중입니다.');
}

function openAccountLog() {
    alert('계좌 연동 로그 페이지를 준비 중입니다.\n\n- 동기화 이력 확인\n- 오류 로그 조회');
}

// ========================================
// 알림 센터
// ========================================

function openNotificationCenter() {
    alert('알림 센터 전체 페이지를 준비 중입니다.\n\n- 전체 알림 목록\n- 필터별 분류 (거래/시스템/목표)\n- 읽음/읽지 않음 관리');
}

function openNotificationSettings() {
    alert('알림 설정 페이지를 준비 중입니다.\n\n알림 유형별 ON/OFF:\n- 포지션 청산 알림\n- 목표 달성 알림\n- 계좌 연동 상태 변경\n- 웹 푸시/이메일/SMS 설정');
}

function reconnectAccount(accountId) {
    if (confirm(`${accountId} 계좌를 재연결하시겠습니까?`)) {
        alert('계좌 재연결을 시도합니다...');
        // 실제 구현:
        // API 호출하여 계좌 재연결
        // 성공 시 UI 업데이트
    }
}

// ========================================
// 거래 내역
// ========================================

function openTradeHistory() {
    alert('거래 내역 전체 페이지를 준비 중입니다.\n\n- 상세 필터링 (기간/계좌/손익)\n- 페이지네이션\n- CSV/Excel 내보내기');
}

function filterTrades(period) {
    // 필터 버튼 활성화
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('active');
    });
    event.target.classList.add('active');

    console.log(`거래 내역 필터: ${period}`);
    alert(`${period} 거래 내역을 조회합니다.`);

    // 실제 구현:
    // API 호출하여 해당 기간의 거래 내역 가져오기
}

function filterByAccount(accountId) {
    console.log(`계좌별 필터: ${accountId}`);
    alert(`${accountId} 계좌의 거래 내역을 조회합니다.`);

    // 실제 구현:
    // API 호출하여 해당 계좌의 거래 내역 가져오기
}

function exportTrades() {
    alert('거래 내역 내보내기\n\n선택 옵션:\n- CSV 형식\n- Excel 형식\n- PDF 보고서\n\n구현 예정');

    // 실제 구현:
    // 1. 모달 열기 (형식 선택)
    // 2. 선택된 형식으로 데이터 변환
    // 3. 파일 다운로드
}

// ========================================
// 대시보드 탭 전환
// ========================================

function switchDashboardTab(tabName) {
    // 모든 탭 버튼 비활성화
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 모든 콘텐츠 숨김
    document.querySelectorAll('.dashboard-content').forEach(content => {
        content.style.display = 'none';
    });

    // 선택된 탭 활성화
    event.target.classList.add('active');

    // 해당 콘텐츠 표시
    if (tabName === 'summary') {
        document.getElementById('dashboardSummary').style.display = 'block';
    } else if (tabName === 'account') {
        document.getElementById('dashboardAccount').style.display = 'block';
    } else if (tabName === 'stats') {
        document.getElementById('dashboardStats').style.display = 'block';
    }
}

// ========================================
// 계좌 관리 서브메뉴 토글
// ========================================

function toggleAccountSubmenu(element) {
    const submenu = document.getElementById('accountSubmenu');
    const arrow = element.querySelector('.expand-arrow');

    if (submenu.style.display === 'none' || submenu.style.display === '') {
        submenu.style.display = 'block';
        arrow.textContent = '▼';
        element.style.background = '#F0F9FF';
    } else {
        submenu.style.display = 'none';
        arrow.textContent = '▶';
        element.style.background = '';
    }
}
```

---

## 5. CSS 스타일 추가

전체 CSS를 `<style>` 태그 내 또는 별도 `styles.css` 파일에 추가합니다.

```css
/* ========================================
   빠른 액션 버튼
======================================== */
.quick-action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 12px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.quick-action-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.quick-action-btn:active {
    transform: translateY(0);
}

/* ========================================
   대시보드 탭
======================================== */
.dashboard-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    border-bottom: 1px solid #E2E8F0;
    padding-bottom: 8px;
}

.tab-btn {
    flex: 1;
    padding: 8px 12px;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 8px 8px 0 0;
    font-size: 12px;
    font-weight: 600;
    color: #64748B;
    cursor: pointer;
    transition: all 0.2s;
}

.tab-btn:hover {
    background: #F8FAFC;
    color: #3B82F6;
}

.tab-btn.active {
    background: #3B82F6;
    color: white;
    border-color: #3B82F6;
}

/* ========================================
   계좌 서브메뉴
======================================== */
.settings-item.expandable {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.expand-arrow {
    font-size: 10px;
    color: #94A3B8;
    transition: transform 0.3s;
}

.submenu-list {
    padding-left: 12px;
    margin-top: 8px;
    border-left: 2px solid #E2E8F0;
}

.submenu-item {
    padding: 10px 12px;
    font-size: 12px;
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

.submenu-item:hover {
    background: #F8FAFC;
    color: #3B82F6;
    transform: translateX(4px);
}

/* ========================================
   필터 칩
======================================== */
.filter-chip {
    padding: 6px 12px;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    color: #64748B;
    cursor: pointer;
    transition: all 0.2s;
}

.filter-chip:hover {
    background: #F8FAFC;
    border-color: #3B82F6;
    color: #3B82F6;
}

.filter-chip.active {
    background: #3B82F6;
    color: white;
    border-color: #3B82F6;
}

/* ========================================
   거래 항목
======================================== */
.trade-item {
    transition: all 0.2s;
    cursor: pointer;
}

.trade-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* ========================================
   알림 항목
======================================== */
.notification-item {
    cursor: pointer;
    transition: all 0.2s;
}

.notification-item:hover {
    background: #F8FAFC !important;
}

/* ========================================
   계좌 손익 카드
======================================== */
.account-profit-card {
    cursor: pointer;
    transition: all 0.2s;
}

.account-profit-card:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* ========================================
   반응형 디자인 (모바일)
======================================== */
@media (max-width: 768px) {
    .quick-action-btn {
        padding: 12px 8px;
        font-size: 11px;
    }

    .tab-btn {
        padding: 6px 8px;
        font-size: 11px;
    }

    .filter-chip {
        padding: 5px 10px;
        font-size: 10px;
    }
}
```

---

## 6. 구현 체크리스트

### Phase 1 (즉시 구현 - 1-2주)

- [ ] **1. 빠른 액션 버튼 추가**
  - [ ] HTML 추가 (2714줄 직후)
  - [ ] CSS 스타일 추가
  - [ ] JavaScript 함수 추가

- [ ] **2. My 설정 - 계좌 관리 서브메뉴**
  - [ ] HTML 수정 (2795-2797줄)
  - [ ] 서브메뉴 항목 추가
  - [ ] 토글 함수 추가

- [ ] **3. My 대시보드 개선**
  - [ ] 제목 변경 (My 누적손익 → My 대시보드)
  - [ ] 탭 네비게이션 추가
  - [ ] 종합/계좌별/통계 콘텐츠 추가
  - [ ] 프로그레스 바 스타일 적용
  - [ ] 탭 전환 함수 추가

- [ ] **4. 알림 센터 위젯**
  - [ ] HTML 추가 (2844줄 이전)
  - [ ] 알림 항목 스타일링
  - [ ] 알림 함수 추가

### Phase 2 (단기 구현 - 3-4주)

- [ ] **5. 거래 내역 조회 위젯**
  - [ ] HTML 추가 (2876줄 이후)
  - [ ] 필터 기능 구현
  - [ ] 내보내기 함수 추가

- [ ] **6. 알림 설정 메뉴**
  - [ ] My 설정에 항목 추가
  - [ ] 설정 모달 생성

- [ ] **7. 계좌 현황 대시보드 전체 페이지**
  - [ ] 별도 HTML 페이지 생성
  - [ ] 카드 레이아웃 구현
  - [ ] 실시간 상태 인디케이터

---

## 7. 실제 적용 순서

### Step 1: CSS 추가
1. `index.html` 파일 열기
2. `<style>` 태그 내 또는 별도 `styles.css`에 위의 모든 CSS 복사

### Step 2: JavaScript 함수 추가
1. `<script>` 태그 내 또는 별도 `.js` 파일에 모든 함수 복사
2. 기존 함수와 충돌 없는지 확인

### Step 3: HTML 메뉴 추가
1. **빠른 액션 버튼**: 2714줄 직후 추가
2. **계좌 관리 서브메뉴**: 2795-2797줄 교체
3. **알림 설정**: 2797줄 다음에 추가
4. **My 대시보드 개선**: 2800-2842줄 전체 교체
5. **알림 센터**: 2844줄 이전에 추가
6. **거래 내역**: 2876줄 이후 추가

### Step 4: 테스트
1. 브라우저에서 index.html 열기
2. 각 메뉴 클릭 테스트
3. 탭 전환 테스트
4. 반응형 테스트 (모바일 화면)

---

## 8. 향후 백엔드 연동

현재는 프론트엔드 UI만 구현했습니다. 실제 데이터 연동을 위해서는:

### 필요한 API 엔드포인트

```javascript
// 계좌 관련
GET /api/accounts/summary          // 모든 계좌 요약
GET /api/accounts/:id/detail       // 특정 계좌 상세
GET /api/accounts/:id/sync-status  // 동기화 상태
POST /api/accounts/reconnect       // 계좌 재연결

// 거래 내역
GET /api/trades?period=&account=   // 거래 내역 조회
GET /api/trades/export?format=     // 내보내기

// 알림
GET /api/notifications             // 알림 목록
PUT /api/notifications/:id/read    // 읽음 처리
GET /api/notifications/settings    // 알림 설정 조회
PUT /api/notifications/settings    // 알림 설정 변경

// 대시보드
GET /api/dashboard/summary         // 종합 손익
GET /api/dashboard/accounts        // 계좌별 손익
GET /api/dashboard/stats           // 통계
```

---

## 9. 예상 효과

### 사용자 경험
- ✅ 계좌 상태 확인 시간: **30초 → 3초 (90% 감소)**
- ✅ 원하는 기능 접근 클릭 수: **3-4클릭 → 1-2클릭 (50% 감소)**
- ✅ 빠른 액션으로 주요 기능 **1클릭 접근**

### 데이터 가시성
- ✅ 계좌별 손익 **실시간 확인 가능**
- ✅ 그래프/차트로 **직관적 시각화**
- ✅ 알림 센터로 **중요 이벤트 즉시 확인**

---

**문서 버전**: 1.0
**최종 수정**: 2025-12-07
**작성자**: HDH Fintech 개발팀
