import type { GlobalConfig } from "payload";

export const PrivacyPage: GlobalConfig = {
  slug: "privacy-page",
  label: "Privacy Policy",
  admin: {
    group: "Pagine Legali",
    description: "Gestisci la pagina della Privacy Policy",
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
          defaultValue: "Privacy Policy | BIEMME 2 Costruzioni",
        },
        {
          name: "description",
          type: "textarea",
          label: "Meta description",
          defaultValue:
            "Informativa sulla privacy di BIEMME 2 S.r.l. ai sensi del GDPR (Regolamento UE 2016/679).",
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
          defaultValue: "Privacy Policy",
        },
        {
          name: "subtitle",
          type: "text",
          label: "Sottotitolo",
          defaultValue:
            "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)",
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
      admin: {
        description:
          "Dati dell'azienda titolare del trattamento (usati in varie sezioni)",
      },
      fields: [
        {
          name: "name",
          type: "text",
          label: "Ragione Sociale",
          defaultValue: "BIEMME 2 S.r.l.",
        },
        {
          name: "address",
          type: "text",
          label: "Indirizzo",
          defaultValue: "Via Cav. Agliardi, 18 - 24050 Morengo (BG)",
        },
        {
          name: "vatNumber",
          type: "text",
          label: "Partita IVA",
          defaultValue: "03002360166",
        },
        {
          name: "email",
          type: "email",
          label: "Email",
          defaultValue: "info@biemme2.com",
        },
        {
          name: "phone",
          type: "text",
          label: "Telefono",
          defaultValue: "+39 0363 958310",
        },
      ],
    },

    // Privacy Sections
    {
      name: "sections",
      type: "array",
      label: "Sezioni della Privacy Policy",
      admin: {
        description: "Aggiungi e gestisci le sezioni della privacy policy",
        initCollapsed: true,
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: "Titolo sezione",
          admin: {
            description: "Es: 1. Titolare del Trattamento",
          },
        },
        {
          name: "content",
          type: "richText",
          label: "Contenuto",
          admin: {
            description:
              "Usa {company.name}, {company.address}, {company.email}, {company.phone}, {company.vatNumber} per inserire i dati aziendali",
          },
        },
      ],
    },
  ],
};
