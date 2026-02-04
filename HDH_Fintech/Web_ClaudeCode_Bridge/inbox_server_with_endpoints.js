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
