# HDH Fintech Design System v1.0

> **Theme**: Golden Success (금빛 성공)
> **Keywords**: Wealth, Trust, Success, Professional, Exclusive
> **Target**: Prop Firm Traders, Challenge Participants (Premium Trading Platform)

---

## 1. Color Palette (Golden Success)

### Primary Colors
| Role | Name | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | **Amber Gold** | `#F59E0B` | Brand Identity, Headers, Menu Hover (Gold/Premium) |
| **Primary Dark** | **Dark Amber** | `#D97706` | Gradients, Active States, Emphasis (Deep Gold) |
| **Secondary** | **Emerald Green** | `#10B981` | Success, Profit, Primary Actions (Growth/Money) |
| **Secondary Dark** | **Dark Green** | `#059669` | Button Gradients, Strong Emphasis |
| **Tertiary** | **Royal Blue** | `#3B82F6` | Information, Links, Process Steps (Trust/Stability) |
| **Tertiary Navy** | **Navy Blue** | `#1E40AF` | Headings, Documentation Titles (Authority) |

### Neutral Colors
| Role | Name | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | **Light Gray** | `#F8FAFC` | Main Page Background (Slate-50) |
| **Surface** | **Pure White** | `#FFFFFF` | Cards, Sidebars, Panels |
| **Text Main** | **Dark Slate** | `#1F2937` | Primary Text (solution.html) |
| **Text Main Alt** | **Darker Gray** | `#212529` | Primary Text (index.html) |
| **Text Dark** | **Very Dark** | `#0F172A` | Strong Headings |
| **Text Secondary** | **Medium Gray** | `#475569` | Secondary Text, Descriptions |
| **Text Tertiary** | **Muted Gray** | `#64748B` | Labels, Metadata |
| **Text Muted** | **Light Gray Text** | `#94A3B8` | Disabled Text |
| **Border Light** | **Slate 200** | `#E2E8F0` | Dividers, Card Borders |
| **Border Medium** | **Slate 300** | `#CBD5E1` | Strong Borders |
| **Border Dark** | **Slate 400** | `#94A3B8` | Input Fields |

### Semantic Colors
- **Success**: `#10B981` (Emerald Green)
- **Warning**: `#F59E0B` (Amber Gold)
- **Error**: `#EF4444` (Red 500)
- **Info**: `#3B82F6` (Blue 500)

### Hover Colors by Section
**Left Sidebar (Menu) - GOLD Theme**
- Base: `#FFFFFF`
- Hover Background: `#FFF7ED` (Amber-50)
- Hover Text: `#F59E0B` (Amber-500)
- Active Background: `#FEF3C7` (Amber-100)
- Active Text: `#D97706` (Amber-600)

**Right Sidebar (Notices/Diary/Settings) - GREEN Theme**
- Base: `#FFFFFF`
- Hover Background: `#ECFDF5` (Emerald-50)
- Hover Border: `#A7F3D0` (Emerald-200)
- Hover Text: `#10B981` (Emerald-500)
- Strong Text: `#059669` (Emerald-600)

**Shortcuts/External Links - BLUE Theme**
- Base: `#FFFFFF`
- Hover Background: `#EFF6FF` (Blue-50)
- Hover Border: `#93C5FD` (Blue-300)
- Hover Text: `#3B82F6` (Blue-500)

---

## 2. Typography

**Font Family**:
- `Pretendard` (Primary Korean/English) - *For solution.html*
- `Malgun Gothic` (맑은 고딕) - *For index.html*
- Fallback: `Apple SD Gothic Neo`, `sans-serif`

**CDN**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
```

**Scale**:
| Element | Size | Weight | Color | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | 36px | 800 (Extra Bold) | #1E40AF (Navy) | Page Titles (h1 in solution.html) |
| **H1 (Alt)** | 32px | 800 | white | Header Logo |
| **H2** | 28px | 700 (Bold) | #1F2937 | Major Sections |
| **H3** | 22px | 600 (Semi Bold) | #1E40AF | Sub Sections |
| **H4** | 18px | 600 | #475569 | Small Headings |
| **Body** | 15px | 400 (Regular) | #1F2937 | Main Text |
| **Small** | 13px-14px | 400-500 | #64748B | Labels, Metadata |
| **Tiny** | 11px-12px | 600 (Semi Bold) | varies | Badges, Tags |

**Line Heights**:
- **Headings**: 1.2 ~ 1.4
- **Body**: 1.6
- **UI Elements**: 1.5

**Letter Spacing**:
- **Large Headings**: -0.5px to -1px
- **Body Text**: 0 (default)

---

## 3. Spacing & Layout

**Grid System**:
- 4px Base Unit
- **Main Layout**: 3-Column Grid (index.html)
    - Left Sidebar: 300px (Fixed)
    - Center Content: minmax(400px, 720px) (Fluid)
    - Right Sidebar: 300px (Fixed)
    - Gap: 12px

**Layout Structure**:
```
┌────────────────────────────────────────────────┐
│            Header (70px height)                │
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

