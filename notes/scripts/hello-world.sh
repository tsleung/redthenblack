#!/bin/bash
echo "Hello, world! $(date)"  # Output a timestamp

python main.py templates/template.txt markdown/output.md name="Hello World" file_content=markdown/extra_info.md