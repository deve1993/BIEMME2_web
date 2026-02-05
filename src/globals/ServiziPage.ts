import type { GlobalConfig } from "payload";

export const ServiziPage: GlobalConfig = {
  slug: "servizi-page",
  label: "Servizi",
  admin: {
    group: "Pagine",
    livePreview: {
      url: () => {
        const baseUrl =
          process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return `${baseUrl}/servizi`;
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
          defaultValue: "Servizi - BIEMME 2",
        },
        {
          name: "description",
          type: "textarea",
          label: "Meta description",
          defaultValue:
            "Edilizia residenziale, industriale, scavi e pronto intervento. Scopri tutti i nostri servizi.",
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
          defaultValue: "Esperienza e Solidità",
        },
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Le Nostre Specializzazioni",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione",
          defaultValue:
            "Eccellenza tecnica e potenza operativa al servizio di ogni progetto costruttivo.",
        },
      ],
    },

    // Services Section
    {
      name: "servicesSection",
      type: "group",
      label: "Sezione Servizi",
      fields: [
        {
          name: "services",
          type: "array",
          label: "Lista Servizi",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              label: "Titolo",
            },
            {
              name: "slug",
              type: "text",
              required: true,
              label: "Slug",
              admin: {
                description: "URL friendly (es: edilizia-residenziale)",
              },
            },
            {
              name: "excerpt",
              type: "textarea",
              label: "Descrizione breve",
            },
            {
              name: "icon",
              type: "text",
              label: "Icona",
              admin: {
                description: "Nome icona Material Symbols",
              },
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Immagine",
            },
            {
              name: "features",
              type: "array",
              label: "Caratteristiche",
              fields: [
                {
                  name: "title",
                  type: "text",
                  required: true,
                  label: "Caratteristica",
                },
              ],
            },
          ],
        },
      ],
    },

    // Pillars Section
    {
      name: "pillarsSection",
      type: "group",
      label: "Sezione Pilastri",
      fields: [
        {
          name: "subtitle",
          type: "text",
          label: "Sottotitolo",
          defaultValue: "Il Nostro Approccio",
        },
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "I 4 Pilastri del Servizio",
        },
        {
          name: "pillars",
          type: "array",
          label: "Pilastri",
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

    // Benefits Section
    {
      name: "benefitsSection",
      type: "group",
      label: "Sezione Vantaggi",
      fields: [
        {
          name: "subtitle",
          type: "text",
          label: "Sottotitolo",
          defaultValue: "PERCHÉ BIEMME 2",
        },
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "I Vantaggi di Sceglierci",
        },
        {
          name: "benefits",
          type: "array",
          label: "Vantaggi",
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

    // Machinery Section
    {
      name: "machinerySection",
      type: "group",
      label: "Sezione Parco Macchine",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Il Nostro Parco Macchine",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione",
        },
        {
          name: "machinery",
          type: "array",
          label: "Macchinari",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              label: "Nome",
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
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Immagine",
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
          defaultValue: "Pronto a Costruire il Futuro?",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione",
          defaultValue:
            "Contattaci per discutere il tuo progetto e ricevere un preventivo personalizzato.",
        },
        {
          name: "buttonLabel",
          type: "text",
          label: "Testo pulsante",
          defaultValue: "Richiedi Preventivo",
        },
        {
          name: "buttonHref",
          type: "text",
          label: "Link pulsante",
          defaultValue: "/contatti",
        },
      ],
    },
  ],
};
