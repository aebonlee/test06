// inbox_server.js - Dashboard에서 작성한 내용을 자동으로 inbox/에 저장하는 로컬 서버

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const https = require('https');
const chokidar = require('chokidar');
const { marked } = require('marked');
const { Translate } = require('@google-cloud/translate').v2;
const { spawn, exec } = require('child_process');

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = 3030;

// Google Translate API 설정
const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

// Perplexity API 설정
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

// ============================================
// 🚦 Claude Code 호출 큐 (한 번에 하나씩만 처리)
// ============================================
const claudeQueue = [];
let isProcessingClaude = false;

async function processClaudeQueue() {
    if (isProcessingClaude || claudeQueue.length === 0) {
        return;
    }

    isProcessingClaude = true;
    const task = claudeQueue.shift();

    try {
        await task();
    } catch (error) {
        console.log(`   ❌ 큐 처리 실패: ${error.message}`);
    }

    isProcessingClaude = false;

    // 다음 작업 처리
    if (claudeQueue.length > 0) {
        setTimeout(processClaudeQueue, 100);
    }
}

function enqueueClaudeTask(taskFn) {
    claudeQueue.push(taskFn);
    processClaudeQueue();
}

// CORS 설정 (모든 출처 허용)
app.use(cors());

// JSON 요청 본문 파싱
app.use(express.json({ limit: '10mb' }));

// inbox 디렉토리 경로
const INBOX_DIR = path.join(__dirname, 'Inbox');

// inbox 디렉토리가 없으면 생성
if (!fs.existsSync(INBOX_DIR)) {
    fs.mkdirSync(INBOX_DIR, { recursive: true });
}

// outbox 디렉토리 경로
const OUTBOX_DIR = path.join(__dirname, 'Outbox');

// outbox 디렉토리가 없으면 생성
if (!fs.existsSync(OUTBOX_DIR)) {
    fs.mkdirSync(OUTBOX_DIR, { recursive: true });
}

// Health check 엔드포인트
app.get('/ping', (req, res) => {
    res.json({ status: 'ok', message: 'Inbox server is running' });
});

// Socket.io 테스트 알림 엔드포인트
app.post('/test-notification', (req, res) => {
    const testOrderId = 'TEST-' + Date.now();
    const testMessage = '테스트 Order Sheet입니다!';

    console.log(`🔔 테스트 알림 전송: ${testOrderId}`);

    io.emit('new-order-alert', {
        orderId: testOrderId,
        orderName: '테스트 작업',
        message: testMessage,
        content: 'Socket.io 연결 테스트입니다.',
        timestamp: new Date().toISOString()
    });

    res.json({
        success: true,
        message: '테스트 알림이 전송되었습니다.',
        clientsCount: io.engine.clientsCount,
        testOrderId: testOrderId
    });
});

