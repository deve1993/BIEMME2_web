#!/usr/bin/env python3
"""
ESLint Validator Hook
Blocca le modifiche se ci sono errori ESLint nei file JS/TS.
Attivato dopo Write/Edit su file .js, .jsx, .ts, .tsx
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

        # Solo file JS/TS
        if not file_path.endswith(('.js', '.jsx', '.ts', '.tsx')):
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

        # Esegue ESLint
        result = subprocess.run(
            ['npx', 'eslint', file_path, '--format', 'json'],
            capture_output=True,
            text=True,
            cwd=project_dir,
            shell=True  # Necessario su Windows
        )

        if result.returncode != 0:
            try:
                lint_results = json.loads(result.stdout)
                if lint_results and lint_results[0].get('messages'):
                    # Filtra solo errori (severity >= 2) o warning importanti
                    errors = [
                        msg for msg in lint_results[0]['messages']
                        if msg['severity'] >= 2  # Solo errori, non warning
                    ]

                    if errors:
                        error_details = "\n".join([
                            f"  Riga {e['line']}: {e['message']} ({e.get('ruleId', 'unknown')})"
                            for e in errors[:5]
                        ])

                        output = {
                            "decision": "block",
                            "reason": f"ESLint: {len(errors)} errore/i in {os.path.basename(file_path)}",
                            "hookSpecificOutput": {
                                "hookEventName": "PostToolUse",
                                "additionalContext": f"Errori trovati:\n{error_details}"
                            }
                        }
                        print(json.dumps(output))
                        sys.exit(0)
            except json.JSONDecodeError:
                pass

        sys.exit(0)

    except Exception as e:
        # In caso di errore, non bloccare
        print(f"Hook ESLint error: {e}", file=sys.stderr)
        sys.exit(0)


if __name__ == "__main__":
    main()
