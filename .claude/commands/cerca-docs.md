# Cerca Documentazione

Comando per ricercare e raccogliere documentazione tecnica.

## Uso

Quando l'utente chiede di cercare documentazione per un'integrazione o tecnologia:

```
/cerca-docs [tecnologia]
```

## Task Automatico

1. **Ricerca documentazione ufficiale ed esempi**
   - Focalizzarsi su OAuth o altre modalita previste dall'API
   - Documentare lo standard per memorizzare credenziali nel database

2. **Analisi del progetto corrente**
   - Individuare standard per creazione tabelle
   - Adeguarsi agli standard di migration esistenti

3. **Aggiornare cartella docs-ref**
   - Creare/aggiornare sottocartella dedicata
   - Inserire riferimenti e documentazione

4. **Per ogni provider**
   - Ricercare documentazione autenticazione
   - Annotare esempi pratici
   - Documentare procedura configurazione API

## Tecnologie Supportate

- Google OAuth / Google Ads
- GitHub OAuth
- Discord OAuth
- Stripe API
- Supabase
- Better Auth
- Drizzle ORM
- Next.js
- Qualsiasi altra API/SDK

## Output Atteso

```
docs-ref/
├── [tecnologia]/
│   ├── auth.md           # Flusso autenticazione
│   ├── setup.md          # Configurazione iniziale
│   ├── api-reference.md  # Reference API principali
│   └── examples.md       # Esempi di codice
```
