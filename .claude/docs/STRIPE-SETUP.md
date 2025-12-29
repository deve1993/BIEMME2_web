# Guida Configurazione Stripe

Questa guida spiega come configurare Stripe per l'integrazione con Better Auth.

## Prerequisiti

- Account Stripe (crea su [stripe.com](https://stripe.com))
- Accesso alla [Stripe Dashboard](https://dashboard.stripe.com)

---

## Step 1: Ottenere le API Keys

1. Vai su **Stripe Dashboard** -> **Developers** -> **API keys**
2. Copia le chiavi:
   - **Publishable key** (inizia con `pk_test_` o `pk_live_`)
   - **Secret key** (inizia con `sk_test_` o `sk_live_`)

3. Aggiorna `.env.local`:
```env
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

> **Nota**: Usa le chiavi `test` per sviluppo, `live` per produzione.

---

## Step 2: Creare i Prodotti

### 2.1 Vai alla sezione Prodotti

1. **Stripe Dashboard** -> **Product catalog** -> **Products**
2. Clicca **+ Add product**

### 2.2 Creare il piano FREE (opzionale)

Per il piano gratuito, puoi:
- **Non creare nulla** - Gli utenti senza abbonamento sono "free"
- **Creare un prodotto a $0** - Se vuoi tracciare anche i free users

Se vuoi creare:
```
Name: Free Plan
Description: Piano gratuito per iniziare
Pricing: Recurring - $0.00 / month
```

### 2.3 Creare il piano PRO

1. Clicca **+ Add product**
2. Compila:
   ```
   Name: Pro Plan
   Description: Per professionisti e piccoli team
   ```
3. In **Pricing**:
   - Seleziona **Recurring**
   - Price: `$19.00`
   - Billing period: `Monthly`
4. Clicca **Save product**
5. **IMPORTANTE**: Copia il **Price ID** (es. `price_1QxyzABC123...`)

### 2.4 Creare il piano ENTERPRISE

1. Clicca **+ Add product**
2. Compila:
   ```
   Name: Enterprise Plan
   Description: Per grandi organizzazioni
   ```
3. In **Pricing**:
   - Seleziona **Recurring**
   - Price: `$99.00`
   - Billing period: `Monthly`
4. Clicca **Save product**
5. **IMPORTANTE**: Copia il **Price ID**

### 2.5 Aggiornare il codice con i Price IDs

Modifica `lib/auth.ts` sostituendo i placeholder:

```typescript
plans: [
  {
    name: 'free',
    priceId: 'price_FREE_ID_QUI', // o rimuovi se non usi
    limits: { projects: 3, storage: 1 },
  },
  {
    name: 'pro',
    priceId: 'price_PRO_ID_QUI', // <-- Sostituisci
    limits: { projects: 20, storage: 50 },
    freeTrial: { days: 14 },
  },
  {
    name: 'enterprise',
    priceId: 'price_ENTERPRISE_ID_QUI', // <-- Sostituisci
    limits: { projects: -1, storage: -1 },
  },
],
```

---

## Step 3: Configurare il Webhook

### 3.1 Creare l'endpoint webhook

1. Vai su **Stripe Dashboard** -> **Developers** -> **Webhooks**
2. Clicca **+ Add endpoint**

### 3.2 Configurare l'URL

**Per Produzione:**
```
https://tuo-dominio.com/api/auth/stripe/webhook
```

**Per Sviluppo Locale:** (vedi Step 4)

### 3.3 Selezionare gli eventi

Clicca **Select events** -> **+ Select events**

**EVENTI OBBLIGATORI** (seleziona questi):

```
checkout.session.completed
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
```

**Come trovarli nella UI Stripe:**

1. Nella sezione "Select events to listen to"
2. Cerca `checkout` -> espandi -> seleziona `checkout.session.completed`
3. Cerca `customer` -> espandi `customer.subscription` -> seleziona:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

**EVENTI OPZIONALI** (consigliati per monitoraggio):

```
invoice.paid
invoice.payment_failed
customer.created
customer.updated
```

### 3.4 Salvare e copiare il Signing Secret

1. Clicca **Add endpoint**
2. Clicca sull'endpoint appena creato
3. In **Signing secret**, clicca **Reveal**
4. Copia il secret (inizia con `whsec_`)

### 3.5 Aggiornare le variabili ambiente

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

---

## Step 4: Test in Locale con Stripe CLI

Per testare i webhook in sviluppo locale:

### 4.1 Installare Stripe CLI

**macOS:**
```bash
brew install stripe/stripe-cli/stripe
```

**Windows:**
```bash
scoop install stripe
```

**Linux:**
```bash
# Scarica da https://github.com/stripe/stripe-cli/releases
```

### 4.2 Login

```bash
stripe login
```

Si aprira il browser per autenticarti.

### 4.3 Forward dei webhook

```bash
stripe listen --forward-to localhost:3000/api/auth/stripe/webhook
```

Output:
```
Ready! Your webhook signing secret is whsec_xxxxx
```

### 4.4 Usare il signing secret locale

Copia il `whsec_xxxxx` mostrato e usalo in `.env.local`:
```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

### 4.5 Testare un evento

In un altro terminale:
```bash
stripe trigger checkout.session.completed
```

---

## Step 5: Configurare il Customer Portal

Il Customer Portal permette agli utenti di gestire autonomamente il loro abbonamento.

### 5.1 Abilitare il Portal

1. Vai su **Stripe Dashboard** -> **Settings** -> **Billing** -> **Customer portal**
2. Configura:
   - **Business information**: Nome e logo
   - **Functionality**:
     - Allow customers to switch plans
     - Allow customers to cancel subscriptions
     - Allow customers to update payment methods
     - Allow customers to view invoice history
   - **Products**: Seleziona i piani che possono switchare

3. Clicca **Save changes**

---

## Step 6: Configurare le Email Stripe (opzionale)

Stripe puo inviare email automatiche per:
- Conferma pagamento
- Reminder prima del rinnovo
- Pagamento fallito

### 6.1 Abilitare

1. Vai su **Settings** -> **Billing** -> **Customer emails**
2. Abilita le email desiderate
3. Personalizza i template se necessario

---

## Riepilogo Variabili Ambiente

```env
# Stripe - REQUIRED
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

---

## Checklist Finale

- [ ] Account Stripe creato
- [ ] API Keys copiate in `.env.local`
- [ ] Prodotto Pro creato con Price ID
- [ ] Prodotto Enterprise creato con Price ID
- [ ] Price IDs aggiornati in `lib/auth.ts`
- [ ] Webhook endpoint creato
- [ ] Eventi webhook selezionati
- [ ] Webhook signing secret in `.env.local`
- [ ] Customer Portal configurato
- [ ] (Dev) Stripe CLI installato e configurato

---

## Troubleshooting

### Webhook non riceve eventi

1. Verifica l'URL sia corretto (`/api/auth/stripe/webhook`)
2. Controlla i log su Stripe Dashboard -> Webhooks -> Events
3. Verifica che il signing secret sia corretto

### Checkout non funziona

1. Verifica che i Price IDs siano corretti
2. Controlla la console browser per errori
3. Verifica che `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` sia impostata

### Subscription non si aggiorna

1. Verifica che il webhook riceva `customer.subscription.updated`
2. Controlla i log del server per errori
3. Verifica la tabella `subscription` nel database

---

## Link Utili

- [Stripe Dashboard](https://dashboard.stripe.com)
- [Stripe CLI Docs](https://stripe.com/docs/stripe-cli)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Better Auth Stripe Plugin](https://www.better-auth.com/docs/plugins/stripe)
- [Test Card Numbers](https://stripe.com/docs/testing#cards)

### Carte di Test

| Numero | Descrizione |
|--------|-------------|
| `4242 4242 4242 4242` | Pagamento riuscito |
| `4000 0000 0000 3220` | Richiede 3D Secure |
| `4000 0000 0000 0002` | Carta rifiutata |

Usa qualsiasi data futura e CVC a 3 cifre.