**Container**:
- Max Width: 1200px ~ 1400px
- Padding: 24px (horizontal)

**Radius**:
- **Small**: 6px (Buttons, Badges)
- **Medium**: 8px (Cards, Inputs)
- **Large**: 12px (Modals, Major Cards)

**Spacing Scale**:
| Token | Size | Usage |
| :--- | :--- | :--- |
| xs | 4px | Icon spacing, tiny gaps |
| sm | 8px | Text spacing, small padding |
| md | 12px | Card gaps, base padding |
| lg | 16px | Section padding |
| xl | 20px | Large padding |
| 2xl | 24px | Section gaps, container padding |
| 3xl | 32px | Card inner padding |
| 4xl | 40px | Header padding |

---

## 4. Components

### Buttons

**Primary Button (Green - Main Action)**
```css
background: linear-gradient(135deg, #10B981 0%, #059669 100%);
color: white;
padding: 10px 20px;
border-radius: 8px;
font-size: 13px;
font-weight: 600;
box-shadow: 0 2px 6px rgba(16, 185, 129, 0.2);
transition: all 0.2s ease;

/* Hover */
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
```

**Download Button (Gold - Premium)**
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

**Secondary Button**
```css
background: #F8FAFC;
color: #475569;
border: 2px solid #CBD5E1;
padding: 8px 16px;
border-radius: 6px;
font-size: 13px;
font-weight: 600;

/* Hover */
background: white;
border-color: #94A3B8;
```

**Logout/Close Button (Header)**
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

---

### Cards

**Basic Card**
```css
background: white;
border-radius: 12px;
padding: 16px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
```

**Process Card**
```css
background: white;
border-radius: 12px;
padding: 30px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
margin-bottom: 16px;
```

**Section Card (Documentation)**
```css
background: white;
border-radius: 12px;
padding: 32px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
margin-bottom: 24px;
```

**Process Step Card**
```css
background: #EFF6FF; /* Blue-50 for active */
background: #F8FAFC; /* Gray for inactive */
padding: 20px 24px;
border-radius: 12px;
border: 1px solid #E2E8F0;
border-left: 4px solid #3B82F6; /* Active only */
box-shadow: 0 2px 6px rgba(59, 130, 246, 0.1); /* Active only */
```

---

### Navigation

**Sidebar Section**
```css
background: white;
border-radius: 12px;
padding: 16px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
```

**Section Title**
```css
font-size: 14px;
font-weight: 700;
color: #64748B;
margin-bottom: 12px;
padding-bottom: 8px;
border-bottom: 1px solid #E2E8F0;
```

**Menu Item (Left Sidebar - Gold)**
```css
display: flex;
align-items: center;
padding: 10px 12px;
border-radius: 8px;
font-size: 14px;
color: #475569;
text-decoration: none;
transition: all 0.15s ease;

/* Hover */
background: #FFF7ED;
color: #F59E0B;

/* Active */
background: #FEF3C7;
color: #D97706;
font-weight: 600;
```

**Notice/Diary Item (Right Sidebar - Green)**
```css
background: white;
border-radius: 8px;
padding: 12px;
font-size: 13px;
color: #64748B;
border: 1px solid transparent;

/* Hover */
background: #ECFDF5;
border-color: #A7F3D0;
color: #059669;
```

**Shortcut Item (Blue)**
```css
background: white;
border-radius: 8px;
padding: 12px;

/* Hover */
background: #EFF6FF;
border: 1px solid #93C5FD;
color: #3B82F6;
```

**TOC Link (Documentation)**
```css
display: block;
padding: 12px 16px;
background: #F8FAFC;
border-radius: 8px;
color: #475569;
text-decoration: none;
font-weight: 500;
border: 1px solid transparent;
transition: all 0.2s ease;

/* Hover */
background: #EFF6FF;
color: #1E40AF;
border-color: #BFDBFE;
transform: translateX(4px);
```

---

### Tables

**Base Table Structure**
```css
width: 100%;
border-collapse: collapse;
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

**Gold Table (Capital/Funding)**
```css
.table-gold {
    border: 2px solid #F59E0B;
}