// 파일 저장 엔드포인트
app.post('/save', (req, res) => {
    try {
        const { content, filename, targetPath } = req.body;

        if (!content) {
            return res.status(400).json({
                success: false,
                error: '내용이 비어있습니다.'
            });
        }

        // 파일명 생성 (제공되지 않으면 타임스탬프 사용)
        let finalFilename = filename;
        if (!finalFilename) {
            const timestamp = new Date().toISOString()
                .slice(0, 19)
                .replace(/:/g, '-')
                .replace('T', '_');
            finalFilename = `order_${timestamp}.json`;
        }

        // .json 확장자가 없으면 추가
        if (!finalFilename.endsWith('.json')) {
            finalFilename += '.json';
        }

        // 대상 디렉토리 결정 (targetPath가 있으면 사용, 없으면 기본 INBOX_DIR)
        let targetDir = INBOX_DIR;
        if (targetPath) {
            targetDir = targetPath;
            // 대상 디렉토리가 없으면 생성
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
                console.log(`📁 디렉토리 생성: ${targetDir}`);
            }
        }

        // 파일 경로
        const filePath = path.join(targetDir, finalFilename);

        // 파일 저장
        fs.writeFileSync(filePath, content, 'utf8');

        console.log(`✅ 파일 저장 완료: ${finalFilename}`);
        console.log(`📂 저장 경로: ${filePath}`);

        res.json({
            success: true,
            filename: finalFilename,
            path: filePath,
            message: `파일이 ${targetDir}에 저장되었습니다.`
        });

    } catch (error) {
        console.error('❌ 파일 저장 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 저장된 파일 목록 조회
app.get('/files', (req, res) => {
    try {
        const files = fs.readdirSync(INBOX_DIR)
            .filter(file => file.endsWith('.md') || file.endsWith('.json'))
            .map(file => {
                const filePath = path.join(INBOX_DIR, file);
                const stats = fs.statSync(filePath);
                return {
                    filename: file,
                    size: stats.size,
                    created: stats.birthtime,
                    modified: stats.mtime,
                    type: file.endsWith('.md') ? 'markdown' : 'json'
                };
            })
            .sort((a, b) => b.modified - a.modified);

        res.json({
            success: true,
            count: files.length,
            files
        });

    } catch (error) {
        console.error('❌ 파일 목록 조회 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Outbox 파일 목록 조회
app.get('/outbox/files', (req, res) => {
    try {
        const files = fs.readdirSync(OUTBOX_DIR)
            .filter(file => file.endsWith('.json') || file.endsWith('.md'))
            .map(file => {
                const filePath = path.join(OUTBOX_DIR, file);
                const stats = fs.statSync(filePath);
                return {
                    filename: file,
                    size: stats.size,
                    created: stats.birthtime,
                    modified: stats.mtime,
                    type: file.endsWith('.md') ? 'markdown' : 'json'
                };
            })
            .sort((a, b) => b.modified - a.modified);

        res.json({
            success: true,
            count: files.length,
            files
        });

    } catch (error) {
        console.error('❌ Outbox 파일 목록 조회 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Outbox 파일 읽기 + 확인 시 Archive로 이동
app.get('/outbox/read/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(OUTBOX_DIR, filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                error: '파일을 찾을 수 없습니다.'
            });
        }

        let content = fs.readFileSync(filePath, 'utf8');
        let contentType = 'json';

        // .md 파일이면 HTML로 변환
        if (filename.endsWith('.md')) {
            contentType = 'markdown';
            const htmlContent = marked.parse(content);

            // JSON으로 감싸서 반환 (대시보드와 호환)
            content = JSON.stringify({
                type: 'markdown',
                title: filename.replace('.md', ''),
                date: new Date().toISOString().split('T')[0],
                content: htmlContent
            });
        }

        // 파일 읽기만 함 (Archive 이동은 별도 엔드포인트로)
        res.json({
            success: true,
            filename: filename,
            content: content,
            type: contentType
        });

    } catch (error) {
        console.error('❌ Outbox 파일 읽기 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ============================================
// 📁 Archive 이동 엔드포인트
// ============================================

const OUTBOX_ARCHIVE_DIR = path.join(OUTBOX_DIR, 'Archive');
const INBOX_ARCHIVE_DIR = path.join(INBOX_DIR, 'Archive');

// Outbox 파일을 Archive로 이동하는 API
app.post('/outbox/archive/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        archiveOutboxFile(filename);
        res.json({
            success: true,
            message: `${filename}이(가) Archive로 이동되었습니다.`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

function archiveOutboxFile(filename) {
    // Archive 폴더 생성
    if (!fs.existsSync(OUTBOX_ARCHIVE_DIR)) {
        fs.mkdirSync(OUTBOX_ARCHIVE_DIR, { recursive: true });
    }

    const srcPath = path.join(OUTBOX_DIR, filename);
    const destPath = path.join(OUTBOX_ARCHIVE_DIR, filename);

    // 파일이 존재하는지 확인
    if (!fs.existsSync(srcPath)) {
        return;
    }

    try {
        fs.renameSync(srcPath, destPath);
        console.log(`📁 [ARCHIVE] Outbox → Archive: ${filename}`);

        // 관련 파일들도 이동 (_ack, _final 등)
        const baseName = filename.replace(/_final\.json$|_ack\.json$|\.json$|\.md$/, '');
        const relatedFiles = fs.readdirSync(OUTBOX_DIR).filter(f => f.startsWith(baseName));

        relatedFiles.forEach(relatedFile => {
            const relatedSrc = path.join(OUTBOX_DIR, relatedFile);
            const relatedDest = path.join(OUTBOX_ARCHIVE_DIR, relatedFile);
            if (fs.existsSync(relatedSrc)) {
                fs.renameSync(relatedSrc, relatedDest);
                console.log(`📁 [ARCHIVE] Outbox → Archive: ${relatedFile}`);
            }
        });

        // 원본 Inbox 파일도 Archive로 이동
        archiveInboxFile(baseName);

    } catch (err) {
        console.log(`⚠️  Archive 이동 실패: ${err.message}`);
    }
}

function archiveInboxFile(baseName) {
    // Archive 폴더 생성
    if (!fs.existsSync(INBOX_ARCHIVE_DIR)) {
        fs.mkdirSync(INBOX_ARCHIVE_DIR, { recursive: true });
    }

    // Inbox에서 관련 파일 찾기
    try {
        const inboxFiles = fs.readdirSync(INBOX_DIR).filter(f =>
            f.endsWith('.json') && !f.startsWith('.')
        );

        inboxFiles.forEach(inboxFile => {
            const inboxPath = path.join(INBOX_DIR, inboxFile);
            try {
                const content = fs.readFileSync(inboxPath, 'utf8');
                const order = JSON.parse(content);
                const orderId = order.order_id || order.task_id || '';

                // Order ID가 baseName에 포함되어 있으면 이동
                if (baseName.includes(orderId)) {
                    const destPath = path.join(INBOX_ARCHIVE_DIR, inboxFile);
                    fs.renameSync(inboxPath, destPath);
                    console.log(`📁 [ARCHIVE] Inbox → Archive: ${inboxFile}`);
                }
            } catch (e) {
                // 파싱 실패 시 무시
            }
        });
    } catch (err) {
        // 조용히 실패
    }
}

// Order 상태 조회 엔드포인트
app.get('/order-status/:orderId', (req, res) => {
    try {
        const { orderId } = req.params;

        // Inbox에서 원본 Order 파일 확인
        const inboxFiles = fs.readdirSync(INBOX_DIR);
        const orderFile = inboxFiles.find(file => {
            if (!file.endsWith('.json')) return false;
            try {
                const content = fs.readFileSync(path.join(INBOX_DIR, file), 'utf-8');
                const order = JSON.parse(content);
                return order.order_id === orderId;
            } catch (e) {
                return false;
            }
        });

        if (!orderFile) {
            return res.status(404).json({
                success: false,
                error: 'Order를 찾을 수 없습니다.'
            });
        }

        // Outbox에서 응답 파일 확인
        const outboxFiles = fs.readdirSync(OUTBOX_DIR);
        const ackFile = outboxFiles.find(f => f.includes(orderId) && f.includes('_ack.json'));
        const finalFile = outboxFiles.find(f => f.includes(orderId) && f.includes('_final.json'));

        let status = '📤 전송됨';
        let message = 'Order가 전송되었습니다.';
        let response = null;

        if (finalFile) {
            status = '✅ 완료';
            message = '작업이 완료되었습니다.';
            const finalContent = fs.readFileSync(path.join(OUTBOX_DIR, finalFile), 'utf-8');
            response = JSON.parse(finalContent);
        } else if (ackFile) {
            status = '⏳ 처리 중';
            message = '작업을 처리하고 있습니다.';
            const ackContent = fs.readFileSync(path.join(OUTBOX_DIR, ackFile), 'utf-8');
            response = JSON.parse(ackContent);
        }

        res.json({
            success: true,
            order_id: orderId,
            status: status,
            message: message,
            response: response,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Order 상태 조회 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Order Sheet 템플릿 조회 엔드포인트
app.get('/ordersheet-templates', (req, res) => {
    try {
        const templatesPath = path.join(__dirname, 'ordersheet_templates.json');

        if (!fs.existsSync(templatesPath)) {
            return res.status(404).json({
                success: false,
                error: '템플릿 파일을 찾을 수 없습니다.'
            });
        }

        const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf8'));

        res.json({
            success: true,
            templates: templates
        });

    } catch (error) {
        console.error('❌ 템플릿 조회 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Welcome 템플릿 조회 엔드포인트
app.get('/welcome-templates', (req, res) => {
    try {
        const templatesPath = path.join(__dirname, 'welcome_templates.json');

        if (!fs.existsSync(templatesPath)) {
            return res.status(404).json({
                success: false,
                error: 'Welcome 템플릿 파일을 찾을 수 없습니다.'
            });
        }

        const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf8'));

        res.json({
            success: true,
            templates: templates
        });

    } catch (error) {
        console.error('❌ Welcome 템플릿 조회 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 특정 Welcome 템플릿 조회 엔드포인트
app.get('/welcome-template/:type', (req, res) => {
    try {
        const { type } = req.params;
        const templatesPath = path.join(__dirname, 'welcome_templates.json');

        if (!fs.existsSync(templatesPath)) {
            return res.status(404).json({
                success: false,
                error: 'Welcome 템플릿 파일을 찾을 수 없습니다.'
            });
        }

        const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf8'));
        const template = templates[type];

        if (!template) {
            return res.status(404).json({
                success: false,
                error: `"${type}" 템플릿을 찾을 수 없습니다.`
            });
        }

        res.json({
            success: true,
            template: template
        });

    } catch (error) {
        console.error('❌ Welcome 템플릿 조회 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ============================================
// 📋 상황별 안내문 & Order Sheet 템플릿 엔드포인트
// ============================================
// 이 코드를 inbox_server.js의 welcome-template/:type 엔드포인트 다음에 추가하세요.

// 상황별 안내문 디렉토리 경로
const GUIDE_DIR = path.join(__dirname, '..', '상황별_안내문');

// Order Sheet 템플릿 디렉토리 경로
const ORDERSHEET_TEMPLATE_DIR = path.join(__dirname, '..', 'Order_Sheet_템플릿');

// 안내문 목록 조회
app.get('/guides', (req, res) => {
    try {
        if (!fs.existsSync(GUIDE_DIR)) {
            return res.status(404).json({
                success: false,
                error: '안내문 디렉토리를 찾을 수 없습니다.'
            });
        }

        const files = fs.readdirSync(GUIDE_DIR)
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const filePath = path.join(GUIDE_DIR, file);
                const stats = fs.statSync(filePath);
                return {
                    filename: file,
                    name: file.replace('.md', ''),
                    size: stats.size,
                    modified: stats.mtime
                };
            });

        res.json({
            success: true,
            count: files.length,
            guides: files
        });

    } catch (error) {
        console.error('❌ 안내문 목록 조회 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 특정 안내문 조회 (마크다운 → HTML 변환)
app.get('/guide/:filename', (req, res) => {
    try {
        let { filename } = req.params;

        // .md 확장자가 없으면 추가
        if (!filename.endsWith('.md')) {
            filename += '.md';
        }

        const filePath = path.join(GUIDE_DIR, filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                error: `안내문 "${filename}"을(를) 찾을 수 없습니다.`
            });
        }

        const content = fs.readFileSync(filePath, 'utf8');
        const htmlContent = marked.parse(content);

        res.json({
            success: true,
            filename: filename,
            name: filename.replace('.md', ''),
            markdown: content,
            html: htmlContent
        });

    } catch (error) {
        console.error('❌ 안내문 조회 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Order Sheet 템플릿 카테고리 목록 조회
app.get('/order-templates', (req, res) => {
    try {
        if (!fs.existsSync(ORDERSHEET_TEMPLATE_DIR)) {
            return res.status(404).json({
                success: false,
                error: 'Order Sheet 템플릿 디렉토리를 찾을 수 없습니다.'
            });
        }

        const categories = [];

        // 최상위 카테고리 폴더 읽기
        const topDirs = fs.readdirSync(ORDERSHEET_TEMPLATE_DIR)
            .filter(d => fs.statSync(path.join(ORDERSHEET_TEMPLATE_DIR, d)).isDirectory());

        topDirs.forEach(topDir => {
            const topPath = path.join(ORDERSHEET_TEMPLATE_DIR, topDir);
            const subDirs = fs.readdirSync(topPath)
                .filter(d => fs.statSync(path.join(topPath, d)).isDirectory());

            if (subDirs.length > 0) {
                // 하위 카테고리가 있는 경우
                subDirs.forEach(subDir => {
                    categories.push({
                        category: `${topDir}/${subDir}`,
                        path: path.join(topPath, subDir)
                    });
                });
            } else {
                // 하위 카테고리가 없는 경우
                categories.push({
                    category: topDir,
                    path: topPath
                });
            }
        });

        res.json({
            success: true,
            count: categories.length,
            categories: categories
        });

    } catch (error) {
        console.error('❌ Order Sheet 템플릿 카테고리 조회 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 특정 카테고리의 Order Sheet 템플릿 목록 조회
app.get('/order-templates/:category', (req, res) => {
    try {
        const { category } = req.params;
        const categoryPath = path.join(ORDERSHEET_TEMPLATE_DIR, category);

        if (!fs.existsSync(categoryPath)) {
            return res.status(404).json({
                success: false,
                error: `카테고리 "${category}"를 찾을 수 없습니다.`
            });
        }

        const files = fs.readdirSync(categoryPath)
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const filePath = path.join(categoryPath, file);
                const stats = fs.statSync(filePath);
                return {
                    filename: file,
                    name: file.replace('.md', ''),
                    size: stats.size,
                    modified: stats.mtime
                };
            });

        res.json({
            success: true,
            category: category,
            count: files.length,
            templates: files
        });

    } catch (error) {
        console.error('❌ Order Sheet 템플릿 목록 조회 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 특정 Order Sheet 템플릿 조회 (마크다운 → HTML 변환)
app.get('/order-template/:category/:filename', (req, res) => {
    try {
        let { category, filename } = req.params;

        // .md 확장자가 없으면 추가
        if (!filename.endsWith('.md')) {
            filename += '.md';
        }

        const filePath = path.join(ORDERSHEET_TEMPLATE_DIR, category, filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                error: `템플릿 "${category}/${filename}"을(를) 찾을 수 없습니다.`
            });
        }

        const content = fs.readFileSync(filePath, 'utf8');
        const htmlContent = marked.parse(content);

        res.json({
            success: true,
            category: category,
            filename: filename,
            name: filename.replace('.md', ''),
            markdown: content,
            html: htmlContent
        });

    } catch (error) {
        console.error('❌ Order Sheet 템플릿 조회 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
// 프로토타입/목업 HTML 파일 제공 엔드포인트
app.get('/dashboard', (req, res) => {
    try {
        const htmlPath = path.join(__dirname, '..', '1_기획', '1-3_UI_UX_Design', 'Prototype', 'prototype_index_최종개선_백업2.html');

        if (!fs.existsSync(htmlPath)) {
            return res.status(404).json({
                success: false,
                error: 'Prototype HTML 파일을 찾을 수 없습니다.'
            });
        }

        res.sendFile(htmlPath);
    } catch (error) {
        console.error('❌ Dashboard HTML 제공 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/mockup', (req, res) => {
    try {
        const htmlPath = path.join(__dirname, '..', '1_기획', '1-3_UI_UX_Design', 'Mockup', 'dashboard-mockup.html');

        if (!fs.existsSync(htmlPath)) {
            return res.status(404).json({
                success: false,
                error: 'Mockup HTML 파일을 찾을 수 없습니다.'
            });
        }

        res.sendFile(htmlPath);
    } catch (error) {
        console.error('❌ Mockup HTML 제공 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 프로젝트 디렉토리 구조 스캔 엔드포인트 (DEFAULT 기능)
app.get('/project-structure', (req, res) => {
    try {
        const projectPath = req.query.path;

        if (!projectPath) {
            return res.status(400).json({
                success: false,
                error: '프로젝트 경로가 필요합니다.'
            });
        }

        if (!fs.existsSync(projectPath)) {
            return res.status(404).json({
                success: false,
                error: '프로젝트 경로를 찾을 수 없습니다.'
            });
        }

        console.log(`📂 프로젝트 구조 스캔: ${projectPath}`);

        // 디렉토리 구조 스캔
        const structure = scanProjectStructure(projectPath);

        res.json({
            success: true,
            projectPath: projectPath,
            structure: structure
        });

    } catch (error) {
        console.error('❌ 프로젝트 구조 스캔 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 프로젝트 디렉토리 구조 스캔 함수
function scanProjectStructure(projectPath) {
    const result = {
        phases: []
    };

    // 대분류 폴더 읽기 (0_, 1_, 2_, 3_, 4_로 시작하는 폴더)
    const dirs = fs.readdirSync(projectPath);
    const phaseDirs = dirs.filter(d => {
        const fullPath = path.join(projectPath, d);
        return d.match(/^\d_/) && fs.statSync(fullPath).isDirectory();
    }).sort();

    phaseDirs.forEach(phaseDir => {
        const phasePath = path.join(projectPath, phaseDir);
        const phase = {
            name: phaseDir,
            path: phasePath,
            categories: []
        };

        // 중분류 폴더 읽기 (1-1_, 1-2_ 형식)
        try {
            const categoryDirs = fs.readdirSync(phasePath)
                .filter(d => {
                    const fullPath = path.join(phasePath, d);
                    return d.match(/^\d-\d_/) && fs.statSync(fullPath).isDirectory();
                }).sort();

            categoryDirs.forEach(categoryDir => {
                const categoryPath = path.join(phasePath, categoryDir);
                const category = {
                    name: categoryDir,
                    path: categoryPath,
                    subcategories: []
                };

                // 소분류 폴더 읽기 (모든 하위 폴더)
                try {
                    const subcategoryDirs = fs.readdirSync(categoryPath)
                        .filter(d => {
                            const fullPath = path.join(categoryPath, d);
                            try {
                                return fs.statSync(fullPath).isDirectory();
                            } catch {
                                return false;
                            }
                        }).sort();

                    category.subcategories = subcategoryDirs.map(sub => ({
                        name: sub,
                        path: path.join(categoryPath, sub)
                    }));
                } catch (e) {
                    // 소분류 없으면 빈 배열
                }

                phase.categories.push(category);
            });
        } catch (e) {
            // 중분류 없으면 빈 배열
        }

        result.phases.push(phase);
    });

    return result;
}

// 새 프로젝트 생성 엔드포인트
// Google Translate API 번역 엔드포인트
app.post('/translate', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                error: '번역할 텍스트가 없습니다.'
            });
        }

        // Google Translate 클라이언트 초기화 (API 키 사용)
        const translate = new Translate({
            key: GOOGLE_TRANSLATE_API_KEY
        });

        // 한글 → 영어 번역
        const [translation] = await translate.translate(text, 'en');

        res.json({
            success: true,
            original: text,
            translated: translation
        });

    } catch (error) {
        console.error('❌ 번역 오류:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Perplexity API 엔드포인트
app.post('/ask-perplexity', async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                error: '질문이 필요합니다.'
            });
        }

        console.log('🔮 Perplexity 질문:', question.substring(0, 50) + '...');

        // AI_Link 서버로 프록시
        const aiResponse = await fetch('http://localhost:3031/ask-perplexity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });

        const result = await aiResponse.json();

        if (result.success) {
            console.log('✅ Perplexity 응답 성공');
            res.json({
                success: true,
                question: question,
                answer: result.answer,
                timestamp: new Date().toISOString()
            });
        } else {
            throw new Error(result.error || 'Perplexity API 오류');
        }

    } catch (error) {
        console.error('❌ Perplexity API 오류:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ChatGPT API 엔드포인트
app.post('/ask-chatgpt', async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                error: '질문이 필요합니다.'
            });
        }

        console.log('💬 ChatGPT 질문:', question.substring(0, 50) + '...');

        // AI_Link 서버로 프록시
        const aiResponse = await fetch('http://localhost:3031/ask-chatgpt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });

        const result = await aiResponse.json();

        if (result.success) {
            console.log('✅ ChatGPT 응답 성공');
            res.json({
                success: true,
                question: question,
                answer: result.answer,
                timestamp: new Date().toISOString()
            });
        } else {
            throw new Error(result.error || 'ChatGPT API 오류');
        }

    } catch (error) {
        console.error('❌ ChatGPT API 오류:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Gemini API 엔드포인트
app.post('/ask-gemini', async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                error: '질문이 필요합니다.'
            });
        }

        console.log('🔷 Gemini 질문:', question.substring(0, 50) + '...');

        // AI_Link 서버로 프록시
        const aiResponse = await fetch('http://localhost:3031/ask-gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });

        const result = await aiResponse.json();

        if (result.success) {
            console.log('✅ Gemini 응답 성공');
            res.json({
                success: true,
                question: question,
                answer: result.answer,
                timestamp: new Date().toISOString()
            });
        } else {
            throw new Error(result.error || 'Gemini API 오류');
        }

    } catch (error) {
        console.error('❌ Gemini API 오류:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


app.post('/create-project', (req, res) => {
    try {
        const { projectName, projectPath } = req.body;

        if (!projectName) {
            return res.status(400).json({
                success: false,
                error: '프로젝트 이름이 필요합니다.'
            });
        }

        console.log(`🚀 새 프로젝트 생성 시작: ${projectName}`);

        // create_project_structure.js 스크립트 경로
        const scriptPath = path.join(__dirname, '..', '2_개발준비', '2-3_Development_Setup', 'create_project_structure.js');

        if (!fs.existsSync(scriptPath)) {
            return res.status(404).json({
                success: false,
                error: '프로젝트 생성 스크립트를 찾을 수 없습니다.'
            });
        }

        // Node.js 자식 프로세스로 스크립트 실행
        const { execSync } = require('child_process');

        const targetPath = projectPath || path.join(__dirname, '..');
        const command = `node "${scriptPath}" "${projectName}" "${targetPath}"`;

        try {
            const output = execSync(command, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });

            console.log(`✅ 프로젝트 생성 완료: ${projectName}`);

            res.json({
                success: true,
                message: `프로젝트 "${projectName}"이(가) 성공적으로 생성되었습니다.`,
                projectName: projectName,
                projectPath: path.join(targetPath, projectName),
                output: output
            });

        } catch (execError) {
            console.error('❌ 프로젝트 생성 실패:', execError.message);
            return res.status(500).json({
                success: false,
                error: '프로젝트 생성 중 오류가 발생했습니다.',
                details: execError.message
            });
        }

    } catch (error) {
        console.error('❌ 프로젝트 생성 요청 실패:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ============================================
// 📁 File Watcher 설정 (실시간 파일 감시)
// ============================================

// Inbox 폴더 감시 (전체 폴더 감시, JSON만 필터링)
const inboxWatcher = chokidar.watch(INBOX_DIR, {
    ignored: /(^|[\/\\])\../, // hidden files
    persistent: true,
    ignoreInitial: false,  // Cycle 3: 기존 파일도 감지
    awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
    },
    usePolling: true,  // Windows에서 더 안정적
    interval: 1000
});

// Outbox 폴더 감시 (전체 폴더 감시, JSON만 필터링)
const outboxWatcher = chokidar.watch(OUTBOX_DIR, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
    },
    usePolling: true,
    interval: 1000
});

// Inbox 파일 추가 이벤트 (JSON 파일만 처리)
inboxWatcher.on('add', (filePath) => {
    const filename = path.basename(filePath);

    // 디버그 로그: 모든 파일 감지 기록
    console.log(`\n🔍 [DEBUG] 파일 감지: ${filename}`);

    // JSON 파일만 처리
    if (!filePath.endsWith('.json')) {
        console.log(`   ⏭️  JSON이 아님, 스킵\n`);
        return;
    }

    // Archive 폴더 무시
    if (filePath.includes('Archive')) {
        console.log(`   ⏭️  Archive 폴더, 스킵\n`);
        return;
    }

    console.log(`\n📬 [INBOX] 새 작업지시(Order) 발견: ${filename}`);
    console.log(`   경로: ${filePath}`);
    console.log(`   시각: ${new Date().toISOString()}`);
    console.log(`   👉 Claude Code가 이 Order를 처리해야 합니다!\n`);

    // 파일 내용 미리보기
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const order = JSON.parse(content);
        console.log(`   Order ID: ${order.order_id || order.task_id || 'N/A'}`);
        console.log(`   작업명: ${order.order_name || order.task_name || 'N/A'}`);
        console.log(`   우선순위: ${order.priority || 'N/A'}`);
        console.log('');

        // 🔔 Claude Code 알림 파일 생성
        const notificationFile = path.join(__dirname, '.new_order_notification');
        const notification = {
            timestamp: new Date().toISOString(),
            filename: filename,
            filepath: filePath,
            order_id: order.order_id || order.task_id || 'N/A',
            order_name: order.order_name || order.task_name || 'N/A',
            priority: order.priority || 'N/A',
            content_korean: order.content_korean || order.content || ''
        };
        fs.writeFileSync(notificationFile, JSON.stringify(notification, null, 2));
        console.log(`   🔔 알림 파일 생성: .new_order_notification\n`);

        // 🚀 1단계 즉시 응답 자동 생성
        const orderId = order.order_id || order.task_id || 'UNKNOWN';
        const ackResponseFile = path.join(__dirname, 'Outbox', `response_${orderId}_ack.json`);

        // Order 내용 분석하여 메시지 선택
        const orderContent = order.content_korean || order.content || '';
        const isQuestion = orderContent.includes('?') || orderContent.includes('인가') || orderContent.includes('있나') ||
                          orderContent.includes('뭐') || orderContent.includes('어떻게') || orderContent.includes('무엇') ||
                          orderContent.includes('설명') || orderContent.includes('알려');

        const message = isQuestion
            ? '질문을 확인했습니다. 답변을 준비하겠습니다.'
            : '요청하신 작업을 시작하겠습니다.';

        const ackResponse = {
            order_id: orderId,
            order_name: order.order_name || order.task_name || 'N/A',
            response_type: 'acknowledgment',
            status: 'in_progress',
            message: message,
            started_at: new Date().toISOString(),
            metadata: {
                auto_generated: true,
                source_file: filename,
                processor: 'inbox_server auto-acknowledgment',
                detected_type: isQuestion ? 'question' : 'task'
            }
        };
        fs.writeFileSync(ackResponseFile, JSON.stringify(ackResponse, null, 2));
        console.log(`   🚀 즉시 응답 생성: response_${orderId}_ack.json`);
        console.log(`   📝 메시지: ${message}\n`);

        // 🔔 Order Sheet 받았다는 알림 발송
        notifyUser(orderId, 'received');

        // 📢 Dashboard에 즉시 팝업 알림 전송
        notifyDashboard(orderId, orderContent);

        // ❌ Claude Code 자동 호출은 제거 - 사용자가 원하는 세션에서 수동으로 처리
        // 사용자가 Dashboard 팝업을 보고 원하는 Claude Code 세션에서 직접 처리합니다
        console.log(`   ⏸️  자동 처리 비활성화 - 사용자가 Claude Code 세션에서 수동 처리하세요\n`);

        /*
        // 🎯 2단계: Claude Code 자동 호출 (큐에 추가) - DISABLED
        enqueueClaudeTask(async () => {
            try {
                console.log(`   🚀 Claude Code 호출 시작: ${orderId}`);
                const response = await callClaudeCode(order, filename, orderId);

                // 결과 저장
                const finalResponseFile = path.join(__dirname, 'Outbox', `response_${orderId}_final.json`);
                const finalResponse = {
                    order_id: orderId,
                    order_name: order.order_name || order.task_name || 'N/A',
                    response_type: 'final',
                    status: 'completed',
                    response: response,
                    completed_at: new Date().toISOString(),
                    metadata: {
                        source_file: filename,
                        processor: 'inbox_server + claude -p'
                    }
                };
                fs.writeFileSync(finalResponseFile, JSON.stringify(finalResponse, null, 2));
                console.log(`   ✅ 결과 저장: response_${orderId}_final.json`);

                // 사용자 알림
                notifyUser(orderId);

            } catch (err) {
                console.log(`   ❌ Claude Code 호출 실패: ${err.message}\n`);
            }
        });
        */

    } catch (e) {
        console.log(`   ⚠️  JSON 파싱 오류: ${e.message}\n`);
    }
});

// ============================================
// 🤖 Claude Code 호출 함수
// ============================================

function callClaudeCode(orderSheet, filename, orderId) {
    return new Promise((resolve, reject) => {
        // 프롬프트를 간단하게 만들기
        const content = orderSheet.content_korean || orderSheet.content || '';
        const prompt = `다음 요청을 처리해주세요:\n\n${content}\n\n위 내용을 읽고 답변해주세요.`;

        console.log(`   📝 Claude Code 호출 준비: ${orderId}`);

        // 프롬프트를 임시 파일에 저장
        const tempFile = path.join(__dirname, `temp_prompt_${orderId}.txt`);
        try {
            fs.writeFileSync(tempFile, prompt, 'utf8');
        } catch (err) {
            reject(new Error(`프롬프트 파일 저장 실패: ${err.message}`));
            return;
        }

        // cat 명령으로 파일 내용을 claude에 전달
        const command = `cat "${tempFile}" | claude -p`;

        exec(command, {
            shell: true,
            maxBuffer: 10 * 1024 * 1024,  // 10MB
            timeout: 120000  // 2분
        }, (error, stdout, stderr) => {
            // 임시 파일 삭제
            try {
                if (fs.existsSync(tempFile)) {
                    fs.unlinkSync(tempFile);
                }
            } catch (e) {
                // 무시
            }

            if (error) {
                console.log(`   ❌ Claude 실행 오류: ${error.message}`);
                if (stderr) console.log(`   stderr: ${stderr}`);
                reject(new Error(`Claude 실행 실패: ${error.message}`));
                return;
            }

            if (stdout.trim()) {
                console.log(`   ✅ Claude 응답 받음 (${stdout.length} bytes)`);
                resolve(stdout);
            } else {
                reject(new Error('Claude가 빈 응답을 반환했습니다.'));
            }
        });
    });
}

// ============================================
// 🔔 사용자 알림 함수
// ============================================

function notifyUser(orderId, type = 'completed') {
    let message;
    if (type === 'received') {
        message = `Order Sheet를 받았습니다. 처리를 시작합니다. (${orderId})`;
    } else {
        message = `Output이 Outbox에 저장되었습니다. 확인해 보세요! (${orderId})`;
    }

    console.log(`   🔔 알림: ${message}\n`);

    // Windows 토스트 알림
    const powershellCmd = `
        Add-Type -AssemblyName System.Windows.Forms
        $notify = New-Object System.Windows.Forms.NotifyIcon
        $notify.Icon = [System.Drawing.SystemIcons]::Information
        $notify.Visible = $true
        $notify.ShowBalloonTip(5000, 'SSALWorks - Inbox/Outbox', '${message}', [System.Windows.Forms.ToolTipIcon]::Info)
        Start-Sleep -Seconds 6
        $notify.Dispose()
    `;

    exec(`powershell -Command "${powershellCmd.replace(/\n/g, ' ')}"`, (err) => {
        if (err) {
            console.log('   ⚠️  Windows 알림 실패, 콘솔 알림만 표시됨\n');
        }
    });
}

// Inbox 파일 변경 이벤트
inboxWatcher.on('change', (filePath) => {
    const filename = path.basename(filePath);
    console.log(`\n🔄 [INBOX] Order 수정됨: ${filename}`);
    console.log(`   경로: ${filePath}\n`);
});

// Inbox 파일 삭제 이벤트
inboxWatcher.on('unlink', (filePath) => {
    const filename = path.basename(filePath);
    console.log(`\n🗑️  [INBOX] Order 삭제됨: ${filename}`);
    console.log(`   경로: ${filePath}\n`);
});

// Outbox 파일 추가 이벤트 (JSON 파일만 처리)
outboxWatcher.on('add', (filePath) => {
    // JSON 파일만 처리
    if (!filePath.endsWith('.json')) return;

    const filename = path.basename(filePath);
    console.log(`\n📤 [OUTBOX] Order 완료 보고서 생성됨: ${filename}`);
    console.log(`   경로: ${filePath}`);

    // 보고서 내용 미리보기
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const report = JSON.parse(content);
        console.log(`   Order ID: ${report.order_id || report.task_id || 'N/A'}`);
        console.log(`   작업명: ${report.order_name || report.task_name || 'N/A'}`);
        console.log(`   상태: ${report.status || 'N/A'}`);
        console.log('');
    } catch (e) {
        console.log(`   ⚠️  JSON 파싱 오류: ${e.message}\n`);
    }
});

// Watcher 에러 핸들링
inboxWatcher.on('error', (error) => {
    console.error('❌ [INBOX WATCHER] 오류:', error);
});

outboxWatcher.on('error', (error) => {
    console.error('❌ [OUTBOX WATCHER] 오류:', error);
});

// Watcher 준비 완료
inboxWatcher.on('ready', () => {
    console.log('✅ Inbox 폴더 감시 시작');
});

outboxWatcher.on('ready', () => {
    console.log('✅ Outbox 폴더 감시 시작');
});

// ============================================
// 🔌 Socket.io 연결 관리
// ============================================
io.on('connection', (socket) => {
    console.log(`✅ Dashboard 연결됨: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`❌ Dashboard 연결 끊김: ${socket.id}`);
    });
});

// ============================================
// 📢 Dashboard에 즉시 알림 보내는 함수
// ============================================
function notifyDashboard(orderId, orderContent) {
    const message = `Order Sheet가 Inbox에 저장되었습니다.\n\n원하는 Claude Code 세션에 가서\n"Inbox에 저장된 Order Sheet를 확인해줘"\n라고 말씀해주세요.\n\nOrder ID: ${orderId}`;

    io.emit('new-order-alert', {
        orderId: orderId,
        message: message,
        content: orderContent,
        timestamp: new Date().toISOString()
    });

    console.log(`📤 Dashboard에 알림 전송: ${orderId} (${io.engine.clientsCount}개 클라이언트)`);
}

// 서버 시작
server.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   📬 Inbox/Outbox Server 실행 중                       ║
║   🔌 WebSocket 실시간 알림 활성화                      ║
║                                                       ║
║   포트: ${PORT}                                        ║
║   Inbox 경로: ${INBOX_DIR}
║   Outbox 경로: ${OUTBOX_DIR}
║                                                       ║
║   🔍 File Watcher 활성화:                             ║
║   - Inbox/*.json 실시간 감시 중                        ║
║   - Outbox/*.json 실시간 감시 중                       ║
║                                                       ║
║   API 엔드포인트:                                      ║
║   - POST http://localhost:${PORT}/save                ║
║   - POST http://localhost:${PORT}/create-project      ║
║   - POST http://localhost:${PORT}/translate           ║
║   - GET  http://localhost:${PORT}/files               ║
║   - GET  http://localhost:${PORT}/outbox/files        ║
║   - GET  http://localhost:${PORT}/outbox/read/:id     ║
║   - GET  http://localhost:${PORT}/order-status/:id    ║
║   - GET  http://localhost:${PORT}/ordersheet-templates║
║   - GET  http://localhost:${PORT}/welcome-templates   ║
║   - GET  http://localhost:${PORT}/welcome-template/:t ║
║   - GET  http://localhost:${PORT}/dashboard           ║
║   - GET  http://localhost:${PORT}/mockup              ║
║   - GET  http://localhost:${PORT}/project-structure   ║
║   - GET  http://localhost:${PORT}/ping                ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
    `);
});

// 에러 핸들링
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled Rejection:', error);
});
