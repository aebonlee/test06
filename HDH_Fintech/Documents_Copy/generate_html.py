#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Generate styled HTML from Markdown for PDF conversion
"""

import markdown
import re

# Read the markdown file
markdown_file = r'G:\내 드라이브\SUNNY_ECOSYSTEM\HDH_Fintech\Documents\HDH_핀테크_솔루션_금선물_v1.1.md'
html_file = r'G:\내 드라이브\SUNNY_ECOSYSTEM\HDH_Fintech\Documents\HDH_핀테크_솔루션_금선물_v1.1.html'

with open(markdown_file, 'r', encoding='utf-8') as f:
    md_content = f.read()

# Convert markdown to HTML with extensions
md = markdown.Markdown(extensions=[
    'tables',
    'fenced_code',
    'codehilite',
    'nl2br',
    'sane_lists',
    'attr_list'
])
html_body = md.convert(md_content)

# Create professional HTML template
html_template = f'''<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HDH 핀테크 솔루션 - 금 선물 기반 무위험 차익거래 전략</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');

        @page {{
            size: A4;
            margin: 20mm 25mm;
        }}

        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            font-family: 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
            font-size: 11pt;
            line-height: 1.8;
            color: #2c3e50;
            background: white;
            padding: 20px;
            max-width: 210mm;
            margin: 0 auto;
        }}

        /* Headings */
        h1 {{
            font-size: 32pt;
            font-weight: 900;
            color: white;
            margin: 30pt 0 20pt 0;
            padding: 25pt 20pt;
            background: linear-gradient(135deg, #159a9c 0%, #1a5f7a 100%);
            border-radius: 10px;
            text-align: center;
            page-break-after: avoid;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }}

        h1:first-of-type {{
            margin-top: 0;
        }}

        h2 {{
            font-size: 24pt;
            font-weight: 700;
            color: #159a9c;
            margin: 35pt 0 18pt 0;
            padding-bottom: 10pt;
            border-bottom: 4px solid #159a9c;
            page-break-after: avoid;
        }}

        h3 {{
            font-size: 18pt;
            font-weight: 700;
            color: #2c7a7b;
            margin: 25pt 0 14pt 0;
            padding-left: 15pt;
            border-left: 5px solid #159a9c;
            page-break-after: avoid;
        }}

        h4 {{
            font-size: 14pt;
            font-weight: 600;
            color: #1a5f7a;
            margin: 18pt 0 12pt 0;
            page-break-after: avoid;
        }}

        /* Paragraphs */
        p {{
            margin: 10pt 0;
            text-align: justify;
            line-height: 1.8;
        }}

        /* Strong and emphasis */
        strong {{
            color: #159a9c;
            font-weight: 700;
        }}

        em {{
            color: #e63946;
            font-style: normal;
            font-weight: 600;
        }}

        /* Lists */
        ul, ol {{
            margin: 12pt 0 12pt 30pt;
            padding-left: 20pt;
        }}

        li {{
            margin: 8pt 0;
            line-height: 1.7;
        }}

        /* Tables */
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20pt 0;
            font-size: 10.5pt;
            background: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            page-break-inside: avoid;
            border-radius: 8px;
            overflow: hidden;
        }}

        thead {{
            background: linear-gradient(135deg, #159a9c 0%, #1a5f7a 100%);
            color: white;
        }}

        th {{
            padding: 14pt 12pt;
            text-align: center;
            font-weight: 700;
            border: 1px solid #0d7377;
            font-size: 11pt;
        }}

        td {{
            padding: 12pt 10pt;
            border: 1px solid #cbd5e0;
            text-align: center;
        }}

        tbody tr:nth-child(even) {{
            background-color: #f7fafc;
        }}

        tbody tr:hover {{
            background-color: #e6f7f7;
        }}

        /* Code blocks */
        code {{
            background: #f7fafc;
            padding: 2pt 6pt;
            border-radius: 4px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 9.5pt;
            color: #e63946;
            border: 1px solid #e2e8f0;
        }}

        pre {{
            background: #2d3748;
            color: #e2e8f0;
            padding: 18pt;
            border-radius: 8px;
            overflow-x: auto;
            margin: 18pt 0;
            border-left: 5px solid #159a9c;
            page-break-inside: avoid;
            line-height: 1.6;
        }}

        pre code {{
            background: transparent;
            color: #e2e8f0;
            border: none;
            padding: 0;
            font-size: 10pt;
        }}

        /* Blockquotes */
        blockquote {{
            background: linear-gradient(135deg, #fff9e6 0%, #fffbf0 100%);
            border-left: 5px solid #ffc107;
            padding: 15pt 18pt;
            margin: 18pt 0;
            color: #795548;
            border-radius: 0 8px 8px 0;
            page-break-inside: avoid;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }}

        blockquote p {{
            margin: 5pt 0;
        }}

        /* Horizontal rules */
        hr {{
            border: none;
            border-top: 3px solid #e2e8f0;
            margin: 30pt 0;
        }}

        /* Special boxes for important info */
        .highlight-box {{
            background: linear-gradient(135deg, #e6f7f7 0%, #f0fdfa 100%);
            border: 3px solid #159a9c;
            border-radius: 10px;
            padding: 18pt;
            margin: 18pt 0;
            page-break-inside: avoid;
            box-shadow: 0 2px 6px rgba(21, 154, 156, 0.15);
        }}

        /* Page breaks */
        .page-break {{
            page-break-before: always;
        }}

        .avoid-break {{
            page-break-inside: avoid;
        }}

        /* Header/Footer info */
        .document-header {{
            text-align: center;
            margin-bottom: 30pt;
            padding-bottom: 15pt;
            border-bottom: 2px solid #e2e8f0;
        }}

        .document-title {{
            font-size: 36pt;
            font-weight: 900;
            color: #1a5f7a;
            margin-bottom: 15pt;
        }}

        .document-subtitle {{
            font-size: 20pt;
            font-weight: 500;
            color: #159a9c;
            margin-bottom: 10pt;
        }}

        .document-version {{
            font-size: 12pt;
            color: #718096;
            font-weight: 400;
        }}

        .document-footer {{
            text-align: center;
            margin-top: 40pt;
            padding-top: 20pt;
            border-top: 2px solid #e2e8f0;
            color: #a0aec0;
            font-size: 10pt;
        }}

        /* Print optimizations */
        @media print {{
            body {{
                padding: 0;
            }}

            a {{
                text-decoration: none;
                color: inherit;
            }}

            .no-print {{
                display: none;
            }}
        }}

        /* Emoji support */
        .emoji {{
            font-family: 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif;
        }}
    </style>
</head>
<body>
    {html_body}
</body>
</html>
'''

# Write HTML file
with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_template)

print(f"HTML successfully created at: {html_file}")
