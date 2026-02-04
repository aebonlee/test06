# HDH Fintech 계좌 연동 및 실시간 손익 데이터 자동 수집 프로세스

**버전**: 1.0
**작성일**: 2025-12-07
**목적**: 회원의 MT5 거래 계좌 연동을 통한 실시간 손익 데이터 자동 수집 시스템 설명

---

## 📋 목차

1. [시스템 개요](#1-시스템-개요)
2. [지원 거래소](#2-지원-거래소)
3. [계좌 연동 프로세스](#3-계좌-연동-프로세스)
4. [실시간 데이터 수집](#4-실시간-데이터-수집)
5. [데이터 표시 위치](#5-데이터-표시-위치)
6. [계좌 관리 기능](#6-계좌-관리-기능)
7. [보안 및 개인정보 보호](#7-보안-및-개인정보-보호)
8. [기술 구현 사양](#8-기술-구현-사양)
9. [사용자 시나리오](#9-사용자-시나리오)
10. [FAQ](#10-faq)

---

## 1. 시스템 개요

### 1.1 목적

HDH Fintech 플랫폼은 회원들이 자신의 MT5 거래 계좌를 연동하여 **실시간 손익 데이터를 자동으로 수집**하고, 이를 플랫폼에서 **통합 관리 및 시각화**할 수 있도록 지원합니다.

### 1.2 핵심 기능

| 기능 | 설명 |
|------|------|
| **자동 데이터 수집** | API 연동을 통한 실시간 거래 데이터 자동 가져오기 |
| **누적 손익 계산** | 일별/월별/연별 손익 자동 계산 및 누적 |
| **다중 계좌 관리** | 여러 거래소의 복수 계좌 동시 연동 가능 |
| **실시간 모니터링** | 포지션, 잔고, 손익 실시간 확인 |
| **자동 랭킹** | 전체 회원 중 손익 기반 자동 순위 산출 |

### 1.3 작동 원리

```
[회원의 MT5 계좌]
    ↓ (API Key + Secret)
[HDH Fintech 시스템]
    ↓ (실시간 데이터 요청)
[거래소 API 서버]
    ↓ (거래 데이터 응답)
[HDH 데이터베이스]
    ↓ (자동 계산 및 저장)
[웹 대시보드에 표시]
```

---

## 2. 지원 거래소

### 2.1 현재 지원 브로커

| 거래소 | 종류 | MT5 지원 | 용도 |
|--------|------|----------|------|
| **Enso Markets** | 실거래 | ✅ | 실제 자금 운용 계좌 |
| **INFINOX** | 모의거래 | ✅ | 데모 및 테스트 계좌 |

### 2.2 공통 요구사항

- MT5 (MetaTrader 5) 플랫폼 사용
- API 접근 권한 활성화
- API Key 및 API Secret 발급 필요

---

## 3. 계좌 연동 프로세스

### 3.1 사용자 인터페이스 접근

**경로**: 웹사이트 → 우측 사이드바 → ⚙️ My 설정 → 💼 계좌 관리

```
[HDH Fintech 홈페이지]
    ↓
[우측 사이드바]
    ├─ 📊 My 누적손익
    ├─ ⚙️ My 설정  ← 클릭
    │   ├─ 📅 거래 시작일 설정
    │   └─ 💼 계좌 관리  ← 클릭
    └─ 📢 공지사항
```

### 3.2 계좌 추가 단계별 가이드

#### Step 1: 계좌 관리 모달 열기

**위치**: 우측 사이드바 > My 설정 > 💼 계좌 관리

모달 창 구성:
```
┌─────────────────────────────────────┐
│  💼 계좌 관리                    [×] │
├─────────────────────────────────────┤
│                                     │
│  거래소 계좌를 연결하여 실시간 손익  │
│  데이터를 가져옵니다.               │
│                                     │
│  ┌─ 새 계좌 추가 ─────────────┐    │
│  │                             │    │
│  │  [입력 폼]                  │    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─ 연결된 계좌 ──────────────┐    │
│  │                             │    │
│  │  [계좌 목록]                │    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

#### Step 2: 새 계좌 추가 폼 작성

**필수 입력 항목**:

1. **거래소 선택** (드롭다운)
   - Enso Markets (엔쏘마켓)
   - INFINOX (인피녹스)

2. **계좌 별칭** (텍스트 입력)
   - 예: "메인 계좌", "챌린지 계좌", "펀딩 A 계좌"
   - 사용자가 구분하기 쉬운 이름

3. **API Key** (텍스트 입력)
   - 거래소에서 발급받은 API 키
   - 예: `enso_1a2b3c4d5e6f7g8h9i0j`

4. **API Secret** (비밀번호 입력)
   - 거래소에서 발급받은 비밀 키
   - 보안을 위해 마스킹 처리됨 (●●●●●●●●)

#### Step 3: API 키 발급 방법

**Enso Markets 예시**:

```
1. Enso Markets 웹사이트 로그인
   ↓
2. 계정 설정 > API 관리 메뉴 접속
   ↓
3. "새 API 키 생성" 클릭
   ↓
4. 권한 설정:
   - ✅ 읽기 (거래 내역 조회)
   - ✅ 계좌 정보 조회
   - ❌ 거래 실행 (보안상 비활성화 권장)
   ↓
5. API Key 및 Secret 발급
   ⚠️ Secret은 한 번만 표시되므로 안전하게 보관!
   ↓
6. HDH Fintech에 입력
```

**INFINOX 예시**:

```
1. INFINOX 클라이언트 포털 로그인
   ↓
2. 설정 > API 액세스
   ↓
3. "API 자격 증명 생성"
   ↓
4. 읽기 전용 권한으로 생성
   ↓
5. Key/Secret 복사하여 HDH Fintech에 입력
```

#### Step 4: 계좌 추가 버튼 클릭

입력 완료 후 **[계좌 추가]** 버튼 클릭

**시스템 처리 과정**:

```javascript
// 1. 입력값 검증
- 모든 필드 입력 확인
- API Key 형식 검증
- 중복 계좌 확인

// 2. API 연결 테스트
- 거래소 API 서버에 테스트 요청 전송
- 인증 성공 여부 확인
- 계좌 정보 가져오기 테스트

// 3. 연결 성공 시
- 데이터베이스에 계좌 정보 저장 (Secret은 암호화)
- 연결 상태 "연결됨"으로 설정
- "실시간 손익 연동 중" 상태 활성화

// 4. 사용자 알림
alert("계좌가 성공적으로 추가되었습니다!");
```

#### Step 5: 연결 확인

추가된 계좌는 **"연결된 계좌"** 섹션에 표시됨:

```
┌─────────────────────────────────────────┐
│  메인 계좌              [연결됨]         │
│  Enso Markets (엔쏘마켓)                │
│  API Key: enso_**********************   │
│  실시간 손익 연동 중                     │
│                                         │
│  [연결 해제]  [삭제]                    │
└─────────────────────────────────────────┘
```

---

## 4. 실시간 데이터 수집

### 4.1 수집 데이터 항목

계좌 연동 후 자동으로 수집되는 데이터:

| 데이터 항목 | 수집 주기 | 설명 |
|------------|----------|------|
| **포지션 정보** | 실시간 (5초) | 현재 오픈된 포지션 목록 |
| **거래 내역** | 실시간 (거래 발생 시) | 신규 거래, 청산 내역 |
| **잔고** | 실시간 (5초) | 현재 계좌 잔액 |
| **일별 손익** | 일 1회 (자정) | 하루 종합 손익 |
| **미실현 손익** | 실시간 (5초) | 현재 포지션의 평가 손익 |
| **실현 손익** | 거래 종료 시 | 청산된 포지션의 확정 손익 |

### 4.2 데이터 수집 프로세스

#### 실시간 수집 (5초 주기)

```python
# 의사 코드 (Pseudocode)

while True:
    for account in connected_accounts:
        # 1. API 호출
        response = broker_api.get_account_data(
            api_key=account.api_key,
            api_secret=decrypt(account.api_secret)
        )

        # 2. 데이터 파싱
        positions = response['positions']
        balance = response['balance']
        unrealized_pl = response['unrealized_profit_loss']

        # 3. 데이터베이스 업데이트
        update_account_status(
            account_id=account.id,
            balance=balance,
            positions=positions,
            unrealized_pl=unrealized_pl,
            timestamp=now()
        )

        # 4. 웹소켓으로 실시간 전송
        websocket.send_to_user(
            user_id=account.user_id,
            data={
                'balance': balance,
                'unrealized_pl': unrealized_pl
            }
        )

    sleep(5)  # 5초 대기
```

#### 거래 발생 시 이벤트 기반 수집

```python
# 웹훅 엔드포인트
@app.route('/webhook/trade', method='POST')
def handle_trade_event():
    # 1. 거래소로부터 거래 완료 알림 수신
    trade_data = request.json

    # 2. 손익 계산
    if trade_data['type'] == 'CLOSE':
        realized_pl = calculate_profit_loss(
            entry_price=trade_data['entry_price'],
            exit_price=trade_data['exit_price'],
            lot_size=trade_data['lot_size']
        )

        # 3. 누적 손익 업데이트
        update_accumulated_profit(
            user_id=trade_data['user_id'],
            daily_pl=realized_pl,
            date=today()
        )

        # 4. 일별 거래 일지에 기록
        add_trade_diary_entry(
            user_id=trade_data['user_id'],
            date=today(),
            profit_loss=realized_pl,
            trade_details=trade_data
        )
```

#### 일일 정산 (자정 실행)

```python
# 스케줄러: 매일 자정에 실행
@scheduler.scheduled_job('cron', hour=0, minute=0)
def daily_settlement():
    for user in all_users:
        # 1. 오늘 하루 총 손익 계산
        daily_total = sum(user.today_trades['realized_pl'])

        # 2. 월 누적 손익 업데이트
        update_monthly_profit(user.id, daily_total)

        # 3. 연 누적 손익 업데이트
        update_yearly_profit(user.id, daily_total)

        # 4. 랭킹 재계산
        recalculate_ranking()

        # 5. 회원 등급 업데이트
        update_user_level(user.id)
```

### 4.3 데이터 흐름도

```
[MT5 거래 발생]
    ↓
[거래소 서버에 기록]
    ↓
[HDH 시스템이 API로 데이터 요청] (5초 주기 또는 웹훅)
    ↓
[거래 데이터 수신]
    ├─ 포지션 정보
    ├─ 거래 내역
    ├─ 잔고 변화
    └─ 손익 정보
    ↓
[데이터 가공 및 계산]
    ├─ 실현 손익 계산
    ├─ 미실현 손익 계산
    ├─ 누적 손익 업데이트
    └─ 수익률 계산
    ↓
[데이터베이스 저장]
    ├─ 거래 내역 테이블
    ├─ 일별 손익 테이블
    ├─ 누적 손익 테이블
    └─ 계좌 상태 테이블
    ↓
[웹 인터페이스 업데이트]
    ├─ My 누적손익 위젯
    ├─ 일별 거래 일지
    └─ 랭킹 시스템
```

### 4.4 일자별 계좌별 상세 손익 데이터 수집 및 저장 프로세스

#### 4.4.1 데이터 수집 주기 및 방식

**3단계 수집 전략**:

| 수집 유형 | 주기 | 목적 | 데이터 항목 |
|----------|------|------|------------|
| **실시간 수집** | 5초 | 포지션 모니터링 | 미실현 손익, 현재가, 잔고 |
| **거래 발생 수집** | 즉시 (웹훅) | 거래 내역 기록 | 체결가, 실현 손익, 거래 시간 |
| **일별 정산 수집** | 매일 자정 | 일별 통계 집계 | 일 총 손익, 거래 횟수, 승률 |

#### 4.4.2 상세 데이터베이스 스키마

##### AccountDailyProfitLoss (계좌별 일별 손익) 테이블

```javascript
{
    _id: ObjectId,
    user_id: ObjectId,          // 회원 ID
    account_id: ObjectId,       // 계좌 ID
    date: Date,                 // 일자 (YYYY-MM-DD)

    // 거래 통계
    total_trades: Number,       // 총 거래 횟수
    win_trades: Number,         // 이익 거래 수
    loss_trades: Number,        // 손실 거래 수
    win_rate: Number,           // 승률 (%)

    // 손익 상세
    gross_profit: Number,       // 총 이익 (이익 거래 합계)
    gross_loss: Number,         // 총 손실 (손실 거래 합계)
    net_profit_loss: Number,    // 순손익 (총이익 - 총손실)

    // 계좌 상태
    opening_balance: Number,    // 시작 잔고
    closing_balance: Number,    // 종료 잔고
    daily_return_pct: Number,   // 일 수익률 (%)

    // 누적 데이터
    accumulated_pl: Number,     // 누적 손익 (거래 시작일부터)

    // 거래 상세 (배열)
    trades: [{
        trade_id: String,       // 거래소 거래 ID
        symbol: String,         // 상품 (XAUUSD)
        type: String,           // BUY/SELL
        lot_size: Number,       // 랏 크기
        entry_price: Number,    // 진입가
        exit_price: Number,     // 청산가
        entry_time: Date,       // 진입 시간
        exit_time: Date,        // 청산 시간
        profit_loss: Number,    // 손익
        pips: Number,           // 포인트 수
        commission: Number,     // 수수료
        swap: Number            // 스왑
    }],

    // 메타 정보
    created_at: Date,
    updated_at: Date,
    sync_status: String         // "synced" | "syncing" | "failed"
}
```

##### TradeHistory (거래 내역 상세) 테이블

```javascript
{
    _id: ObjectId,
    user_id: ObjectId,
    account_id: ObjectId,
    trade_id: String,           // 거래소 원본 ID

    // 기본 정보
    symbol: String,             // XAUUSD
    type: String,               // BUY/SELL/BALANCE
    lot_size: Number,           // 6.8

    // 가격 정보
    entry_price: Number,        // 2650.00
    exit_price: Number,         // 2671.50
    current_price: Number,      // 실시간 현재가 (오픈 포지션)

    // 손익 정보
    realized_pl: Number,        // 실현 손익 (청산 시)
    unrealized_pl: Number,      // 미실현 손익 (오픈 시)
    pips: Number,               // 21.5

    // 비용
    commission: Number,         // 수수료
    swap: Number,               // 스왑 (하룻밤 보유 수수료)

    // TP/SL
    take_profit: Number,        // 익절가
    stop_loss: Number,          // 손절가

    // 시간 정보
    entry_time: Date,           // 2024-12-07 10:30:00
    exit_time: Date,            // 2024-12-07 11:00:00
    duration_minutes: Number,   // 30분

    // 상태
    status: String,             // "open" | "closed" | "cancelled"
    close_reason: String,       // "tp" | "sl" | "manual" | "margin_call"

    // 메타데이터
    broker: String,             // "ensomarkets" | "infinox"
    account_number: String,     // MT5 계좌번호
    magic_number: Number,       // EA 식별 번호
    comment: String,            // 거래 코멘트

    created_at: Date,
    updated_at: Date
}
```

##### AccountSnapshot (계좌 스냅샷 - 시간별) 테이블

```javascript
{
    _id: ObjectId,
    user_id: ObjectId,
    account_id: ObjectId,
    timestamp: Date,            // 스냅샷 시간

    // 잔고 정보
    balance: Number,            // 계좌 잔액
    equity: Number,             // 자산 (잔액 + 미실현 손익)
    margin: Number,             // 사용 마진
    free_margin: Number,        // 가용 마진
    margin_level: Number,       // 마진 레벨 (%)

    // 손익 정보
    unrealized_pl: Number,      // 미실현 손익
    daily_pl: Number,           // 당일 손익

    // 포지션 정보
    open_positions: Number,     // 오픈 포지션 수
    total_volume: Number,       // 총 랏 수

    created_at: Date
}
```

#### 4.4.3 데이터 수집 스케줄러 구현

```javascript
const cron = require('node-cron');
const moment = require('moment-timezone');

// ========================================
// 1. 실시간 포지션 모니터링 (5초 주기)
// ========================================
cron.schedule('*/5 * * * * *', async () => {
    console.log('[실시간 수집] 시작:', new Date());

    const connectedAccounts = await db.accounts.find({
        status: 'connected'
    });

    for (const account of connectedAccounts) {
        try {
            // API 호출
            const apiData = await fetchAccountData(account);

            // 계좌 스냅샷 저장
            await db.accountSnapshots.insert({
                user_id: account.user_id,
                account_id: account._id,
                timestamp: new Date(),
                balance: apiData.balance,
                equity: apiData.equity,
                margin: apiData.margin,
                free_margin: apiData.freeMargin,
                margin_level: apiData.marginLevel,
                unrealized_pl: apiData.unrealizedPL,
                open_positions: apiData.positions.length,
                total_volume: apiData.positions.reduce((sum, p) => sum + p.volume, 0),
                created_at: new Date()
            });

            // 미실현 손익 업데이트
            await updateUnrealizedPL(account._id, apiData.unrealizedPL);

            // WebSocket으로 실시간 푸시
            io.to(`user:${account.user_id}`).emit('account_update', {
                account_id: account._id,
                balance: apiData.balance,
                unrealized_pl: apiData.unrealizedPL
            });

        } catch (error) {
            console.error(`계좌 ${account._id} 동기화 실패:`, error);
            await logSyncError(account._id, error);
        }
    }
});

// ========================================
// 2. 거래 내역 동기화 (1분 주기)
// ========================================
cron.schedule('* * * * *', async () => {
    console.log('[거래 내역 수집] 시작:', new Date());

    const connectedAccounts = await db.accounts.find({
        status: 'connected'
    });

    for (const account of connectedAccounts) {
        try {
            // 마지막 동기화 시간 이후 거래 조회
            const lastSync = account.last_sync_at || account.created_at;

            const trades = await fetchTrades(account, {
                start_date: lastSync,
                end_date: new Date()
            });

            console.log(`계좌 ${account._id}: ${trades.length}건의 새 거래 발견`);

            for (const trade of trades) {
                // 중복 체크
                const existing = await db.tradeHistory.findOne({
                    account_id: account._id,
                    trade_id: trade.trade_id
                });

                if (existing) {
                    // 기존 거래 업데이트 (상태 변경 등)
                    await db.tradeHistory.update(
                        { _id: existing._id },
                        {
                            $set: {
                                status: trade.status,
                                exit_price: trade.exit_price,
                                exit_time: trade.exit_time,
                                realized_pl: trade.realized_pl,
                                updated_at: new Date()
                            }
                        }
                    );
                } else {
                    // 신규 거래 삽입
                    await db.tradeHistory.insert({
                        user_id: account.user_id,
                        account_id: account._id,
                        trade_id: trade.trade_id,
                        symbol: trade.symbol,
                        type: trade.type,
                        lot_size: trade.lot_size,
                        entry_price: trade.entry_price,
                        exit_price: trade.exit_price,
                        realized_pl: trade.realized_pl,
                        unrealized_pl: trade.unrealized_pl,
                        pips: trade.pips,
                        commission: trade.commission,
                        swap: trade.swap,
                        take_profit: trade.take_profit,
                        stop_loss: trade.stop_loss,
                        entry_time: trade.entry_time,
                        exit_time: trade.exit_time,
                        duration_minutes: trade.duration_minutes,
                        status: trade.status,
                        close_reason: trade.close_reason,
                        broker: account.exchange,
                        created_at: new Date(),
                        updated_at: new Date()
                    });
                }
            }

            // 마지막 동기화 시간 업데이트
            await db.accounts.update(
                { _id: account._id },
                { $set: { last_sync_at: new Date() } }
            );

        } catch (error) {
            console.error(`거래 내역 동기화 실패:`, error);
        }
    }
});

// ========================================
// 3. 일별 손익 정산 (매일 자정 실행)
// ========================================
cron.schedule('0 0 * * *', async () => {
    console.log('[일별 정산] 시작:', moment().tz('Asia/Seoul').format('YYYY-MM-DD'));

    const yesterday = moment().tz('Asia/Seoul').subtract(1, 'day').startOf('day');
    const yesterdayEnd = moment(yesterday).endOf('day');

    const allAccounts = await db.accounts.find({});

    for (const account of allAccounts) {
        try {
            // 어제 하루 거래 조회
            const dailyTrades = await db.tradeHistory.find({
                account_id: account._id,
                exit_time: {
                    $gte: yesterday.toDate(),
                    $lte: yesterdayEnd.toDate()
                },
                status: 'closed'
            });

            // 거래 통계 계산
            const totalTrades = dailyTrades.length;
            const winTrades = dailyTrades.filter(t => t.realized_pl > 0).length;
            const lossTrades = dailyTrades.filter(t => t.realized_pl < 0).length;
            const winRate = totalTrades > 0 ? (winTrades / totalTrades * 100) : 0;

            // 손익 계산
            const grossProfit = dailyTrades
                .filter(t => t.realized_pl > 0)
                .reduce((sum, t) => sum + t.realized_pl, 0);

            const grossLoss = Math.abs(dailyTrades
                .filter(t => t.realized_pl < 0)
                .reduce((sum, t) => sum + t.realized_pl, 0));

            const netProfitLoss = grossProfit - grossLoss;

            // 시작/종료 잔고
            const openingSnapshot = await db.accountSnapshots.findOne({
                account_id: account._id,
                timestamp: { $gte: yesterday.toDate(), $lte: yesterdayEnd.toDate() }
            }, { sort: { timestamp: 1 } });

            const closingSnapshot = await db.accountSnapshots.findOne({
                account_id: account._id,
                timestamp: { $gte: yesterday.toDate(), $lte: yesterdayEnd.toDate() }
            }, { sort: { timestamp: -1 } });

            const openingBalance = openingSnapshot?.balance || 0;
            const closingBalance = closingSnapshot?.balance || 0;
            const dailyReturnPct = openingBalance > 0
                ? ((closingBalance - openingBalance) / openingBalance * 100)
                : 0;

            // 누적 손익 계산
            const tradingStartDate = await getUserTradingStartDate(account.user_id);
            const accumulatedPL = await calculateAccumulatedPL(
                account._id,
                tradingStartDate,
                yesterday.toDate()
            );

            // 일별 손익 데이터 저장
            await db.accountDailyProfitLoss.update(
                {
                    account_id: account._id,
                    date: yesterday.format('YYYY-MM-DD')
                },
                {
                    $set: {
                        user_id: account.user_id,
                        account_id: account._id,
                        date: yesterday.toDate(),
                        total_trades: totalTrades,
                        win_trades: winTrades,
                        loss_trades: lossTrades,
                        win_rate: winRate,
                        gross_profit: grossProfit,
                        gross_loss: grossLoss,
                        net_profit_loss: netProfitLoss,
                        opening_balance: openingBalance,
                        closing_balance: closingBalance,
                        daily_return_pct: dailyReturnPct,
                        accumulated_pl: accumulatedPL,
                        trades: dailyTrades.map(t => ({
                            trade_id: t.trade_id,
                            symbol: t.symbol,
                            type: t.type,
                            lot_size: t.lot_size,
                            entry_price: t.entry_price,
                            exit_price: t.exit_price,
                            entry_time: t.entry_time,
                            exit_time: t.exit_time,
                            profit_loss: t.realized_pl,
                            pips: t.pips,
                            commission: t.commission,
                            swap: t.swap
                        })),
                        updated_at: new Date(),
                        sync_status: 'synced'
                    }
                },
                { upsert: true }
            );

            console.log(`계좌 ${account._id} 일별 정산 완료: ${netProfitLoss}`);

        } catch (error) {
            console.error(`계좌 ${account._id} 일별 정산 실패:`, error);

            await db.accountDailyProfitLoss.update(
                {
                    account_id: account._id,
                    date: yesterday.format('YYYY-MM-DD')
                },
                {
                    $set: {
                        sync_status: 'failed',
                        error_message: error.message
                    }
                },
                { upsert: true }
            );
        }
    }

    // 사용자별 통합 일별 손익 계산
    await aggregateUserDailyProfitLoss(yesterday.toDate());

    // 월별 통계 업데이트
    await updateMonthlyStats(yesterday.toDate());

    // 랭킹 재계산
    await recalculateRanking();

    console.log('[일별 정산] 완료');
});

// ========================================
// 4. 월별 통계 집계 (매월 1일 00:10 실행)
// ========================================
cron.schedule('10 0 1 * *', async () => {
    console.log('[월별 통계 집계] 시작');

    const lastMonth = moment().tz('Asia/Seoul').subtract(1, 'month');
    const year = lastMonth.year();
    const month = lastMonth.month() + 1;

    const allUsers = await db.users.find({});

    for (const user of allUsers) {
        try {
            // 해당 월의 모든 일별 데이터 조회
            const monthlyData = await db.accountDailyProfitLoss.aggregate([
                {
                    $match: {
                        user_id: user._id,
                        date: {
                            $gte: lastMonth.startOf('month').toDate(),
                            $lte: lastMonth.endOf('month').toDate()
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total_pl: { $sum: '$net_profit_loss' },
                        total_trades: { $sum: '$total_trades' },
                        win_trades: { $sum: '$win_trades' },
                        loss_trades: { $sum: '$loss_trades' }
                    }
                }
            ]);

            const monthlyPL = monthlyData[0]?.total_pl || 0;
            const monthlyTarget = user.monthly_target || 10000000; // 기본 1천만원
            const achievementRate = (monthlyPL / monthlyTarget * 100);

            await db.monthlyStats.update(
                {
                    user_id: user._id,
                    year: year,
                    month: month
                },
                {
                    $set: {
                        user_id: user._id,
                        year: year,
                        month: month,
                        monthly_pl: monthlyPL,
                        monthly_target: monthlyTarget,
                        achievement_rate: achievementRate,
                        total_trades: monthlyData[0]?.total_trades || 0,
                        win_trades: monthlyData[0]?.win_trades || 0,
                        loss_trades: monthlyData[0]?.loss_trades || 0,
                        updated_at: new Date()
                    }
                },
                { upsert: true }
            );

        } catch (error) {
            console.error(`사용자 ${user._id} 월별 통계 실패:`, error);
        }
    }

    console.log('[월별 통계 집계] 완료');
});
```

#### 4.4.4 데이터 조회 API 구현

```javascript
// 사용자별 일자별 손익 조회
app.get('/api/daily-profit-loss', async (req, res) => {
    const userId = req.user._id;
    const { start_date, end_date, account_id } = req.query;

    const query = { user_id: userId };

    if (start_date && end_date) {
        query.date = {
            $gte: new Date(start_date),
            $lte: new Date(end_date)
        };
    }

    if (account_id) {
        query.account_id = account_id;
    }

    const dailyData = await db.accountDailyProfitLoss.find(query)
        .sort({ date: -1 });

    res.json({
        success: true,
        data: dailyData,
        total: dailyData.length
    });
});

// 계좌별 상세 거래 내역 조회
app.get('/api/trades', async (req, res) => {
    const userId = req.user._id;
    const { account_id, date, status } = req.query;

    const query = { user_id: userId };

    if (account_id) {
        query.account_id = account_id;
    }

    if (date) {
        const startOfDay = moment(date).startOf('day').toDate();
        const endOfDay = moment(date).endOf('day').toDate();
        query.exit_time = {
            $gte: startOfDay,
            $lte: endOfDay
        };
    }

    if (status) {
        query.status = status;
    }

    const trades = await db.tradeHistory.find(query)
        .sort({ exit_time: -1 });

    res.json({
        success: true,
        data: trades,
        total: trades.length
    });
});

// 누적 손익 조회
app.get('/api/accumulated-profit-loss', async (req, res) => {
    const userId = req.user._id;
    const { account_id } = req.query;

    const tradingStartDate = await getUserTradingStartDate(userId);

    let query = { user_id: userId };
    if (account_id) {
        query.account_id = account_id;
    }

    const result = await db.accountDailyProfitLoss.aggregate([
        {
            $match: {
                ...query,
                date: { $gte: tradingStartDate }
            }
        },
        {
            $group: {
                _id: account_id ? '$account_id' : null,
                total_pl: { $sum: '$net_profit_loss' },
                total_trades: { $sum: '$total_trades' },
                win_trades: { $sum: '$win_trades' },
                loss_trades: { $sum: '$loss_trades' }
            }
        }
    ]);

    res.json({
        success: true,
        data: {
            accumulated_pl: result[0]?.total_pl || 0,
            total_trades: result[0]?.total_trades || 0,
            win_rate: result[0]?.total_trades > 0
                ? (result[0].win_trades / result[0].total_trades * 100)
                : 0
        }
    });
});
```

#### 4.4.5 데이터 무결성 검증

```javascript
// 매일 새벽 2시에 데이터 무결성 검사
cron.schedule('0 2 * * *', async () => {
    console.log('[데이터 검증] 시작');

    const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');

    // 1. 누락된 일별 데이터 확인
    const allAccounts = await db.accounts.find({ status: 'connected' });

    for (const account of allAccounts) {
        const dailyRecord = await db.accountDailyProfitLoss.findOne({
            account_id: account._id,
            date: yesterday
        });

        if (!dailyRecord) {
            console.warn(`⚠️ 누락된 일별 데이터: 계좌 ${account._id}, 날짜 ${yesterday}`);
            // 재처리 트리거
            await retryDailySettlement(account._id, yesterday);
        }
    }

    // 2. 손익 합계 검증
    for (const account of allAccounts) {
        const dailyRecord = await db.accountDailyProfitLoss.findOne({
            account_id: account._id,
            date: yesterday
        });

        if (dailyRecord) {
            const tradesSum = dailyRecord.trades.reduce((sum, t) => sum + t.profit_loss, 0);

            if (Math.abs(tradesSum - dailyRecord.net_profit_loss) > 0.01) {
                console.error(`❌ 손익 불일치: 계좌 ${account._id}, 날짜 ${yesterday}`);
                console.error(`  DB 기록: ${dailyRecord.net_profit_loss}`);
                console.error(`  거래 합계: ${tradesSum}`);

                // 자동 수정
                await db.accountDailyProfitLoss.update(
                    { _id: dailyRecord._id },
                    { $set: { net_profit_loss: tradesSum } }
                );
            }
        }
    }

    console.log('[데이터 검증] 완료');
});
```

---

## 5. 데이터 표시 위치

### 5.1 📊 My 누적손익 위젯

**위치**: 우측 사이드바 최상단

**표시 데이터**:

```
┌─────────────────────────────────────┐
│  📊 My 누적손익                     │
├─────────────────────────────────────┤
│  월 누적손익                         │
│  ₩12,500,000                        │
│  목표: ₩15,000,000 (83%)            │
│                                     │
│  연 누적손익                         │
│  ₩145,000,000                       │
│  목표: ₩180,000,000 (80%)           │
│                                     │
│  회원 등급                           │
│  Lv.3 활동 회원                     │
│                                     │
│  전체 랭킹                           │
│  15위 / 1,000명 (상위 1.5%)         │
└─────────────────────────────────────┘
```

**데이터 출처**:
- 연동된 모든 계좌의 손익 합산
- 실시간 업데이트 (5초 주기)
- 목표 달성률 자동 계산

### 5.2 일별 거래 일지

**위치**: 우측 사이드바 > 📅 일별 거래 일지 (더보기 클릭)

**12개월 달력 형식**:

```
2024년 12월
┌──┬──┬──┬──┬──┬──┬──┐
│일│월│화│수│목│금│토│
├──┼──┼──┼──┼──┼──┼──┤
│ 1│ 2│ 3│ 4│ 5│ 6│ 7│
│  │+5│+3│+2│+8│+4│  │
├──┼──┼──┼──┼──┼──┼──┤
│ 8│ 9│10│11│12│13│14│
│  │+6│-2│+5│+7│+3│  │
└──┴──┴──┴──┴──┴──┴──┘

누적 손익: +41만원
```

**색상 코딩**:
- 🟢 녹색: 이익 발생일 (+)
- 🔴 빨간색: 손실 발생일 (-)
- ⚪ 회색: 거래 없음

**클릭 시 상세 정보**:
```
┌─────────────────────────────────┐
│  2024년 12월 5일 거래 내역      │
├─────────────────────────────────┤
│  거래 1: 금 선물 매수           │
│  진입: $2,650.00               │
│  청산: $2,671.50               │
│  손익: +$8,000                 │
│                                │
│  거래 2: 금 선물 매도           │
│  진입: $2,675.00               │
│  청산: $2,675.00               │
│  손익: $0                      │
│                                │
│  일 총 손익: +$8,000           │
└─────────────────────────────────┘
```

### 5.3 거래 시작일 설정 효과

**위치**: My 설정 > 📅 거래 시작일 설정

**설정 예시**:
- 거래 시작일: 2024년 1월 1일

**효과**:
- 모든 누적 손익 계산의 기준일
- 해당 날짜 이후 데이터만 집계
- 변경 시 즉시 재계산

**사용 케이스**:
```
상황: 2023년부터 거래했지만, HDH 전략은 2024년 1월부터 시작
설정: 거래 시작일 = 2024-01-01
결과: 2024년 1월 1일 이후 데이터만 "My 누적손익"에 반영
```

---

## 6. 계좌 관리 기능

### 6.1 연결된 계좌 목록

**표시 정보**:

```
┌─────────────────────────────────────┐
│  메인 계좌              [연결됨]     │
│  Enso Markets (엔쏘마켓)            │
│  API Key: enso_**********************│
│  실시간 손익 연동 중                 │
│  [연결 해제]  [삭제]                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  서브 계좌           [연결 해제됨]   │
│  INFINOX (인피녹스)                 │
│  API Key: infx_**********************│
│  실시간 손익 연동 중지됨             │
│  [재연결]  [삭제]                   │
└─────────────────────────────────────┘
```

### 6.2 연결 해제 기능

**목적**: 일시적으로 데이터 동기화 중지

**프로세스**:

```
1. [연결 해제] 버튼 클릭
   ↓
2. 확인 메시지:
   "메인 계좌의 연결을 해제하시겠습니까?
    연결을 해제하면 실시간 손익 데이터를 가져올 수 없습니다."
   ↓
3. [확인] 클릭
   ↓
4. 시스템 처리:
   - 상태 변경: "연결됨" → "연결 해제됨"
   - 실시간 데이터 수집 중지
   - 기존 데이터는 유지 (삭제되지 않음)
   ↓
5. 버튼 변경: [연결 해제] → [재연결]
```

**효과**:
- ✅ 기존 거래 내역 및 누적 손익 데이터 보존
- ❌ 신규 거래 데이터 수집 중지
- ℹ️ 언제든지 재연결 가능

### 6.3 재연결 기능

**목적**: 연결 해제된 계좌를 다시 활성화

**프로세스**:

```
1. [재연결] 버튼 클릭
   ↓
2. API 연결 테스트
   ↓
3. 성공 시:
   - 상태 변경: "연결 해제됨" → "연결됨"
   - 실시간 데이터 수집 재개
   - 연결 해제 기간 동안의 누락 데이터 동기화
   ↓
4. 버튼 변경: [재연결] → [연결 해제]
```

### 6.4 삭제 기능

**목적**: 계좌를 완전히 제거

**프로세스**:

```
1. [삭제] 버튼 클릭
   ↓
2. 확인 메시지:
   "메인 계좌를 삭제하시겠습니까?
    ⚠️ 삭제 시 해당 계좌의 모든 거래 내역이 사라집니다.
    누적 손익 계산에서도 제외됩니다."
   ↓
3. [확인] 클릭
   ↓
4. 시스템 처리:
   - 계좌 정보 삭제 (API Key/Secret 포함)
   - 해당 계좌의 거래 내역 삭제 또는 아카이브
   - 누적 손익 재계산 (해당 계좌 제외)
   ↓
5. 계좌 목록에서 제거
```

**주의사항**:
- ⚠️ **복구 불가능**: 삭제 후 되돌릴 수 없음
- ⚠️ **데이터 손실**: 해당 계좌의 모든 거래 내역 삭제
- 💡 **권장**: 연결 해제 기능 사용 권장 (데이터 보존)

### 6.5 다중 계좌 관리

**지원 기능**:
- 무제한 계좌 추가 가능
- 각 계좌별 독립적 연결 상태 관리
- 모든 계좌의 손익 자동 합산

**사용 예시**:

```
사용자: 김철수

계좌 1: Enso Markets - 챌린지 계좌
  - 상태: 연결됨
  - 월 손익: +₩5,000,000

계좌 2: Enso Markets - 보험금 계좌
  - 상태: 연결됨
  - 월 손익: -₩1,800,000

계좌 3: INFINOX - 테스트 계좌
  - 상태: 연결 해제됨
  - 월 손익: +₩500,000 (연결 해제 전까지)

→ My 누적손익 표시:
   월 누적손익 = ₩3,700,000
   (계좌 1 + 계좌 2 + 계좌 3)
```

---

## 7. 보안 및 개인정보 보호

### 7.1 API 키 보안

#### 저장 방식

```python
# 암호화 저장
def save_api_credentials(api_key, api_secret):
    # AES-256 암호화
    encrypted_secret = aes256_encrypt(
        data=api_secret,
        key=get_master_encryption_key()
    )

    # 데이터베이스 저장
    db.insert({
        'api_key': api_key,  # 평문 저장 (검색용)
        'api_secret_encrypted': encrypted_secret,  # 암호화
        'encryption_version': '1.0'
    })
```

#### 사용 시 복호화

```python
# 복호화 후 사용
def get_api_credentials(account_id):
    account = db.get_account(account_id)

    decrypted_secret = aes256_decrypt(
        data=account['api_secret_encrypted'],
        key=get_master_encryption_key()
    )

    return {
        'api_key': account['api_key'],
        'api_secret': decrypted_secret
    }
```

### 7.2 화면 표시 마스킹

**API Key 마스킹**:

```
실제 키: enso_1a2b3c4d5e6f7g8h9i0j
화면 표시: enso_**********************

규칙:
- 앞 5자만 표시
- 나머지는 * 처리
```

**API Secret**:
- 입력 시: 비밀번호 타입 (●●●●●●●●)
- 저장 후: 절대 재표시 안 됨
- 수정 필요 시: 새로 입력

### 7.3 API 권한 제한 권장사항

**권장 설정**:

| 권한 | 허용 여부 | 이유 |
|------|----------|------|
| **읽기 전용** | ✅ 필수 | 거래 내역, 잔고 조회 |
| **계좌 정보 조회** | ✅ 필수 | 포지션, 손익 확인 |
| **거래 실행** | ❌ 비활성화 | 보안 위험 (HDH는 데이터만 수집) |
| **출금** | ❌ 비활성화 | 보안 위험 |
| **계좌 설정 변경** | ❌ 비활성화 | 보안 위험 |

**이유**:
```
HDH Fintech는 순수하게 데이터 수집 및 표시 목적
→ 읽기 전용 권한만으로 충분
→ 만약 API 키가 유출되어도 자금 손실 위험 제로
```

### 7.4 2FA (2단계 인증) 통합 (향후 계획)

```
1. 민감한 작업 시 2FA 요구:
   - 계좌 추가
   - 계좌 삭제
   - API 키 변경

2. 지원 방식:
   - SMS 인증
   - 이메일 인증
   - Google Authenticator
```

### 7.5 접근 로그

모든 API 요청 기록:

```
┌─────────────────────────────────────────┐
│  API 접근 로그                          │
├─────────────────────────────────────────┤
│  2024-12-07 14:35:22                    │
│  계좌: 메인 계좌                         │
│  작업: 거래 내역 조회                    │
│  IP: 123.456.789.012                    │
│  상태: 성공                              │
├─────────────────────────────────────────┤
│  2024-12-07 14:35:18                    │
│  계좌: 메인 계좌                         │
│  작업: 잔고 조회                         │
│  IP: 123.456.789.012                    │
│  상태: 성공                              │
└─────────────────────────────────────────┘
```

---

## 8. 기술 구현 사양

### 8.1 시스템 아키텍처

```
┌─────────────────────────────────────────────┐
│            프론트엔드 (React.js)            │
│  - 사용자 인터페이스                         │
│  - 실시간 데이터 표시 (WebSocket)           │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│          백엔드 API 서버 (Node.js)          │
│  - 계좌 관리 API                             │
│  - 데이터 수집 스케줄러                      │
│  - WebSocket 서버                           │
└─────────────────┬───────────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────▼──────┐   ┌────────▼────────┐
│   데이터베이스   │   │  거래소 API      │
│   (MongoDB)    │   │  - Enso Markets │
│                │   │  - INFINOX      │
└────────────────┘   └─────────────────┘
```

### 8.2 데이터베이스 스키마

#### Users (회원) 테이블

```javascript
{
    _id: ObjectId,
    username: String,
    email: String,
    trading_start_date: Date,
    level: Number,
    created_at: Date,
    updated_at: Date
}
```

#### Accounts (계좌) 테이블

```javascript
{
    _id: ObjectId,
    user_id: ObjectId,  // Foreign Key → Users
    exchange: String,   // "ensomarkets" | "infinox"
    nickname: String,
    api_key: String,
    api_secret_encrypted: String,
    status: String,     // "connected" | "disconnected"
    created_at: Date,
    last_sync_at: Date
}
```

#### Trades (거래 내역) 테이블

```javascript
{
    _id: ObjectId,
    account_id: ObjectId,  // Foreign Key → Accounts
    user_id: ObjectId,     // Foreign Key → Users
    trade_id: String,      // 거래소의 거래 ID
    symbol: String,        // "XAUUSD" (금 선물)
    type: String,          // "BUY" | "SELL"
    lot_size: Number,
    entry_price: Number,
    exit_price: Number,
    entry_time: Date,
    exit_time: Date,
    realized_pl: Number,   // 실현 손익
    status: String,        // "open" | "closed"
    created_at: Date
}
```

#### DailyProfitLoss (일별 손익) 테이블

```javascript
{
    _id: ObjectId,
    user_id: ObjectId,
    date: Date,            // YYYY-MM-DD
    daily_pl: Number,      // 일 손익
    accumulated_pl: Number,// 누적 손익 (거래 시작일부터)
    trade_count: Number,   // 거래 횟수
    win_count: Number,     // 이익 거래 수
    loss_count: Number,    // 손실 거래 수
    created_at: Date
}
```

#### MonthlyStats (월별 통계) 테이블

```javascript
{
    _id: ObjectId,
    user_id: ObjectId,
    year: Number,
    month: Number,
    monthly_pl: Number,
    monthly_target: Number,
    achievement_rate: Number,  // 달성률 (%)
    created_at: Date,
    updated_at: Date
}
```

### 8.3 API 엔드포인트

#### 계좌 관리

```
POST   /api/accounts              # 계좌 추가
GET    /api/accounts              # 계좌 목록 조회
PUT    /api/accounts/:id          # 계좌 수정
DELETE /api/accounts/:id          # 계좌 삭제
POST   /api/accounts/:id/disconnect  # 연결 해제
POST   /api/accounts/:id/reconnect   # 재연결
```

#### 데이터 조회

```
GET /api/profit-loss/daily        # 일별 손익
GET /api/profit-loss/monthly      # 월별 손익
GET /api/profit-loss/yearly       # 연별 손익
GET /api/profit-loss/accumulated  # 누적 손익
GET /api/trades                   # 거래 내역
GET /api/ranking                  # 랭킹
```

#### 설정

```
PUT /api/settings/trading-start-date  # 거래 시작일 설정
GET /api/settings                     # 설정 조회
```

### 8.4 거래소 API 연동

#### Enso Markets API 예시

```javascript
// 계좌 정보 조회
const getAccountInfo = async (apiKey, apiSecret) => {
    const response = await axios.get(
        'https://api.ensomarkets.com/v1/account',
        {
            headers: {
                'X-API-KEY': apiKey,
                'X-API-SECRET': apiSecret
            }
        }
    );

    return {
        balance: response.data.balance,
        equity: response.data.equity,
        margin: response.data.margin
    };
};

// 거래 내역 조회
const getTrades = async (apiKey, apiSecret, startDate, endDate) => {
    const response = await axios.get(
        'https://api.ensomarkets.com/v1/trades',
        {
            headers: {
                'X-API-KEY': apiKey,
                'X-API-SECRET': apiSecret
            },
            params: {
                start_date: startDate,
                end_date: endDate
            }
        }
    );

    return response.data.trades.map(trade => ({
        id: trade.trade_id,
        symbol: trade.symbol,
        type: trade.type,
        lot_size: trade.lot_size,
        entry_price: trade.entry_price,
        exit_price: trade.exit_price,
        profit_loss: trade.profit_loss,
        entry_time: trade.entry_time,
        exit_time: trade.exit_time
    }));
};
```

#### INFINOX API 예시

```javascript
// 유사한 구조, endpoint만 다름
const INFINOX_BASE_URL = 'https://api.infinox.com/v1';
```

### 8.5 실시간 데이터 동기화

#### 스케줄러 설정

```javascript
const cron = require('node-cron');

// 5초마다 실시간 데이터 동기화
cron.schedule('*/5 * * * * *', async () => {
    const connectedAccounts = await db.accounts.find({
        status: 'connected'
    });

    for (const account of connectedAccounts) {
        try {
            await syncAccountData(account);
        } catch (error) {
            console.error(`Failed to sync account ${account.id}:`, error);
        }
    }
});

// 매일 자정에 일일 정산
cron.schedule('0 0 * * *', async () => {
    await dailySettlement();
});
```

#### WebSocket 실시간 푸시

```javascript
// 서버 → 클라이언트 실시간 푸시
io.on('connection', (socket) => {
    socket.on('subscribe', (userId) => {
        // 사용자별 룸 생성
        socket.join(`user:${userId}`);
    });
});

// 데이터 업데이트 시 푸시
const pushUpdate = (userId, data) => {
    io.to(`user:${userId}`).emit('profit_loss_update', data);
};
```

---

## 9. 사용자 시나리오

### 9.1 신규 회원 계좌 연동 시나리오

**배경**: 김철수 님이 HDH Fintech에 신규 가입하고 Enso Markets 계좌를 연동하려 함

**단계별 과정**:

```
Day 1 - 09:00
김철수: HDH Fintech 회원가입 완료
        ↓
        웹사이트 로그인
        ↓
        우측 사이드바 확인
        → "My 누적손익" 위젯이 비어있음 (데이터 없음)
        ↓
        [⚙️ My 설정] 클릭
        ↓
        [📅 거래 시작일 설정] 클릭
        → 2024-01-01로 설정 (HDH 전략 시작일)
        ↓
        [💼 계좌 관리] 클릭
        ↓
        [계좌 추가] 폼 작성:
          - 거래소: Enso Markets
          - 별칭: 메인 챌린지 계좌
          - API Key: (Enso에서 발급받은 키)
          - API Secret: (Enso에서 발급받은 시크릿)
        ↓
        [계좌 추가] 버튼 클릭
        ↓
Day 1 - 09:05
시스템: API 연결 테스트 → 성공!
        알림: "계좌가 성공적으로 추가되었습니다!"
        ↓
        "연결된 계좌"에 표시:
        ┌──────────────────────────────────┐
        │ 메인 챌린지 계좌    [연결됨]     │
        │ Enso Markets                     │
        │ 실시간 손익 연동 중               │
        └──────────────────────────────────┘
        ↓
Day 1 - 09:10
시스템: 과거 거래 데이터 동기화 시작
        → 2024-01-01부터 현재까지 모든 거래 내역 가져오기
        → 총 150건의 거래 발견
        ↓
        일별 손익 계산 및 저장
        ↓
        누적 손익 계산:
        - 월 누적: +₩8,500,000
        - 연 누적: +₩95,000,000
        ↓
Day 1 - 09:15
김철수: 페이지 새로고침
        ↓
        "My 누적손익" 위젯 확인:
        ┌──────────────────────────────────┐
        │ 월 누적손익: ₩8,500,000          │
        │ 목표: ₩10,000,000 (85%)          │
        │                                  │
        │ 연 누적손익: ₩95,000,000         │
        │ 목표: ₩120,000,000 (79%)         │
        │                                  │
        │ 회원 등급: Lv.2 정회원           │
        │ 전체 랭킹: 45위 / 1,000명        │
        └──────────────────────────────────┘
        ↓
김철수: "일별 거래 일지" 클릭
        → 12개월 달력에 모든 거래일 표시됨
        → 각 날짜별 손익 색상 코딩 확인
        ↓
        만족하며 계좌 연동 완료! ✅
```

### 9.2 추가 계좌 연동 시나리오

**배경**: 김철수 님이 보험금 계좌도 연동하고 싶어함

```
Day 5 - 14:00
김철수: [⚙️ My 설정] → [💼 계좌 관리] 클릭
        ↓
        "연결된 계좌"에 기존 계좌 1개 표시됨
        ↓
        [계좌 추가] 폼 작성:
          - 거래소: Enso Markets
          - 별칭: 보험금 계좌
          - API Key: (다른 계좌의 API 키)
          - API Secret: (다른 계좌의 시크릿)
        ↓
        [계좌 추가] 버튼 클릭
        ↓
Day 5 - 14:05
시스템: 2번째 계좌 연동 성공
        ↓
        "연결된 계좌"에 2개 표시:
        ┌──────────────────────────────────┐
        │ 메인 챌린지 계좌    [연결됨]     │
        │ Enso Markets                     │
        └──────────────────────────────────┘

        ┌──────────────────────────────────┐
        │ 보험금 계좌         [연결됨]     │
        │ Enso Markets                     │
        └──────────────────────────────────┘
        ↓
        보험금 계좌 데이터 동기화
        ↓
        누적 손익 재계산 (2개 계좌 합산):
        - 챌린지 계좌: +₩8,500,000
        - 보험금 계좌: -₩1,900,000
        - 합계: +₩6,600,000
        ↓
김철수: "My 누적손익" 확인
        → 자동으로 2개 계좌 합산된 금액 표시됨
        → 헷지 전략 손익을 한눈에 확인 가능! ✅
```

### 9.3 실시간 거래 발생 시나리오

**배경**: 김철수 님이 실시간으로 금 선물 거래 중

```
Day 10 - 10:30:00
김철수: MT5에서 금 선물 매수 주문 실행
        - 상품: XAUUSD (금 선물)
        - 방향: BUY
        - LOT: 6.8
        - 진입가: $2,650.00
        - TP: 21.5 포인트
        - SL: 4.1 포인트
        ↓
        거래소 서버에 주문 접수
        ↓
10:30:01
        체결 완료
        ↓
10:30:06 (5초 후)
HDH 시스템: 정기 데이터 동기화 실행
            → 새 포지션 발견!
            ↓
            데이터베이스에 저장:
            {
                status: "open",
                entry_price: 2650.00,
                unrealized_pl: 0
            }
            ↓
            WebSocket으로 실시간 푸시
            ↓
10:30:06
김철수의 브라우저: 알림 수신!
                   "새 포지션 오픈: XAUUSD BUY 6.8 LOT"
                   ↓
                   화면 자동 업데이트 (새로고침 불필요)

--- 30분 경과 ---

11:00:00
        금 가격 상승 중...
        현재가: $2,671.50
        → TP(21.5p) 도달!
        ↓
        자동 익절 체결
        ↓
11:00:01
HDH 시스템: 거래소로부터 웹훅 수신
            "Position Closed - Profit"
            ↓
            실현 손익 계산:
            (2671.50 - 2650.00) × 6.8 lots × $100
            = 21.5p × 680 = $14,620
            ↓
            데이터베이스 업데이트:
            - 포지션 상태: "closed"
            - 실현 손익: +$14,620 (약 ₩1,950,000)
            - 일별 손익에 추가
            - 누적 손익 갱신
            ↓
            WebSocket 푸시
            ↓
11:00:02
김철수의 브라우저: 알림 수신!
                   "포지션 청산: +₩1,950,000"
                   ↓
                   화면 자동 업데이트:

                   "My 누적손익" 위젯:
                   월 누적손익: ₩10,450,000 ⬆️ (이전: ₩8,500,000)

                   "일별 거래 일지":
                   12월 10일: +₩1,950,000 (녹색 표시)
                   ↓
김철수: 실시간으로 확인 완료!
        별도 조작 없이 자동 업데이트됨 ✅
```

### 9.4 월말 정산 시나리오

```
Day 31 - 23:59:55
시스템: 월말 5초 전...
        ↓
        마지막 실시간 동기화 실행
        ↓
        모든 미체결 포지션 확인
        → 미실현 손익 최종 계산
        ↓
00:00:00 (다음 달)
        일일 정산 크론잡 실행
        ↓
        김철수의 12월 데이터 최종 집계:
        - 거래 횟수: 60회
        - 이익 거래: 50회
        - 손실 거래: 10회
        - 월 총 손익: +₩10,450,000
        - 월 목표: ₩10,000,000
        - 달성률: 104.5% ✅
        ↓
        회원 등급 재평가:
        - 이전: Lv.2 정회원
        - 새로운: Lv.3 활동 회원 (승급!)
        ↓
        랭킹 재계산:
        - 이전: 45위
        - 새로운: 38위 (상승!)
        ↓
00:00:30
김철수: 로그인
        ↓
        환영 메시지:
        "🎉 축하합니다!
         12월 목표를 104.5% 달성하셨습니다!
         Lv.3 활동 회원으로 승급하셨습니다!"
        ↓
        "My 누적손익" 위젯:
        ┌──────────────────────────────────┐
        │ 월 누적손익: ₩0                  │
        │ (1월 새로 시작)                  │
        │                                  │
        │ 연 누적손익: ₩105,450,000        │
        │ 목표: ₩120,000,000 (87.8%)       │
        │                                  │
        │ 회원 등급: Lv.3 활동 회원 ⬆️     │
        │ 전체 랭킹: 38위 / 1,000명 ⬆️     │
        └──────────────────────────────────┘
        ↓
김철수: 만족스러운 한 달 마무리! ✅
```

---

## 10. FAQ

### Q1. 계좌 연동 시 API 키가 필요한 이유는?

**A**: MT5 거래소 계좌의 데이터는 보안상 직접 접근이 불가능합니다. 거래소가 제공하는 공식 API를 통해서만 데이터를 가져올 수 있으며, 이때 API Key와 Secret이 인증 수단으로 사용됩니다.

---

### Q2. 여러 계좌를 연동하면 손익이 어떻게 계산되나요?

**A**: 모든 연동된 계좌의 손익이 **자동으로 합산**됩니다.

**예시**:
- 계좌 A: +₩5,000,000
- 계좌 B: -₩1,800,000
- **표시**: ₩3,200,000

---

### Q3. 계좌를 연결 해제하면 기존 데이터는 어떻게 되나요?

**A**:
- ✅ **기존 데이터는 유지**됩니다.
- ❌ **신규 거래 데이터만 수집 중지**됩니다.
- 🔄 **재연결 시 누락된 데이터 자동 동기화**됩니다.

---

### Q4. 계좌를 삭제하면 복구할 수 있나요?

**A**:
- ❌ **삭제 시 복구 불가능**합니다.
- ⚠️ **모든 거래 내역과 누적 손익 데이터가 삭제**됩니다.
- 💡 **권장**: 일시적으로 사용 중지하려면 "연결 해제" 기능 사용

---

### Q5. 실시간 데이터는 얼마나 자주 업데이트되나요?

**A**:
- **포지션/잔고**: 5초마다 자동 업데이트
- **거래 체결**: 즉시 (웹훅 방식)
- **일별 정산**: 매일 자정
- **월별 통계**: 매월 1일 자정

---

### Q6. API 키가 유출되면 어떻게 되나요?

**A**:
- ✅ **읽기 전용 권한**만 부여했다면 자금 손실 위험 없음
- ⚠️ **즉시 거래소에서 해당 API 키 삭제** 권장
- 🔄 **새 API 키 발급 후 재등록**

**보안 팁**:
- API 키 생성 시 "거래 실행" 권한 비활성화
- 정기적으로 API 키 변경 (3개월마다 권장)

---

### Q7. 거래 시작일을 변경하면 어떻게 되나요?

**A**:
- 📅 **새로운 기준일부터 누적 손익 재계산**
- 🔄 **즉시 반영** (실시간 재계산)
- 📊 **랭킹도 자동 재계산**

**사용 케이스**:
```
상황: 2020년부터 거래했지만 HDH 전략은 2024년 1월부터
설정: 거래 시작일 = 2024-01-01
효과: 2024년 1월 1일 이후 데이터만 집계
```

---

### Q8. 모의 계좌와 실거래 계좌를 같이 연동할 수 있나요?

**A**:
- ✅ **가능합니다!**
- 💡 **구분 방법**: 계좌 별칭으로 구분 (예: "실거래-메인", "모의-테스트")
- 📊 **손익 합산**: 모든 계좌의 손익이 합산되어 표시됨

**주의**:
- 모의 계좌 데이터가 실거래 손익에 포함되므로 정확한 성과 측정을 위해서는 분리 권장

---

### Q9. 다른 거래소도 추가될 예정인가요?

**A**:
- 🔜 **향후 추가 예정**:
  - FTMO
  - MyForexFunds
  - The5ers
  - Forex.com

현재는 MT5 API를 지원하는 Enso Markets와 INFINOX만 지원합니다.

---

### Q10. 계좌 연동 없이도 사용할 수 있나요?

**A**:
- ✅ **가능하지만 기능 제한**:
  - 시뮬레이터 사용 가능
  - 전략 학습 가능
  - 커뮤니티 참여 가능

- ❌ **사용 불가**:
  - 실시간 손익 추적
  - 랭킹 참여
  - 일별 거래 일지
  - 자동 통계

**권장**: 계좌 연동으로 모든 기능 활용!

---

## 📞 지원 및 문의

### 기술 지원
- 이메일: support@hdhfintech.com
- 채팅: 웹사이트 우측 하단 💬 버튼
- 운영 시간: 평일 09:00 - 18:00 (KST)

### 자주 묻는 질문
- 웹사이트: https://hdhfintech.com/faq
- 커뮤니티: https://hdhfintech.com/community

---

**문서 버전**: 1.0
**최종 수정**: 2025-12-07
**작성자**: HDH Fintech 개발팀
**저작권**: © 2025 HDH Fintech. All rights reserved.
