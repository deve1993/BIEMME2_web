import type { GlobalConfig } from "payload";

export const AziendaPage: GlobalConfig = {
  slug: "azienda-page",
  label: "Azienda",
  admin: {
    group: "Pagine",
    livePreview: {
      url: () => {
        const baseUrl =
          process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return `${baseUrl}/azienda`;
      },
    },
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
          defaultValue: "Chi Siamo - BIEMME 2",
        },
        {
          name: "description",
          type: "textarea",
          label: "Meta description",
          defaultValue:
            "Scopri la storia, i valori e il team di BIEMME 2. Oltre 40 anni di esperienza nel settore edilizio.",
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
          label: "Immagine Open Graph",
        },
      ],
    },

    // Hero Section
    {
      name: "hero",
      type: "group",
      label: "Hero Section",
      fields: [
        {
          name: "badge",
          type: "text",
          label: "Badge",
          defaultValue: "La Nostra Identità",
        },
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Chi Siamo",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione",
          defaultValue:
            "COSTRUTTORI PER PASSIONE, PROFESSIONISTI PER SCELTA. Da oltre 40 anni trasformiamo idee in edifici solidi e duraturi.",
        },
      ],
    },

    // Storia/Timeline Section
    {
      name: "storiaSection",
      type: "group",
      label: "Sezione Storia",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "La Nostra Storia",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione introduttiva",
          defaultValue:
            "Un percorso di crescita costante, guidato dalla passione per l'edilizia di qualità.",
        },
        {
          name: "timeline",
          type: "array",
          label: "Timeline",
          fields: [
            {
              name: "year",
              type: "text",
              required: true,
              label: "Anno",
              admin: {
                description: "Es: 1990, 2000-2005",
              },
            },
            {
              name: "title",
              type: "text",
              required: true,
              label: "Titolo",
            },
            {
              name: "description",
              type: "textarea",
              label: "Descrizione",
            },
            {
              name: "icon",
              type: "text",
              label: "Icona",
            },
          ],
        },
      ],
    },

    // Valori Section
    {
      name: "valoriSection",
      type: "group",
      label: "Sezione Valori",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "I Nostri Valori",
        },
        {
          name: "values",
          type: "array",
          label: "Valori",
          maxRows: 6,
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              label: "Titolo",
            },
            {
              name: "description",
              type: "textarea",
              label: "Descrizione",
            },
            {
              name: "icon",
              type: "text",
              label: "Icona",
            },
          ],
        },
      ],
    },

    // Organigramma Section
    {
      name: "organigrammaSection",
      type: "group",
      label: "Sezione Organigramma",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Organigramma",
        },
        {
          name: "direzione",
          type: "group",
          label: "Direzione Generale",
          fields: [
            {
              name: "title",
              type: "text",
              label: "Titolo",
              defaultValue: "Direzione Generale",
            },
            {
              name: "subtitle",
              type: "text",
              label: "Sottotitolo",
              defaultValue: "Strategia, Sviluppo & Controllo",
            },
          ],
        },
        {
          name: "aree",
          type: "array",
          label: "Aree Aziendali",
          maxRows: 4,
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              label: "Titolo",
            },
            {
              name: "subtitle",
              type: "text",
              label: "Sottotitolo",
            },
          ],
        },
      ],
    },

    // Team Section
    {
      name: "teamSection",
      type: "group",
      label: "Sezione Team",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "La Squadra",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione",
        },
        {
          name: "members",
          type: "array",
          label: "Membri del team",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              label: "Nome",
            },
            {
              name: "role",
              type: "text",
              required: true,
              label: "Ruolo",
            },
            {
              name: "bio",
              type: "textarea",
              label: "Bio / Contatti",
            },
            {
              name: "photo",
              type: "upload",
              relationTo: "media",
              label: "Foto",
            },
          ],
        },
      ],
    },

    // Certificazioni Section
    {
      name: "certificazioniSection",
      type: "group",
      label: "Sezione Certificazioni",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Qualità Certificata",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione",
        },
        {
          name: "certifications",
          type: "array",
          label: "Certificazioni",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              label: "Nome certificazione",
            },
            {
              name: "description",
              type: "textarea",
              label: "Descrizione",
            },
            {
              name: "icon",
              type: "text",
              label: "Icona",
              admin: {
                description:
                  "Nome icona Material Symbols (es: verified, workspace_premium, health_and_safety)",
              },
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Logo/Immagine",
            },
          ],
        },
      ],
    },
  ],
};