.table-gold thead {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: white;
}
```

**Green Table (Profit/Revenue)**
```css
.table-green {
    border: 2px solid #10B981;
}

.table-green thead {
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    color: white;
}

.table-green .success-row {
    background: #ECFDF5;
    font-weight: 600;
}
```

---

### Boxes & Alerts

**Highlight Box (Gold)**
```css
background: #FFF7ED;
border-left: 4px solid #F59E0B;
padding: 16px 20px;
border-radius: 8px;
margin: 16px 0;
```

**Info Box (Blue)**
```css
background: #EFF6FF;
border-left: 4px solid #3B82F6;
padding: 16px 20px;
border-radius: 8px;
margin: 16px 0;
box-shadow: 0 2px 6px rgba(59, 130, 246, 0.1);
```

**Success Box (Green)**
```css
background: #ECFDF5;
border-left: 4px solid #10B981;
padding: 16px 20px;
border-radius: 8px;
margin: 16px 0;
```

**Warning Box (Amber)**
```css
background: #FEF3C7;
border-left: 4px solid #F59E0B;
padding: 16px 20px;
border-radius: 8px;
margin: 16px 0;
```

**Danger Box (Red)**
```css
background: #FEE2E2;
border-left: 4px solid #EF4444;
padding: 16px 20px;
border-radius: 8px;
margin: 16px 0;
```

---

### Badges

**Notification Badge**
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
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;
```

**Status Badge**
```css
/* Success */
background: #10B981;
color: white;
padding: 4px 8px;
border-radius: 4px;
font-size: 11px;
font-weight: 600;

/* Warning */
background: #F59E0B;

/* Error */
background: #EF4444;
```

---

### Process Steps

**Step Number**
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

**Step Title**
```css
font-size: 18px;
font-weight: 700;
color: #1F2937;
```

**Step Description**
```css
font-size: 14px;
color: #64748B;
line-height: 1.6;
```

---

### Header

**Main Header (index.html)**
```css
.header {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    height: 70px;
    padding: 0 40px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.logo {
    font-size: 32px;
}

.header-title {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -1px;
    color: white;
}
```

**Document Header (solution.html)**
```css
.header {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    padding: 24px 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.logo {
    font-size: 28px;
    font-weight: 800;
    color: white;
}

.header-subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
}
```

---

### Identity Banner

```css
.identity-banner {
    background: #F8FAFC;
    border-bottom: 1px solid #E2E8F0;
    padding: 16px 24px;
    margin-bottom: 12px;
}

.identity-text {
    font-size: 18.5px;
    color: #F59E0B;
    font-weight: 700;
    line-height: 1.6;
    text-align: center;
}
```

---

### Input Fields

**Text Input**
```css
width: 100%;
padding: 10px 12px;
border: 1px solid #CBD5E1;
border-radius: 6px;
font-size: 14px;
color: #1F2937;
background: white;

/* Focus */
border-color: #10B981;
outline: none;
box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
```

**Textarea**
```css
/* Same as Text Input with: */
min-height: 120px;
resize: vertical;
```

---

## 5. Animations

### Keyframes

**fadeIn**
```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
```

**fadeOut**
```css
@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}
```

**slideUp**
```css
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

**Usage**:
- Hover States: 0.15s ~ 0.2s transition
- Buttons: 0.2s transition
- Cards: 0.2s transition
- All Smooth: `transition: all 0.2s ease`

---

## 6. Shadows

**Shadow Scale**:
```css
/* Card Shadow (Default) */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

/* Header Shadow */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

/* Button Shadow (Default) */
box-shadow: 0 2px 6px rgba(16, 185, 129, 0.2); /* Green */
box-shadow: 0 2px 6px rgba(245, 158, 11, 0.2); /* Gold */

/* Button Shadow (Hover) */
box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); /* Green */
box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4); /* Gold */

/* Info Box Shadow */
box-shadow: 0 2px 6px rgba(59, 130, 246, 0.1); /* Blue */
```

---

## 7. Responsive Breakpoints

**Breakpoints**:
- **Mobile**: < 768px
- **Tablet**: 768px ~ 1199px
- **Desktop**: ≥ 1200px

**Layout Adaptations**:
- **Desktop (≥1200px)**: 3-Column Layout (Left - Center - Right)
- **Tablet (768px - 1199px)**: 2-Column or 1-Column (Sidebars Collapsible/Drawer)
- **Mobile (<768px)**: 1-Column Layout (Sidebars Hidden/Hamburger Menu)

**Font Size Adjustments**:
```css
/* Mobile */
@media (max-width: 767px) {
    h1 { font-size: 28px; }
    h2 { font-size: 22px; }
    h3 { font-size: 18px; }
}
```

---

## 8. Accessibility

**Focus States**:
```css
:focus {
    outline: 2px solid #3B82F6;
    outline-offset: 2px;
}

