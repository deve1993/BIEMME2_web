import type { GlobalConfig } from "payload";

export const CookiePage: GlobalConfig = {
  slug: "cookie-page",
  label: "Cookie Policy",
  admin: {
    group: "Pagine Legali",
    description: "Gestisci la pagina della Cookie Policy",
  },
  fields: [
    // SEO Section
    {
      name: "seo",
      type: "group",
      label: "SEO",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titolo pagina",
          defaultValue: "Cookie Policy | BIEMME 2 Costruzioni",
        },
        {
          name: "description",
          type: "textarea",
          label: "Meta description",
          defaultValue:
            "Informativa sui cookie utilizzati dal sito BIEMME 2 S.r.l. ai sensi del GDPR e della normativa italiana.",
        },
      ],
    },

    // Header Section
    {
      name: "header",
      type: "group",
      label: "Intestazione",
      fields: [
        {
          name: "badge",
          type: "text",
          label: "Badge",
          defaultValue: "Informativa Legale",
        },
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Cookie Policy",
        },
        {
          name: "subtitle",
          type: "text",
          label: "Sottotitolo",
          defaultValue:
            "Informativa sull'utilizzo dei cookie ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR) e del Provvedimento del Garante Privacy n. 229/2014",
        },
        {
          name: "lastUpdate",
          type: "date",
          label: "Ultimo aggiornamento",
          admin: {
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "MMMM yyyy",
            },
          },
        },
      ],
    },

    // Company Info
    {
      name: "companyInfo",
      type: "group",
      label: "Dati Aziendali",
      fields: [
        {
          name: "name",
          type: "text",
          label: "Ragione Sociale",
          defaultValue: "BIEMME 2 S.r.l.",
        },
        {
          name: "website",
          type: "text",
          label: "Sito Web",
          defaultValue: "www.biemme2.com",
        },
        {
          name: "email",
          type: "email",
          label: "Email",
          defaultValue: "info@biemme2.com",
        },
      ],
    },

    // Cookie Types
    {
      name: "cookieTypes",
      type: "array",
      label: "Tipologie di Cookie",
      admin: {
        description: "Gestisci le categorie di cookie utilizzati sul sito",
        initCollapsed: false,
      },
      fields: [
        {
          name: "category",
          type: "text",
          required: true,
          label: "Nome categoria",
          admin: {
            description: "Es: Cookie Tecnici (Necessari)",
          },
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione categoria",
        },
        {
          name: "requiresConsent",
          type: "checkbox",
          label: "Richiede consenso",
          defaultValue: false,
          admin: {
            description:
              "Se attivo, questi cookie richiedono il consenso dell'utente",
          },
        },
        {
          name: "cookies",
          type: "array",
          label: "Cookie",
          admin: {
            description: "Elenco dei cookie in questa categoria",
          },
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              label: "Nome cookie",
            },
            {
              name: "purpose",
              type: "text",
              label: "Finalità",
            },
            {
              name: "duration",
              type: "text",
              label: "Durata",
              admin: {
                description: "Es: Sessione, 24 ore, 2 anni",
              },
            },
            {
              name: "provider",
              type: "text",
              label: "Fornitore",
              defaultValue: "Prima parte",
            },
          ],
        },
      ],
    },

    // Third Party Services
    {
      name: "thirdPartyServices",
      type: "array",
      label: "Servizi di Terze Parti",
      admin: {
        description:
          "Link alle informative privacy dei servizi esterni utilizzati",
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Nome servizio",
          admin: {
            description: "Es: Google Analytics",
          },
        },
        {
          name: "privacyUrl",
          type: "text",
          label: "URL Privacy Policy",
          admin: {
            description: "Es: https://policies.google.com/privacy",
          },
        },
      ],
    },

    // Browser Management Links
    {
      name: "browserLinks",
      type: "array",
      label: "Guide Browser",
      admin: {
        description: "Link alle guide per la gestione cookie nei vari browser",
      },
      fields: [
        {
          name: "browser",
          type: "text",
          required: true,
          label: "Nome browser",
        },
        {
          name: "url",
          type: "text",
          required: true,
          label: "URL guida",
        },
      ],
    },
  ],
};
