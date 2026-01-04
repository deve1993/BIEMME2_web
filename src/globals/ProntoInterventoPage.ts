import type { GlobalConfig } from "payload";

export const ProntoInterventoPage: GlobalConfig = {
  slug: "pronto-intervento-page",
  label: "Pronto Intervento",
  admin: {
    group: "Pagine",
    livePreview: {
      url: () => {
        const baseUrl =
          process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return `${baseUrl}/pronto-intervento`;
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
          defaultValue: "Pronto Intervento H24 - BIEMME 2",
        },
        {
          name: "description",
          type: "textarea",
          label: "Meta description",
          defaultValue:
            "Servizio di pronto intervento edile 24 ore su 24. Interveniamo per emergenze idrauliche, strutturali e messe in sicurezza.",
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
          defaultValue: "Servizio Emergenze",
        },
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Pronto Intervento H24",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione",
          defaultValue:
            "Siamo operativi 24 ore su 24, 7 giorni su 7, festivi inclusi. Il nostro team di professionisti è pronto a intervenire tempestivamente per qualsiasi emergenza edile.",
        },
        {
          name: "phone",
          type: "text",
          label: "Numero emergenze",
          defaultValue: "+39 0363 958310",
        },
        {
          name: "phoneLabel",
          type: "text",
          label: "Etichetta telefono",
          defaultValue: "Chiama Ora",
        },
        {
          name: "availability",
          type: "text",
          label: "Disponibilità",
          defaultValue: "Disponibili 24/7, festivi inclusi",
        },
      ],
    },

    // Emergency Services Section
    {
      name: "emergencyServicesSection",
      type: "group",
      label: "Sezione Servizi di Emergenza",
      fields: [
        {
          name: "subtitle",
          type: "text",
          label: "Sottotitolo",
          defaultValue: "I Nostri Servizi",
        },
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Interventi di Emergenza",
        },
        {
          name: "services",
          type: "array",
          label: "Servizi",
          fields: [
            {
              name: "icon",
              type: "text",
              label: "Icona",
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
              name: "features",
              type: "array",
              label: "Caratteristiche",
              fields: [
                {
                  name: "text",
                  type: "text",
                  required: true,
                  label: "Testo",
                },
              ],
            },
          ],
        },
      ],
    },

    // Process Section
    {
      name: "processSection",
      type: "group",
      label: "Sezione Processo",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Come Funziona",
        },
        {
          name: "steps",
          type: "array",
          label: "Passaggi",
          maxRows: 5,
          fields: [
            {
              name: "number",
              type: "text",
              label: "Numero",
              admin: {
                description: "Es: 01, 02, 03",
              },
            },
            {
              name: "icon",
              type: "text",
              label: "Icona",
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
          ],
        },
      ],
    },

    // Why Choose Us Section
    {
      name: "whyUsSection",
      type: "group",
      label: "Sezione Perché Sceglierci",
      fields: [
        {
          name: "subtitle",
          type: "text",
          label: "Sottotitolo",
          defaultValue: "Perché Sceglierci",
        },
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Esperienza e Rapidità",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione",
          defaultValue:
            "Con oltre 30 anni di esperienza, garantiamo interventi rapidi e professionali per ogni tipo di emergenza.",
        },
        {
          name: "benefits",
          type: "array",
          label: "Vantaggi",
          maxRows: 6,
          fields: [
            {
              name: "icon",
              type: "text",
              label: "Icona",
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
          ],
        },
      ],
    },

    // Stats Section (Hero overlay stats)
    {
      name: "statsSection",
      type: "group",
      label: "Statistiche Hero",
      admin: {
        description: "Statistiche mostrate nell'overlay dell'hero",
      },
      fields: [
        {
          name: "stats",
          type: "array",
          label: "Statistiche",
          maxRows: 3,
          fields: [
            {
              name: "value",
              type: "text",
              required: true,
              label: "Valore",
              admin: {
                description: "Es: 30+, 24/7, 100%",
              },
            },
            {
              name: "label",
              type: "text",
              required: true,
              label: "Etichetta",
            },
          ],
        },
      ],
    },

    // CTA Section
    {
      name: "ctaSection",
      type: "group",
      label: "Sezione Call to Action",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Hai un'Emergenza?",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione",
          defaultValue:
            "Non aspettare, chiamaci subito. Il nostro team è pronto a intervenire.",
        },
        {
          name: "phone",
          type: "text",
          label: "Numero telefono",
          defaultValue: "+39 0363 958310",
        },
        {
          name: "buttonLabel",
          type: "text",
          label: "Testo pulsante",
          defaultValue: "Chiama Ora",
        },
      ],
    },
  ],
};
