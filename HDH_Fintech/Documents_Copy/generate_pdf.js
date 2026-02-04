const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const htmlPath = 'G:\\내 드라이브\\SUNNY_ECOSYSTEM\\HDH_Fintech\\Documents\\HDH_핀테크_솔루션_금선물_v1.1.html';
  const pdfPath = 'G:\\내 드라이브\\SUNNY_ECOSYSTEM\\HDH_Fintech\\Documents\\HDH_핀테크_솔루션_금선물_v1.1.pdf';

  console.log('Launching browser...');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('Loading HTML file...');
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, {
    waitUntil: 'networkidle0'
  });

  console.log('Generating PDF...');

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: false,
    margin: {
      top: '20mm',
      right: '25mm',
      bottom: '20mm',
      left: '25mm'
    },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size: 9pt; color: #666; width: 100%; text-align: right; padding-right: 25mm; font-family: 'Noto Sans KR', sans-serif;">
        HDH Fintech Solution
      </div>
    `,
    footerTemplate: `
      <div style="font-size: 9pt; color: #666; width: 100%; text-align: center; font-family: 'Noto Sans KR', sans-serif;">
        <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>
    `
  });

  await browser.close();

  // Check file size
  const stats = fs.statSync(pdfPath);
  const fileSizeInKB = stats.size / 1024;

  console.log('✓ PDF successfully created!');
  console.log(`  Location: ${pdfPath}`);
  console.log(`  File size: ${fileSizeInKB.toFixed(2)} KB`);
})();
