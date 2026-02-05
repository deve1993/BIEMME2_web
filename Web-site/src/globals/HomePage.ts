import type { GlobalConfig } from "payload";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Homepage",
  admin: {
    group: "Pagine",
    livePreview: {
      url: () => {
        const baseUrl =
          process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return `${baseUrl}/`;
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
          defaultValue: "BIEMME 2 - Costruzioni Edili dal 1986",
        },
        {
          name: "description",
          type: "textarea",
          label: "Meta description",
          defaultValue:
            "Costruzioni edili, ristrutturazioni e pronto intervento. Oltre 40 anni di esperienza nel settore edilizio.",
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
          label: "Immagine Open Graph",
        },
      ],
    },

    // Hero Slider Section
    {
      name: "heroSlider",
      type: "group",
      label: "Hero Slider",
      fields: [
        {
          name: "badge",
          type: "text",
          label: "Badge (visibile su tutte le slide)",
          defaultValue: "Dal 1986",
        },
        {
          name: "slides",
          type: "array",
          label: "Slide",
          minRows: 1,
          maxRows: 6,
          admin: {
            description: "Aggiungi le slide del carosello hero",
            initCollapsed: false,
          },
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              label: "Titolo (prima riga)",
              admin: {
                description: "Es: Costruzioni",
              },
            },
            {
              name: "subtitle",
              type: "text",
              required: true,
              label: "Sottotitolo (seconda riga)",
              admin: {
                description: "Es: INDUSTRIALI",
              },
            },
            {
              name: "description",
              type: "textarea",
              label: "Descrizione",
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Immagine di sfondo",
            },
            {
              name: "imageUrl",
              type: "text",
              label: "Oppure URL immagine esterna",
              admin: {
                description:
                  "Usa questo campo se l'immagine non è caricata nel Media",
              },
            },
            {
              name: "ctaText",
              type: "text",
              label: "Testo pulsante",
              defaultValue: "Scopri di più",
            },
            {
              name: "ctaHref",
              type: "text",
              label: "Link pulsante",
              defaultValue: "/servizi",
            },
          ],
        },
        {
          name: "secondaryCta",
          type: "group",
          label: "CTA Secondario (visibile su tutte le slide)",
          fields: [
            {
              name: "label",
              type: "text",
              defaultValue: "Richiedi Preventivo",
              label: "Testo",
            },
            {
              name: "href",
              type: "text",
              defaultValue: "/contatti",
              label: "Link",
            },
          ],
        },
        {
          name: "autoplayInterval",
          type: "number",
          label: "Intervallo autoplay (ms)",
          defaultValue: 6000,
          admin: {
            description: "Tempo in millisecondi tra una slide e l'altra",
          },
        },
      ],
    },

    // Features Section
    {
      name: "featuresSection",
      type: "group",
      label: "Sezione Servizi",
      fields: [
        {
          name: "subtitle",
          type: "text",
          label: "Sottotitolo",
          defaultValue: "I NOSTRI SERVIZI",
        },
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Quello che ti serve",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione",
          defaultValue: "Soluzioni complete per ogni esigenza costruttiva.",
        },
        {
          name: "features",
          type: "array",
          label: "Servizi",
          minRows: 1,
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
              admin: {
                description:
                  "Nome icona Material Symbols (es: architecture, home_repair_service)",
              },
            },
          ],
        },
      ],
    },

    // Stats Section
    {
      name: "statsSection",
      type: "group",
      label: "Sezione Statistiche",
      fields: [
        {
          name: "stats",
          type: "array",
          label: "Statistiche",
          minRows: 1,
          maxRows: 4,
          fields: [
            {
              name: "value",
              type: "text",
              required: true,
              label: "Valore",
              admin: {
                description: "Es: 30, 200, 100",
              },
            },
            {
              name: "suffix",
              type: "text",
              label: "Suffisso",
              admin: {
                description: "Es: +, %, anni",
              },
            },
            {
              name: "prefix",
              type: "text",
              label: "Prefisso",
            },
            {
              name: "label",
              type: "text",
              required: true,
              label: "Etichetta",
              admin: {
                description: "Es: Anni di Esperienza",
              },
            },
          ],
        },
      ],
    },

    // Highlights Section
    {
      name: "highlightsSection",
      type: "group",
      label: "Sezione Punti di Forza",
      fields: [
        {
          name: "highlights",
          type: "array",
          label: "Punti di forza",
          minRows: 1,
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
          defaultValue: "Pronti a Costruire il Tuo Progetto?",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione",
          defaultValue:
            "Contattaci oggi per una consulenza gratuita e scopri come possiamo realizzare la tua visione.",
        },
        {
          name: "buttonLabel",
          type: "text",
          label: "Testo pulsante",
          defaultValue: "Contattaci Ora",
        },
        {
          name: "buttonHref",
          type: "text",
          label: "Link pulsante",
          defaultValue: "/contatti",
        },
        {
          name: "phone",
          type: "text",
          label: "Numero telefono",
          defaultValue: "+39 0363958310",
        },
      ],
    },
  ],
};
