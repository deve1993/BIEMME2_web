#!/usr/bin/env python3
"""
Prettier Format Hook
Formatta automaticamente i file dopo ogni modifica.
Attivato dopo Write/Edit su file supportati.
"""

import json
import sys
import subprocess
import os


def main():
    try:
        # Legge JSON da stdin
        stdin_data = sys.stdin.read()

        if not stdin_data.strip():
            sys.exit(0)

        try:
            input_data = json.loads(stdin_data)
            tool_input = input_data.get("tool_input", {})
            file_path = tool_input.get("file_path", "")
        except json.JSONDecodeError:
            sys.exit(0)

        # File supportati da Prettier
        supported_extensions = (
            '.js', '.jsx', '.ts', '.tsx',
            '.css', '.scss', '.less',
            '.json', '.md', '.mdx',
            '.html', '.vue', '.svelte'
        )

        if not file_path.endswith(supported_extensions):
            sys.exit(0)

        if not os.path.exists(file_path):
            sys.exit(0)

        # Determina la directory del progetto
        project_dir = os.environ.get('CLAUDE_PROJECT_DIR', os.getcwd())

        # Cerca package.json per trovare la root del progetto
        current_dir = os.path.dirname(os.path.abspath(file_path))
        while current_dir != os.path.dirname(current_dir):
            if os.path.exists(os.path.join(current_dir, 'package.json')):
                project_dir = current_dir
                break
            current_dir = os.path.dirname(current_dir)

        # Esegue Prettier (silenziosamente)
        subprocess.run(
            ['npx', 'prettier', '--write', file_path],
            capture_output=True,
            text=True,
            cwd=project_dir,
            shell=True  # Necessario su Windows
        )

        # Non blocca mai, formatta e basta
        sys.exit(0)

    except Exception as e:
        # In caso di errore, non bloccare
        sys.exit(0)


if __name__ == "__main__":
    main()
