/**
 * Inbox Watcher - 자동 Order Sheet 감지 및 Claude Code 호출
 *
 * 사용법: node inbox_watcher.js
 *
 * 기능:
 * 1. Inbox 폴더 감시 → 새 JSON 파일 감지
 * 2. Claude Code CLI 자동 호출 (-p 모드)
 * 3. 결과를 Outbox에 저장 → HTML 자동 변환
 * 4. 사용자에게 알림 발송
 * 5. Outbox HTML 파일 접근 감지 → Archive 이동
 */

const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

// 설정
const CONFIG = {
    inboxPath: path.join(__dirname, 'Inbox'),
    outboxPath: path.join(__dirname, 'Outbox'),
    inboxArchivePath: path.join(__dirname, 'Inbox', 'Archive'),
    outboxArchivePath: path.join(__dirname, 'Outbox', 'Archive'),
    pollInterval: 3000,  // 3초마다 체크
    processedFiles: new Set(),
    // Outbox 파일 추적 (파일명 -> {생성시간, 원본파일명})
    outboxFiles: new Map()
};

// 색상 출력
const log = {
    info: (msg) => console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`),
    success: (msg) => console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`),
    error: (msg) => console.log(`\x1b[31m[ERROR]\x1b[0m ${msg}`),
    warn: (msg) => console.log(`\x1b[33m[WARN]\x1b[0m ${msg}`)
};

// ========================================
// 1. Inbox 처리 (Order Sheet → Claude → Outbox)
// ========================================

// Inbox에서 새 파일 찾기
function findNewOrders() {
    try {
        const files = fs.readdirSync(CONFIG.inboxPath);
        const jsonFiles = files.filter(f =>
            f.endsWith('.json') &&
            !CONFIG.processedFiles.has(f)
        );
        return jsonFiles;
    } catch (err) {
        log.error(`Inbox 읽기 실패: ${err.message}`);
        return [];
    }
}

// Order Sheet 읽기
function readOrderSheet(filename) {
    const filepath = path.join(CONFIG.inboxPath, filename);
    try {
        const content = fs.readFileSync(filepath, 'utf8');
        return JSON.parse(content);
    } catch (err) {
        log.error(`파일 읽기 실패 (${filename}): ${err.message}`);
        return null;
    }
}

// Claude Code 호출
function callClaude(orderSheet, filename) {
    return new Promise((resolve, reject) => {
        const prompt = `
다음 Order Sheet를 확인하고 작업을 수행해주세요.

=== ORDER SHEET ===
${JSON.stringify(orderSheet, null, 2)}
=== END ===

작업 완료 후 결과를 JSON 형식으로 출력해주세요.
`;

        log.info(`Claude Code 호출 중... (${filename})`);

        // Claude CLI 호출 (-p 모드: 비대화형)
        const claude = spawn('claude', ['-p', prompt], {
            shell: true,
            stdio: ['pipe', 'pipe', 'pipe']
        });

        let stdout = '';
        let stderr = '';

        claude.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        claude.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        claude.on('close', (code) => {
            if (code === 0) {
                resolve(stdout);
            } else {
                reject(new Error(`Claude 종료 코드: ${code}, stderr: ${stderr}`));
            }
        });

        claude.on('error', (err) => {
            reject(err);
        });
    });
}

// 결과를 Outbox에 저장
function saveToOutbox(orderSheet, response, originalFilename) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const orderId = orderSheet.order_id || 'unknown';
    const outputFilename = `response_${orderId}_${timestamp}.json`;
    const outputPath = path.join(CONFIG.outboxPath, outputFilename);

    const result = {
        original_order: orderSheet,
        response: response,
        processed_at: new Date().toISOString(),
        original_filename: originalFilename
    };

    try {
        fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
        log.success(`결과 저장: ${outputFilename}`);

        // Outbox 파일 추적에 추가
        CONFIG.outboxFiles.set(outputFilename, {
            createdAt: Date.now(),
            originalFilename: originalFilename
        });

        return { outputPath, outputFilename };
    } catch (err) {
        log.error(`결과 저장 실패: ${err.message}`);
        return null;
    }
}

// ========================================
// 2. 사용자 알림
// ========================================

function notifyUser(outputFilename) {
    const message = `Output이 Outbox에 저장되었습니다. 확인해 보세요!`;

    log.success(`★ 알림: ${message} (${outputFilename})`);

    // Windows 토스트 알림
    const powershellCmd = `
        Add-Type -AssemblyName System.Windows.Forms
        $notify = New-Object System.Windows.Forms.NotifyIcon
        $notify.Icon = [System.Drawing.SystemIcons]::Information
        $notify.Visible = $true
        $notify.ShowBalloonTip(5000, 'SSALWorks - Inbox Watcher', '${message}', [System.Windows.Forms.ToolTipIcon]::Info)
        Start-Sleep -Seconds 6
        $notify.Dispose()
    `;

    exec(`powershell -Command "${powershellCmd.replace(/\n/g, ' ')}"`, (err) => {
        if (err) {
            log.warn('Windows 알림 발송 실패, 콘솔 알림만 표시됨');
        }
    });
}

// ========================================
// 3. Outbox 감시 → 사용자 확인 시 Archive 이동
// ========================================

// Outbox의 HTML 파일 접근 여부 확인
function checkOutboxAccess() {
    try {
        const files = fs.readdirSync(CONFIG.outboxPath);
        const htmlFiles = files.filter(f => f.endsWith('.html'));

        for (const htmlFile of htmlFiles) {
            const htmlPath = path.join(CONFIG.outboxPath, htmlFile);
            const stats = fs.statSync(htmlPath);

            // 파일이 접근되었는지 확인 (accessTime > modifiedTime)
            const accessTime = stats.atimeMs;
            const modifyTime = stats.mtimeMs;

            // 접근 시간이 수정 시간보다 5초 이상 나중이면 열어본 것으로 판단
            if (accessTime > modifyTime + 5000) {
                log.info(`사용자 확인 감지: ${htmlFile}`);
                archiveOutboxFile(htmlFile);
            }
        }
    } catch (err) {
        // 조용히 실패 (폴더가 없을 수도 있음)
    }
}

