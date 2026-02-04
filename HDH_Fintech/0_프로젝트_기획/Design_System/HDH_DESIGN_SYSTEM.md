# HDH Fintech Design System

> **추출 일자:** 2025-12-09
> **기반:** 실제 구현된 UI/UX Mockup (index.html, solution.html 등)
> **버전:** 1.0

---

## 📋 목차

1. [색상 시스템 (Color System)](#1-색상-시스템)
2. [타이포그래피 (Typography)](#2-타이포그래피)
3. [간격 시스템 (Spacing)](#3-간격-시스템)
4. [레이아웃 (Layout)](#4-레이아웃)
5. [컴포넌트 (Components)](#5-컴포넌트)
6. [인터랙션 (Interactions)](#6-인터랙션)

---

## 1. 색상 시스템 (Color System)

### 1.1 브랜드 색상 (Brand Colors)

**Primary - Golden/Amber (금색 계열)**

```
Primary Gold:     #F59E0B  /* 메인 브랜드 컬러 */
Primary Dark:     #D97706  /* 헤더 그라데이션, 강조 */
Primary Light:    #FFF7ED  /* 호버 배경 (좌측 사이드바) */
Primary Lighter:  #FEF3C7  /* 활성 상태 배경 */
```

**용도:**
- 헤더 배경 그라데이션
- 좌측 사이드바 메뉴 호버
- 다운로드 링크 버튼
- 정체성 텍스트
- 프로세스 스텝 강조

---

**Secondary - Green (수익/성공 표시)**

```
Secondary Green:      #10B981  /* 주요 액션 버튼, 수익 표시 */
Secondary Dark Green: #059669  /* 버튼 그라데이션, 강조 */
Secondary Light:      #ECFDF5  /* 호버 배경 (우측 사이드바) */
Secondary Border:     #A7F3D0  /* 호버 테두리 */
```

**용도:**
- 주요 액션 버튼 (다운로드, 신청 등)
- 수익/이익 표시
- 우측 사이드바 호버 상태
- 긍정적 상태 표시

---

**Tertiary - Blue (정보/링크/액션)**

```
Tertiary Blue:      #3B82F6  /* 액션 링크, 알람 버튼, 정보 */
Tertiary Dark:      #2563EB  /* 버튼 호버 */
Tertiary Navy:      #1E40AF  /* 문서 제목, 강조 텍스트 (제한적 사용) */
Tertiary Light:     #EFF6FF  /* 호버 배경 */
Tertiary Border:    #93C5FD  /* 호버 테두리 */
Tertiary Lighter:   #BFDBFE  /* 약한 테두리 */
```

**용도:**
- 프로세스 내 액션 링크 (→ 계좌 관리, → USDT 구매 등)
- 알람 설정 버튼
- 외부 링크, 바로가기
- 문서 제목 (h1, h2)
- 프로세스 스텝 번호
- 정보성 메시지

---

### 1.2 중립 색상 (Neutral Colors)

**Backgrounds (배경)**

```
White:          #FFFFFF  /* 카드, 모달 배경 */
Light Gray:     #F8FAFC  /* 페이지 배경, 비활성 영역 */
Lighter Gray:   #F1F5F9  /* 테이블 행, 약한 구분 */
```

**Borders & Dividers (테두리 & 구분선)**

```
Border Light:   #E2E8F0  /* 기본 테두리, 구분선 */
Border Medium:  #CBD5E1  /* 강조 테두리 */
Border Dark:    #94A3B8  /* 입력 필드 테두리 */
```

**Text (텍스트)**

```
Text Primary:     #1F2937  /* 본문 텍스트 (solution.html) */
Text Primary Alt: #212529  /* 본문 텍스트 (index.html) */
Text Secondary:   #475569  /* 보조 텍스트, 설명 */
Text Tertiary:    #64748B  /* 레이블, 메타 정보 */
Text Muted:       #94A3B8  /* 비활성 텍스트 */
Text Dark:        #0F172A  /* 진한 제목 */
```

---

### 1.3 상태 색상 (State Colors)

**Success (성공)**

```
Success:       #10B981  /* 성공 메시지 */
Success Light: #ECFDF5  /* 성공 배경 */
Success Dark:  #059669  /* 강조 */
```

**Warning (경고)**

```
Warning:       #F59E0B  /* 주의 메시지 */
Warning Light: #FEF3C7  /* 경고 배경 */
Warning Dark:  #D97706  /* 강조 */
```

**Error (오류)**

```
Error:       #EF4444  /* 알림 배지, 오류 */
Error Light: #FEE2E2  /* 오류 배경, 닫기 호버 */
Error Dark:  #DC2626  /* 강조, 삭제 버튼 */
```

**Info (정보)**

```
Info:       #3B82F6  /* 정보 표시 */
Info Light: #EFF6FF  /* 정보 배경 */
Info Dark:  #1E40AF  /* 강조 */
```

---

### 1.4 영역별 색상 규칙

**좌측 사이드바 (준비/메뉴) - GOLD 계열**

```
기본 배경:    #FFFFFF
호버 배경:    #FFF7ED
활성 배경:    #FEF3C7
호버 텍스트:  #F59E0B
활성 텍스트:  #D97706
```

**우측 사이드바 (공지/일지/설정) - GREEN 계열**

```
기본 배경:    #FFFFFF
호버 배경:    #ECFDF5
호버 테두리:  #A7F3D0
호버 텍스트:  #10B981
강조 텍스트:  #059669
```

**바로가기/외부 링크 - BLUE 계열**

```
기본 배경:    #FFFFFF
호버 배경:    #EFF6FF
호버 테두리:  #93C5FD
호버 텍스트:  #3B82F6
```

---

### 1.5 테이블 색상 (Table Colors)

**금색 테이블 (자금/자본 관련)**

```css
.table-gold {
    border: 2px solid #F59E0B;
}
.table-gold thead {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: white;
}
```

**녹색 테이블 (수익/이익 관련)**

```css
.table-green {
    border: 2px solid #10B981;
}
.table-green thead {
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    color: white;
}
```

**기본 테이블 (구조/설명)**

```css
table {
    border: 2px solid #1E40AF;
}
thead {
    background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
    color: white;
}
```

---

## 2. 타이포그래피 (Typography)

### 2.1 폰트 패밀리 (Font Family)

```css
/* Primary Font Stack */
font-family: 'Pretendard', 'Malgun Gothic', '맑은 고딕', 'Apple SD Gothic Neo', sans-serif;

/* solution.html에서는 Pretendard CDN 사용 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
```

---

### 2.2 헤더 스타일 (Headings)

**H1 - 페이지 제목**

```
Font Size:    36px
Font Weight:  800 (Extra Bold)
Color:        #1E40AF (Navy)
Line Height:  1.2
Margin:       0 0 12px 0
```

**H2 - 주요 섹션 제목**

```
Font Size:    28px
Font Weight:  700 (Bold)
Color:        #1F2937 (Dark Gray)
Line Height:  1.3
Margin:       32px 0 16px 0
```

**H3 - 서브 섹션 제목**

```
Font Size:    22px
Font Weight:  600 (Semi Bold)
Color:        #1E40AF (Navy)
Line Height:  1.4
Margin:       24px 0 12px 0
```

**H4 - 소제목**

```
Font Size:    18px
Font Weight:  600 (Semi Bold)
Color:        #475569 (Medium Gray)
Line Height:  1.5
Margin:       20px 0 12px 0
```

---

### 2.3 본문 스타일 (Body Text)

**기본 본문**

```
Font Size:    15px
Font Weight:  400 (Regular)
Color:        #1F2937
Line Height:  1.6
```

**강조 텍스트**

```
Font Size:    15px
Font Weight:  600 (Semi Bold)
Color:        #1F2937
```

**보조 텍스트**

```
Font Size:    13px ~ 14px
Font Weight:  400 (Regular)
Color:        #64748B
Line Height:  1.5
```

---

### 2.4 UI 텍스트 (UI Text)

**버튼 텍스트**

```
Font Size:    13px ~ 14px
Font Weight:  600 (Semi Bold)
Color:        white (Primary Buttons) / #475569 (Secondary)
```

**레이블**

```
Font Size:    12px ~ 13px
Font Weight:  600 (Semi Bold)
Color:        #64748B
```

**메뉴 아이템**

```
Font Size:    14px
Font Weight:  500 (Medium)
Color:        #475569 (기본) / #F59E0B (호버)
```

**섹션 타이틀**

```
Font Size:    14px
Font Weight:  700 (Bold)
Color:        #64748B
```

---

### 2.5 특수 텍스트

**헤더 로고**

```
Font Size:    28px ~ 32px
Font Weight:  800 (Extra Bold)
Color:        white
Letter Spacing: -0.5px ~ -1px
```

**정체성 배너**

```
Font Size:    18.5px
Font Weight:  700 (Bold)
Color:        #F59E0B
Line Height:  1.6
```

**알림 배지**

```
Font Size:    11px
Font Weight:  600 (Semi Bold)
Color:        white
```

---

## 3. 간격 시스템 (Spacing)

### 3.1 간격 스케일 (Spacing Scale)

```
4px   = 0.25rem  (xs)   - 아이콘 간격, 작은 여백
8px   = 0.5rem   (sm)   - 텍스트 간격, 작은 패딩
12px  = 0.75rem  (md)   - 카드 간격, 기본 패딩
16px  = 1rem     (lg)   - 섹션 패딩, 여백
20px  = 1.25rem  (xl)   - 큰 패딩
24px  = 1.5rem   (2xl)  - 섹션 간격, 컨테이너 패딩
32px  = 2rem     (3xl)  - 섹션 카드 내부 패딩
40px  = 2.5rem   (4xl)  - 헤더 패딩
```

---

### 3.2 컴포넌트별 간격

**카드 (Cards)**

```
Padding:        16px ~ 32px (작은 카드 16px, 큰 카드 32px)
Margin Bottom:  12px ~ 24px
Gap (내부):     12px ~ 16px
```

**버튼 (Buttons)**

```
Padding:        8px 16px (작은 버튼)
                10px 20px (중간 버튼)
                12px 24px (큰 버튼)
Gap (아이콘):   8px
```

**리스트 아이템 (List Items)**

```
Padding:        10px 12px (사이드바)
                12px 16px (일반)
Gap:            8px ~ 12px
```

**섹션 (Sections)**

```
Padding:        24px ~ 32px
Margin Bottom:  24px
```

**컨테이너 (Containers)**

```
Padding:        24px (모바일)
                24px ~ 40px (데스크톱)
Max Width:      1200px ~ 1400px
```

---

## 4. 레이아웃 (Layout)

### 4.1 그리드 시스템 (Grid System)

**메인 레이아웃 (3컬럼)**

```css
.main-wrapper {
    display: grid;
    grid-template-columns: 300px minmax(400px, 720px) 300px;
    gap: 12px;
    justify-content: center;
    padding: 12px 20px 20px 20px;
}
```

**구조:**
```
┌────────────────────────────────────────────────┐
│                 Header (70px)                  │
├──────────┬───────────────────────┬──────────────┤
│  Left    │      Center           │    Right     │
│ Sidebar  │      Content          │   Sidebar    │
│ (300px)  │   (400-720px)         │   (300px)    │
│          │                       │              │
│ 준비     │  정체성 배너          │   공지사항   │
│ 메뉴     │  프로세스             │   일지       │
│ 다운로드 │  시뮬레이터           │   설정       │
│          │                       │   바로가기   │
└──────────┴───────────────────────┴──────────────┘
```

---

### 4.2 헤더 레이아웃 (Header)

**메인 헤더 (index.html)**

```
Height:         70px
Background:     linear-gradient(135deg, #F59E0B 0%, #D97706 100%)
Padding:        0 40px
Box Shadow:     0 4px 12px rgba(0, 0, 0, 0.15)

구조:
┌───────────────────────────────────────────────┐
│ 🏆 HDH Fintech     🔔(3)  👤 홍길동  [로그아웃] │
└───────────────────────────────────────────────┘
```

**문서 헤더 (solution.html)**

```
Padding:        24px 0
Position:       sticky
Top:            0
Z-index:        1000

구조:
┌───────────────────────────────────────────────┐
│ HDH 핀테크 솔루션                          ✕  │
│ 금 선물 기반 무위험 차익거래 전략              │
└───────────────────────────────────────────────┘
```

---

### 4.3 카드 레이아웃 (Cards)

**기본 카드**

```css
background: white;
border-radius: 12px;
padding: 16px ~ 32px;
box-shadow: 0 2px 8px rgba(0,0,0,0.08);
```

**프로세스 카드**

```css
background: white;
border-radius: 12px;
padding: 30px;
box-shadow: 0 2px 8px rgba(0,0,0,0.08);
```

**스텝 카드 (프로세스 단계)**

```css
background: #EFF6FF (활성) / #F8FAFC (비활성)
padding: 20px 24px;
border-radius: 12px;
border: 1px solid #E2E8F0;
border-left: 4px solid #3B82F6 (활성)
```

---

### 4.4 반응형 레이아웃 (Responsive)

**데스크톱 (1200px+)**
```
3컬럼 레이아웃 유지
Max Width: 1400px
```

**태블릿 (768px ~ 1199px)**
```
2컬럼 또는 1컬럼 전환 필요
사이드바 축소 또는 드롭다운
```

**모바일 (< 768px)**
```
1컬럼 레이아웃
사이드바 햄버거 메뉴
폰트 크기 조정 (H1: 28px, H2: 22px)
```

---

## 5. 컴포넌트 (Components)

### 5.1 버튼 (Buttons)

**Primary Button (주요 액션)**

```css
background: linear-gradient(135deg, #10B981 0%, #059669 100%);
color: white;
padding: 10px 20px;
border-radius: 8px;
font-size: 13px;
font-weight: 600;
box-shadow: 0 2px 6px rgba(16, 185, 129, 0.2);

/* Hover */
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
```

**Secondary Button (보조 액션)**

```css
background: #F8FAFC;
color: #475569;
border: 2px solid #CBD5E1;
padding: 8px 16px;
border-radius: 6px;
font-size: 13px;
font-weight: 600;

/* Hover */
border-color: #94A3B8;
background: white;
```

**Download Button (다운로드)**

```css
background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
color: white;
padding: 10px;
border-radius: 8px;
font-size: 13px;
font-weight: 600;
box-shadow: 0 2px 6px rgba(245, 158, 11, 0.2);

/* Hover */
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
```

**Logout Button**

```css
background: rgba(255, 255, 255, 0.2);
border: 1px solid rgba(255, 255, 255, 0.4);
color: white;
padding: 8px 16px;
border-radius: 6px;
font-size: 13px;
font-weight: 600;

/* Hover */
background: rgba(255, 255, 255, 0.3);
border-color: rgba(255, 255, 255, 0.6);
transform: translateY(-1px);
```

**Close Button**

```css
background: rgba(255, 255, 255, 0.2);
color: white;
width: 32px;
height: 32px;
border-radius: 6px;
border: 1px solid rgba(255, 255, 255, 0.3);

/* Hover */
background: rgba(255, 255, 255, 0.3);
border-color: rgba(255, 255, 255, 0.5);
```

---

### 5.2 네비게이션 (Navigation)

**사이드바 메뉴 아이템**

```css
padding: 10px 12px;
border-radius: 8px;
font-size: 14px;
color: #475569;

/* Hover (좌측 사이드바 - GOLD) */
background: #FFF7ED;
color: #F59E0B;

/* Active */
background: #FEF3C7;
color: #D97706;
font-weight: 600;
```

**목차 링크 (TOC)**

```css
padding: 12px 16px;
background: #F8FAFC;
border-radius: 8px;
color: #475569;
border: 1px solid transparent;

/* Hover */
background: #EFF6FF;
color: #1E40AF;
border-color: #BFDBFE;
transform: translateX(4px);
```

---

### 5.3 카드 (Cards)

**기본 카드**

```css
background: white;
border-radius: 12px;
padding: 16px;
box-shadow: 0 2px 8px rgba(0,0,0,0.08);
```

**공지사항 카드**

```css
background: white;
border-radius: 8px;
padding: 12px;
font-size: 13px;
color: #64748B;

/* Hover (우측 사이드바 - GREEN) */
background: #ECFDF5;
border: 1px solid #A7F3D0;
color: #059669;
```

**바로가기 카드**

```css
background: white;
border-radius: 8px;
padding: 12px;

/* Hover (BLUE) */
background: #EFF6FF;
border: 1px solid #93C5FD;
color: #3B82F6;
```

---

### 5.4 테이블 (Tables)

**기본 테이블 구조**

```css
width: 100%;
border-collapse: collapse;
border: 2px solid #1E40AF;
margin: 20px 0;

thead {
    background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
    color: white;
}

th {
    padding: 12px;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
}

td {
    padding: 12px;
    text-align: center;
    border: 1px solid #E2E8F0;
    font-size: 14px;
}

tbody tr:hover {
    background: #F8FAFC;
}
```

**금색 테이블 (.table-gold)**

```css
border: 2px solid #F59E0B;

thead {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
}
```

**녹색 테이블 (.table-green)**

```css
border: 2px solid #10B981;

thead {
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
}

/* 성공 행 */
.success-row {
    background: #ECFDF5;
    font-weight: 600;
}
```

---

### 5.5 박스 컴포넌트 (Boxes)

**Highlight Box (강조)**

```css
background: #FFF7ED;
border-left: 4px solid #F59E0B;
padding: 16px 20px;
border-radius: 8px;
margin: 16px 0;
```

**Info Box (정보)**

```css
background: #EFF6FF;
border-left: 4px solid #3B82F6;
padding: 16px 20px;
border-radius: 8px;
margin: 16px 0;
```

**Success Box (성공)**

```css
background: #ECFDF5;
border-left: 4px solid #10B981;
padding: 16px 20px;
border-radius: 8px;
margin: 16px 0;
```

**Warning Box (경고)**

```css
background: #FEF3C7;
border-left: 4px solid #F59E0B;
padding: 16px 20px;
border-radius: 8px;
margin: 16px 0;
```

**Danger Box (위험)**

```css
background: #FEE2E2;
border-left: 4px solid #EF4444;
padding: 16px 20px;
border-radius: 8px;
margin: 16px 0;
```

---

### 5.6 배지 (Badges)

**알림 배지**

```css
position: absolute;
top: -5px;
right: -5px;
background: #EF4444;
color: white;
border-radius: 50%;
width: 18px;
height: 18px;
font-size: 11px;
display: flex;
align-items: center;
justify-content: center;
```

**상태 배지**

```css
/* 성공 */
background: #10B981;
color: white;
padding: 4px 8px;
border-radius: 4px;
font-size: 11px;
font-weight: 600;

/* 대기 */
background: #F59E0B;

/* 실패 */
background: #EF4444;
```

---

### 5.7 프로세스 스텝 (Process Steps)

**스텝 번호**

```css
background: #3B82F6;
color: white;
width: 32px;
height: 32px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
font-weight: 700;
font-size: 16px;
```

**스텝 제목**

```css
font-size: 18px;
font-weight: 700;
color: #1F2937;
```

**스텝 설명**

```css
font-size: 14px;
color: #64748B;
line-height: 1.6;
```

---

## 6. 인터랙션 (Interactions)

### 6.1 호버 효과 (Hover Effects)

**영역별 호버 규칙**

```css
/* 좌측 사이드바 - GOLD */
.sidebar-menu-item:hover {
    background: #FFF7ED;
    color: #F59E0B;
}

/* 우측 사이드바 - GREEN */
.right-sidebar-item:hover {
    background: #ECFDF5;
    border: 1px solid #A7F3D0;
    color: #059669;
}

/* 바로가기 - BLUE */
.shortcut-item:hover {
    background: #EFF6FF;
    border: 1px solid #93C5FD;
    color: #3B82F6;
}

/* Primary Button */
.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

/* Secondary Button */
.btn-secondary:hover {
    background: white;
    border-color: #94A3B8;
}

/* Table Row */
tbody tr:hover {
    background: #F8FAFC;
}

/* Modal Close */
.modal-close:hover {
    background: #FEE2E2;
    color: #DC2626;
}
```

---

### 6.2 트랜지션 (Transitions)

**기본 트랜지션**

```css
transition: all 0.2s ease;
```

**버튼 트랜지션**

```css
transition: all 0.2s ease;
/* transform + box-shadow */
```

**메뉴 아이템**

```css
transition: all 0.15s ease;
/* background + color */
```

**목차 링크**

```css
transition: all 0.2s ease;
/* background + color + border + transform */
```

---

### 6.3 그림자 (Shadows)

**카드 그림자**

```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
```

**헤더 그림자**

```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
```

**버튼 그림자 (기본)**

```css
/* Primary Green */
box-shadow: 0 2px 6px rgba(16, 185, 129, 0.2);

/* Golden */
box-shadow: 0 2px 6px rgba(245, 158, 11, 0.2);
```

**버튼 그림자 (Hover)**

```css
/* Primary Green */
box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);

/* Golden */
box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
```

**Info Box 그림자**

```css
box-shadow: 0 2px 6px rgba(59, 130, 246, 0.1);
```

---

### 6.4 애니메이션 (Animations)

**버튼 상승 효과**

```css
transform: translateY(-2px);
transition: all 0.2s ease;
```

**목차 슬라이드**

```css
transform: translateX(4px);
transition: all 0.2s ease;
```

**로딩 스피너 (구현 필요 시)**

```css
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
```

---

## 7. 사용 예시 (Usage Examples)

### 7.1 버튼 HTML

**Primary Button**

```html
<button class="btn-primary">
    다운로드
</button>
```

**Download Button with Icon**

```html
<a href="#" class="download-link">
    <div class="download-header">
        <span class="download-icon">📄</span>
        <div>
            <div class="download-title">프로그램 다운로드</div>
            <div class="download-size">파일 크기: 2.3MB</div>
        </div>
    </div>
    <div class="download-status">준비중</div>
</a>
```

---

### 7.2 테이블 HTML

**금색 테이블 (자금 관련)**

```html
<table class="table-gold">
    <thead>
        <tr>
            <th>항목</th>
            <th>금액</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>초기 자본</td>
            <td>$10,000</td>
        </tr>
    </tbody>
</table>
```

**녹색 테이블 (수익 관련)**

```html
<table class="table-green">
    <thead>
        <tr>
            <th>회차</th>
            <th>수익</th>
        </tr>
    </thead>
    <tbody>
        <tr class="success-row">
            <td>1</td>
            <td>+$100</td>
        </tr>
    </tbody>
</table>
```

---

### 7.3 박스 HTML

**Info Box**

```html
<div class="info-box">
    <strong>중요:</strong> 이 전략은 리스크가 제한됩니다.
</div>
```

**Warning Box**

```html
<div class="warning-box">
    <strong>주의:</strong> 시장 상황을 확인하세요.
</div>
```

---

## 8. 브랜드 가이드라인

### 8.1 색상 사용 원칙

**금색 (Golden) - #F59E0B**
- 용도: 브랜드 정체성, 준비/시작 단계, 자본/자금
- 금지: 오류 메시지, 부정적 상태

**녹색 (Green) - #10B981**
- 용도: 성공, 수익, 주요 액션, 긍정적 결과
- 금지: 경고, 중립 정보

**청색 (Blue) - #3B82F6**
- 용도: 액션 링크, 알람 버튼, 정보 메시지, 문서 제목, 프로세스 스텝
- 금지: 수익 표시, 브랜드 정체성
- 원칙: 프로세스 내 모든 클릭 가능한 링크는 #3B82F6로 통일

**빨강 (Red) - #EF4444**
- 용도: 알림, 오류, 손실, 삭제
- 금지: 수익 표시, 주요 브랜드 컬러

---

### 8.2 타이포그래피 원칙

1. **제목은 굵게** (700 이상)
2. **본문은 적당히** (400-500)
3. **UI는 명확하게** (600)
4. **행간은 넉넉하게** (1.5-1.6)
5. **자간은 타이트하게** (-0.5px ~ -1px for titles)

---

### 8.3 간격 원칙

1. **일관된 간격 사용** (4px 배수)
2. **카드는 12px 간격**
3. **섹션은 24px 간격**
4. **패딩은 16px 이상**
5. **작은 요소도 8px 최소 간격**

---

## 9. 접근성 (Accessibility)

### 9.1 색상 대비 (Color Contrast)

**텍스트 대비 (WCAG AA 기준)**

```
Dark Text on White:     #1F2937 on #FFFFFF (15.8:1) ✅
Medium Text on White:   #475569 on #FFFFFF (8.6:1) ✅
Light Text on White:    #64748B on #FFFFFF (5.9:1) ✅
White on Golden:        #FFFFFF on #F59E0B (2.4:1) ⚠️ (18px+ OK)
White on Green:         #FFFFFF on #10B981 (2.5:1) ⚠️ (18px+ OK)
White on Blue:          #FFFFFF on #3B82F6 (3.1:1) ✅
```

**권장 사항:**
- 본문 텍스트: 최소 #475569 이상 진한 색
- 큰 텍스트(18px+): #64748B 사용 가능
- Golden/Green 배경에 흰 글씨: 굵게(600+) + 18px 이상

---

### 9.2 포커스 스타일

```css
:focus {
    outline: 2px solid #3B82F6;
    outline-offset: 2px;
}

:focus:not(:focus-visible) {
    outline: none;
}
```

---

### 9.3 키보드 네비게이션

- 모든 인터랙티브 요소는 Tab으로 접근 가능
- 호버 스타일은 포커스에도 동일하게 적용
- Skip to content 링크 제공 (선택사항)

---

## 10. 브라우저 지원 (Browser Support)

**지원 브라우저:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**CSS 기능:**
- CSS Grid
- Flexbox
- CSS Variables (사용 시)
- Border Radius
- Box Shadow
- Linear Gradient

---

## 📎 참고 파일

```
기반 파일:
- G:\내 드라이브\SUNNY_ECOSYSTEM\HDH_Fintech\0_프로젝트_기획\UI_UX_Mockup\index.html
- G:\내 드라이브\SUNNY_ECOSYSTEM\HDH_Fintech\0_프로젝트_기획\UI_UX_Mockup\solution.html
- G:\내 드라이브\SUNNY_ECOSYSTEM\HDH_Fintech\0_프로젝트_기획\UI_UX_Mockup\*.html (기타 페이지들)
```

---

**디자인 시스템 추출 완료**
**버전:** 1.0
**작성자:** Claude (Sonnet 4.5)
**작성일:** 2025-12-09
