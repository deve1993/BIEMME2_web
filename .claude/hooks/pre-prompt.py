#!/usr/bin/env python3
"""
Pre-Prompt Hook
Mostra ora attuale e reminder prima di ogni prompt.
Attivato su UserPromptSubmit.
"""

import datetime
import sys
import os


def main():
    try:
        # Ora attuale in formato leggibile
        now = datetime.datetime.now()
        ora = now.strftime('%Y-%m-%d %H:%M:%S')
        giorno = now.strftime('%A')

        # Mappa giorni in italiano
        giorni_it = {
            'Monday': 'Lunedi',
            'Tuesday': 'Martedi',
            'Wednesday': 'Mercoledi',
            'Thursday': 'Giovedi',
            'Friday': 'Venerdi',
            'Saturday': 'Sabato',
            'Sunday': 'Domenica'
        }
        giorno_it = giorni_it.get(giorno, giorno)

        print(f"{'='*60}")
        print(f"  Data/Ora: {ora} ({giorno_it})")
        print(f"{'='*60}")

        # Reminder e regole
        print("""
REMINDER PRIMA DI PROCEDERE:

1. RICERCHE WEB: Usa l'anno corretto (2025) per ricerche aggiornate

2. OPERAZIONI GIT:
   - MAI push a main/master senza conferma esplicita
   - MAI force push senza conferma esplicita
   - MAI amend di commit gia pushati
   - Chiedi conferma prima di operazioni distruttive

3. FILE SENSIBILI:
   - MAI committare .env, credentials, secrets
   - Controlla sempre cosa stai per committare

4. QUALITA CODICE:
   - TypeScript strict mode
   - Niente console.log in produzione
   - Gestione errori appropriata

5. AGENTI:
   - Usa Task tool con subagent per task complessi
   - Usa Explore agent per cercare nel codebase
   - Usa TodoWrite per tracciare task multipli

6. SICUREZZA:
   - No hardcoded secrets
   - Valida input utente
   - Sanitizza output

""")

    except Exception as e:
        # Non bloccare mai in caso di errore
        pass

    sys.exit(0)


if __name__ == "__main__":
    main()