// Outbox 파일을 Archive로 이동
function archiveOutboxFile(htmlFilename) {
    // Archive 폴더 생성
    if (!fs.existsSync(CONFIG.outboxArchivePath)) {
        fs.mkdirSync(CONFIG.outboxArchivePath, { recursive: true });
    }

    // HTML 파일 이동
    const htmlSrc = path.join(CONFIG.outboxPath, htmlFilename);
    const htmlDest = path.join(CONFIG.outboxArchivePath, htmlFilename);

    try {
        fs.renameSync(htmlSrc, htmlDest);
        log.info(`Outbox Archive로 이동: ${htmlFilename}`);
    } catch (err) {
        log.warn(`Outbox Archive 이동 실패: ${err.message}`);
        return;
    }

    // 대응하는 JSON 파일도 이동 (있으면)
    const jsonFilename = htmlFilename.replace('.html', '.json');
    const jsonSrc = path.join(CONFIG.outboxPath, jsonFilename);
    const jsonDest = path.join(CONFIG.outboxArchivePath, jsonFilename);

    if (fs.existsSync(jsonSrc)) {
        try {
            fs.renameSync(jsonSrc, jsonDest);
            log.info(`Outbox Archive로 이동: ${jsonFilename}`);
        } catch (err) {
            log.warn(`JSON Archive 이동 실패: ${err.message}`);
        }
    }

    // 원본 Inbox 파일도 Archive로 이동
    const outboxInfo = CONFIG.outboxFiles.get(jsonFilename);
    if (outboxInfo && outboxInfo.originalFilename) {
        archiveInboxFile(outboxInfo.originalFilename);
        CONFIG.outboxFiles.delete(jsonFilename);
    }
}

// Inbox 파일을 Archive로 이동
function archiveInboxFile(filename) {
    const srcPath = path.join(CONFIG.inboxPath, filename);
    const destPath = path.join(CONFIG.inboxArchivePath, filename);

    // 파일이 아직 있는지 확인
    if (!fs.existsSync(srcPath)) {
        return;
    }

    try {
        // Archive 폴더 없으면 생성
        if (!fs.existsSync(CONFIG.inboxArchivePath)) {
            fs.mkdirSync(CONFIG.inboxArchivePath, { recursive: true });
        }

        fs.renameSync(srcPath, destPath);
        log.info(`Inbox Archive로 이동: ${filename}`);
    } catch (err) {
        log.warn(`Inbox Archive 이동 실패: ${err.message}`);
    }
}

// ========================================
// 4. Order 처리 (메인 로직)
// ========================================

async function processOrder(filename) {
    log.info(`=== 새 Order 감지: ${filename} ===`);

    // 1. Order Sheet 읽기
    const orderSheet = readOrderSheet(filename);
    if (!orderSheet) {
        CONFIG.processedFiles.add(filename);
        return;
    }

    // 2. Claude Code 호출
    try {
        const response = await callClaude(orderSheet, filename);

        // 3. 결과 저장 (Archive로 바로 이동하지 않음!)
        const saved = saveToOutbox(orderSheet, response, filename);

        // 4. 처리 완료 표시
        CONFIG.processedFiles.add(filename);

        // 5. 사용자에게 알림
        if (saved) {
            notifyUser(saved.outputFilename);
        }

        log.success(`=== Order 처리 완료: ${filename} ===\n`);
        log.info(`→ 사용자가 Outbox에서 확인하면 자동으로 Archive로 이동됩니다.\n`);

    } catch (err) {
        log.error(`Order 처리 실패: ${err.message}`);
        CONFIG.processedFiles.add(filename);  // 실패해도 재시도 방지
    }
}

// 처리 중 플래그
let isProcessing = false;

// 메인 루프
async function watchLoop() {
    // 1. Inbox 새 파일 처리
    if (!isProcessing) {
        const newOrders = findNewOrders();

        if (newOrders.length > 0) {
            isProcessing = true;

            for (const filename of newOrders) {
                await processOrder(filename);
            }

            isProcessing = false;
        }
    }

    // 2. Outbox 파일 접근 확인 (사용자가 열어봤는지)
    checkOutboxAccess();
}

// ========================================
// 5. 시작
// ========================================

function start() {
    console.log('\n');
    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║     SSALWorks Inbox Watcher - Claude Code 자동화     ║');
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log(`║  Inbox:  ${CONFIG.inboxPath}`);
    console.log(`║  Outbox: ${CONFIG.outboxPath}`);
    console.log(`║  감시 간격: ${CONFIG.pollInterval / 1000}초`);
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log('║  흐름:                                               ║');
    console.log('║  1. Inbox에 Order Sheet 저장                         ║');
    console.log('║  2. Claude Code 자동 호출                            ║');
    console.log('║  3. Outbox에 결과 저장 + 알림                        ║');
    console.log('║  4. SSALWorks 플랫폼에서 확인                        ║');
    console.log('║  5. 확인 후 자동으로 Archive 이동                    ║');
    console.log('╚══════════════════════════════════════════════════════╝');
    console.log('\n');
    log.info('Inbox/Outbox 감시 시작... (Ctrl+C로 종료)\n');

    // 주기적으로 체크
    setInterval(watchLoop, CONFIG.pollInterval);

    // 시작 시 즉시 한 번 체크
    watchLoop();
}

start();
