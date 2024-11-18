#!/bin/bash
echo "Hello, world! $(date)"  # Output a timestamp

python main.py templates/create-prd-startup.md markdown/rtb-prd.md prd_context="markdown/rtb-notes.md"
python main.py templates/create-advisory-startup.md markdown/rtb-advisory.md prd_context="markdown/rtb-prd.md" notes_context="markdown/rtb-notes.md"
python main.py templates/create-philosophy-startup.md markdown/rtb-philosophy.md notes_context="markdown/rtb-notes.md"
python main.py templates/create-coaching-startup.md markdown/rtb-coaching.md notes_context="markdown/rtb-notes.md"
python main.py templates/create-critic-startup.md markdown/rtb-critic.md notes_context="markdown/rtb-notes.md"
python main.py templates/create-pitch-startup.md markdown/rtb-pitch.md prd_context="markdown/rtb-prd.md" notes_context="markdown/rtb-notes.md"
python main.py templates/template.txt markdown/output.md name="Hello World" file_content=markdown/extra_info.md

