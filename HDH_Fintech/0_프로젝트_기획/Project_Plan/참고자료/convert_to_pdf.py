#!/usr/bin/env python
# -*- coding: utf-8 -*-

import markdown2
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from bs4 import BeautifulSoup
import os
import re

# 한글 폰트 등록 (Windows Malgun Gothic)
try:
    pdfmetrics.registerFont(TTFont('MalgunGothic', 'malgun.ttf'))
    pdfmetrics.registerFont(TTFont('MalgunGothic-Bold', 'malgunbd.ttf'))
    KOREAN_FONT = 'MalgunGothic'
    KOREAN_FONT_BOLD = 'MalgunGothic-Bold'
except:
    KOREAN_FONT = 'Helvetica'
    KOREAN_FONT_BOLD = 'Helvetica-Bold'
    print("Warning: Korean font not found, using Helvetica")

def md_to_pdf(md_file, pdf_file):
    # Markdown 파일 읽기
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()

    # Markdown을 HTML로 변환
    html = markdown2.markdown(md_content, extras=['tables', 'fenced-code-blocks'])

    # PDF 문서 생성
    doc = SimpleDocTemplate(pdf_file, pagesize=A4,
                            rightMargin=inch, leftMargin=inch,
                            topMargin=inch, bottomMargin=inch)

    # 스타일 설정
    styles = getSampleStyleSheet()

    # 한글 스타일 정의
    title_style = ParagraphStyle(
        'KoreanTitle',
        parent=styles['Heading1'],
        fontName=KOREAN_FONT_BOLD,
        fontSize=24,
        textColor=colors.HexColor('#2C3E50'),
        spaceAfter=20,
        alignment=TA_CENTER
    )

    heading1_style = ParagraphStyle(
        'KoreanHeading1',
        parent=styles['Heading1'],
        fontName=KOREAN_FONT_BOLD,
        fontSize=18,
        textColor=colors.HexColor('#2C3E50'),
        spaceAfter=12,
        spaceBefore=12
    )

    heading2_style = ParagraphStyle(
        'KoreanHeading2',
        parent=styles['Heading2'],
        fontName=KOREAN_FONT_BOLD,
        fontSize=14,
        textColor=colors.HexColor('#34495E'),
        spaceAfter=10,
        spaceBefore=10
    )

    heading3_style = ParagraphStyle(
        'KoreanHeading3',
        parent=styles['Heading3'],
        fontName=KOREAN_FONT_BOLD,
        fontSize=12,
        textColor=colors.HexColor('#5D6D7E'),
        spaceAfter=8,
        spaceBefore=8
    )

    normal_style = ParagraphStyle(
        'KoreanNormal',
        parent=styles['Normal'],
        fontName=KOREAN_FONT,
        fontSize=10,
        leading=14
    )

    # HTML 파싱
    soup = BeautifulSoup(html, 'html.parser')

    # PDF 요소 리스트
    story = []

    # 제목 추가
    title = soup.find('h1')
    if title:
        story.append(Paragraph(title.get_text(), title_style))
        story.append(Spacer(1, 0.3*inch))

    # 내용 파싱 및 추가
    for element in soup.find_all(['h1', 'h2', 'h3', 'p', 'table', 'ul', 'ol', 'hr', 'blockquote']):
        if element.name == 'h1':
            if element != title:  # 첫 번째 h1은 이미 추가했음
                story.append(PageBreak())
                story.append(Paragraph(element.get_text(), heading1_style))
        elif element.name == 'h2':
            story.append(Spacer(1, 0.2*inch))
            story.append(Paragraph(element.get_text(), heading2_style))
        elif element.name == 'h3':
            story.append(Spacer(1, 0.15*inch))
            story.append(Paragraph(element.get_text(), heading3_style))
        elif element.name == 'p':
            text = element.get_text().strip()
            if text:
                story.append(Paragraph(text, normal_style))
                story.append(Spacer(1, 0.1*inch))
        elif element.name == 'blockquote':
            text = element.get_text().strip()
            if text:
                quote_style = ParagraphStyle(
                    'Quote',
                    parent=normal_style,
                    leftIndent=20,
                    rightIndent=20,
                    textColor=colors.HexColor('#5D6D7E'),
                    backColor=colors.HexColor('#EBF5FB'),
                    borderPadding=10
                )
                story.append(Paragraph(text, quote_style))
                story.append(Spacer(1, 0.1*inch))
        elif element.name == 'table':
            try:
                # 테이블 데이터 추출
                table_data = []
                for row in element.find_all('tr'):
                    row_data = [cell.get_text().strip() for cell in row.find_all(['th', 'td'])]
                    table_data.append(row_data)

                if table_data:
                    # 테이블 생성
                    t = Table(table_data)
                    t.setStyle(TableStyle([
                        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#3498DB')),
                        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                        ('FONTNAME', (0, 0), (-1, 0), KOREAN_FONT_BOLD),
                        ('FONTSIZE', (0, 0), (-1, 0), 10),
                        ('FONTNAME', (0, 1), (-1, -1), KOREAN_FONT),
                        ('FONTSIZE', (0, 1), (-1, -1), 9),
                        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#BDC3C7'))
                    ]))
                    story.append(t)
                    story.append(Spacer(1, 0.2*inch))
            except:
                pass
        elif element.name == 'hr':
            story.append(Spacer(1, 0.1*inch))

    # PDF 빌드
    try:
        doc.build(story)
        print(f"PDF created successfully: {pdf_file}")
        return True
    except Exception as e:
        print(f"Error creating PDF: {e}")
        return False

if __name__ == "__main__":
    md_file = r"G:\내 드라이브\SUNNY_ECOSYSTEM\HDH_Fintech\Documents\HDH_핀테크_솔루션_금선물_v1.1.md"
    pdf_file = r"G:\내 드라이브\SUNNY_ECOSYSTEM\HDH_Fintech\Documents\HDH_핀테크_솔루션_금선물_v1.1.pdf"

    md_to_pdf(md_file, pdf_file)