:focus:not(:focus-visible) {
    outline: none;
}
```

**Color Contrast** (WCAG AA):
- **Dark Text on White**: #1F2937 on #FFFFFF (15.8:1) ✅
- **Medium Text on White**: #475569 on #FFFFFF (8.6:1) ✅
- **Light Text on White**: #64748B on #FFFFFF (5.9:1) ✅
- **White on Golden**: #FFFFFF on #F59E0B (2.4:1) ⚠️ (18px+ OK)
- **White on Green**: #FFFFFF on #10B981 (2.5:1) ⚠️ (18px+ OK)
- **White on Blue**: #FFFFFF on #3B82F6 (3.1:1) ✅

**Keyboard Navigation**:
- Tab Order: Logical (Top to Bottom, Left to Right)
- All Interactive Elements: Keyboard Accessible
- Escape Key: Close Modals

**Screen Readers**:
- All Images: `alt` attribute
- All Interactive Elements: ARIA labels
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`

---

## 9. Implementation Notes

### CSS Reset
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

### Body Defaults
```css
body {
    font-family: 'Pretendard', 'Malgun Gothic', '맑은 고딕', 'Apple SD Gothic Neo', sans-serif;
    background: #F8FAFC;
    color: #1F2937;
    line-height: 1.6;
}
```

### CDN Links (Required)
```html
<!-- Pretendard Font -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">

<!-- Optional: Font Awesome for Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

---

## 10. Brand Assets

### Logo
- **Format**: Text Logo (No Image)
- **Icon**: 🏆 Trophy Emoji
- **Text**: "HDH Fintech"
- **Font**: Pretendard Extra Bold (800)
- **Color**: White (on golden header)

### Favicon
- **Suggested**: 🏆 Trophy or Gold Coin Icon
- **Format**: SVG or PNG (32x32, 64x64)

### Identity Statement
```
"손익을 스스로 확정하고 통제할 수 있는 방법을 제공합니다"
```
- **Font Size**: 18.5px
- **Color**: #F59E0B (Amber Gold)
- **Weight**: 700 (Bold)
- **Placement**: Center banner below header

---

## 11. Color Theme Summary

**Left Sidebar (Preparation/Menu)** → **GOLD** Theme
- Represents: Premium, Starting Point, Capital
- Hover: Amber backgrounds, Gold text

**Center Content (Process/Work)** → **MULTI** Theme
- Process Steps: Blue (Trust/Steps)
- Simulator: Default/White
- Tables: Gold (Capital), Green (Profit), Navy (Info)

**Right Sidebar (Status/Settings)** → **GREEN** Theme
- Represents: Growth, Success, Status
- Hover: Emerald backgrounds, Green text

**External Links/Shortcuts** → **BLUE** Theme
- Represents: Information, Trust, External
- Hover: Blue backgrounds, Blue text

---

## 12. Usage Guidelines

### When to Use Gold (#F59E0B)
✅ Headers, Brand identity, Menu (left sidebar), Capital/funding tables, Warning messages
❌ Success messages, Error messages, Body text

### When to Use Green (#10B981)
✅ Success messages, Profit/revenue tables, Primary action buttons, Right sidebar hover, Positive indicators
❌ Headers, Error messages, Neutral information

### When to Use Blue (#3B82F6)
✅ Information messages, Links, Documentation titles, Process step numbers, External shortcuts
❌ Success messages, Brand identity, Profit indicators

### When to Use Red (#EF4444)
✅ Error messages, Notifications badges, Danger warnings, Loss indicators
❌ Any positive context

---

## 13. File References

**Source Files**:
```
G:\내 드라이브\SUNNY_ECOSYSTEM\HDH_Fintech\0_프로젝트_기획\UI_UX_Mockup\index.html
G:\내 드라이브\SUNNY_ECOSYSTEM\HDH_Fintech\0_프로젝트_기획\UI_UX_Mockup\solution.html
G:\내 드라이브\SUNNY_ECOSYSTEM\HDH_Fintech\0_프로젝트_기획\UI_UX_Mockup\*.html
```

**Reference Design System**:
```
C:\!SSAL_Works_Private\0_프로젝트_기획\1-5_Design_System\DESIGN_SYSTEM_V2.md
```

---

**Design System Version**: 1.0
**Created**: 2025-12-09
**Based on**: Actual Mockup Implementation
**Format Reference**: SSALWorks Design System V2.0
