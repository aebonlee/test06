#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Professional PDF Generator for HDH Fintech Solution Document
Creates a visually appealing PDF with Korean language support
"""

import markdown
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration
import os

# Read the markdown file
markdown_file = r'G:\내 드라이브\SUNNY_ECOSYSTEM\HDH_Fintech\Documents\HDH_핀테크_솔루션_금선물_v1.1.md'
output_file = r'G:\내 드라이브\SUNNY_ECOSYSTEM\HDH_Fintech\Documents\HDH_핀테크_솔루션_금선물_v1.1.pdf'

with open(markdown_file, 'r', encoding='utf-8') as f:
    md_content = f.read()

# Convert markdown to HTML with extensions
md = markdown.Markdown(extensions=[
    'tables',
    'fenced_code',
    'codehilite',
    'nl2br',
    'sane_lists'
])
html_content = md.convert(md_content)

# Create professional HTML template with Korean font support
html_template = f'''
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HDH 핀테크 솔루션 - 금 선물</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');

        @page {{
            size: A4;
            margin: 2cm 2.5cm;

            @top-right {{
                content: "HDH Fintech Solution";
                font-family: 'Noto Sans KR', sans-serif;
                font-size: 9pt;
                color: #666;
            }}

            @bottom-center {{
                content: counter(page);
                font-family: 'Noto Sans KR', sans-serif;
                font-size: 9pt;
                color: #666;
            }}
        }}

        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
            font-size: 11pt;
            line-height: 1.8;
            color: #2c3e50;
            background: white;
        }}

        h1 {{
            font-size: 28pt;
            font-weight: 900;
            color: #1a5f7a;
            margin: 40pt 0 20pt 0;
            padding: 20pt;
            background: linear-gradient(135deg, #159a9c 0%, #1a5f7a 100%);
            color: white;
            border-radius: 8pt;
            text-align: center;
            page-break-before: always;
            page-break-after: avoid;
        }}

        h1:first-of-type {{
            page-break-before: auto;
            margin-top: 0;
        }}

        h2 {{
            font-size: 22pt;
            font-weight: 700;
            color: #159a9c;
            margin: 30pt 0 15pt 0;
            padding-bottom: 8pt;
            border-bottom: 3pt solid #159a9c;
            page-break-after: avoid;
        }}

        h3 {{
            font-size: 16pt;
            font-weight: 700;
            color: #2c7a7b;
            margin: 20pt 0 12pt 0;
            padding-left: 12pt;
            border-left: 4pt solid #159a9c;
            page-break-after: avoid;
        }}

        h4 {{
            font-size: 13pt;
            font-weight: 600;
            color: #1a5f7a;
            margin: 15pt 0 10pt 0;
            page-break-after: avoid;
        }}

        p {{
            margin: 8pt 0;
            text-align: justify;
        }}

        strong {{
            color: #159a9c;
            font-weight: 700;
        }}

        em {{
            color: #e63946;
            font-style: normal;
            font-weight: 600;
        }}

        ul, ol {{
            margin: 10pt 0 10pt 25pt;
            padding-left: 15pt;
        }}

        li {{
            margin: 6pt 0;
            line-height: 1.6;
        }}

        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 15pt 0;
            font-size: 10pt;
            background: white;
            box-shadow: 0 2pt 4pt rgba(0,0,0,0.1);
            page-break-inside: avoid;
        }}

        thead {{
            background: linear-gradient(135deg, #159a9c 0%, #1a5f7a 100%);
            color: white;
        }}

        th {{
            padding: 12pt 10pt;
            text-align: left;
            font-weight: 700;
            border: 1pt solid #159a9c;
        }}

        td {{
            padding: 10pt;
            border: 1pt solid #cbd5e0;
        }}

        tbody tr:nth-child(even) {{
            background-color: #f7fafc;
        }}

        tbody tr:hover {{
            background-color: #e6f7f7;
        }}

        code {{
            background: #f7fafc;
            padding: 2pt 6pt;
            border-radius: 3pt;
            font-family: 'Courier New', monospace;
            font-size: 9pt;
            color: #e63946;
            border: 1pt solid #e2e8f0;
        }}

        pre {{
            background: #2d3748;
            color: #e2e8f0;
            padding: 15pt;
            border-radius: 6pt;
            overflow-x: auto;
            margin: 15pt 0;
            border-left: 4pt solid #159a9c;
            page-break-inside: avoid;
        }}

        pre code {{
            background: transparent;
            color: #e2e8f0;
            border: none;
            padding: 0;
        }}

        blockquote {{
            background: #fff9e6;
            border-left: 4pt solid #ffc107;
            padding: 12pt 15pt;
            margin: 15pt 0;
            font-style: italic;
            color: #795548;
            border-radius: 0 6pt 6pt 0;
            page-break-inside: avoid;
        }}

        hr {{
            border: none;
            border-top: 2pt solid #e2e8f0;
            margin: 25pt 0;
        }}

        /* Special styling for key sections */
        .highlight-box {{
            background: linear-gradient(135deg, #e6f7f7 0%, #f0fdfa 100%);
            border: 2pt solid #159a9c;
            border-radius: 8pt;
            padding: 15pt;
            margin: 15pt 0;
            page-break-inside: avoid;
        }}

        /* Page break controls */
        .page-break {{
            page-break-before: always;
        }}

        .avoid-break {{
            page-break-inside: avoid;
        }}

        /* First page special styling */
        .cover-title {{
            font-size: 36pt;
            font-weight: 900;
            text-align: center;
            color: #1a5f7a;
            margin: 60pt 0 30pt 0;
        }}

        .cover-subtitle {{
            font-size: 20pt;
            font-weight: 500;
            text-align: center;
            color: #159a9c;
            margin: 15pt 0;
        }}

        .version {{
            text-align: center;
            color: #718096;
            font-size: 11pt;
            margin: 10pt 0 40pt 0;
        }}

        /* Footer styling */
        .footer {{
            text-align: center;
            color: #a0aec0;
            font-size: 9pt;
            margin-top: 40pt;
            padding-top: 15pt;
            border-top: 1pt solid #e2e8f0;
        }}
    </style>
</head>
<body>
    {html_content}
</body>
</html>
'''

# Generate PDF with font configuration
font_config = FontConfiguration()

# Create CSS for better styling
css = CSS(string='''
    @page {
        size: A4;
        margin: 2cm 2.5cm;
    }
''', font_config=font_config)

# Generate the PDF
html = HTML(string=html_template)
html.write_pdf(
    output_file,
    stylesheets=[css],
    font_config=font_config
)

print(f"PDF successfully created at: {output_file}")
print(f"File size: {os.path.getsize(output_file) / 1024:.2f} KB")
