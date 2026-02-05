import type { GlobalConfig } from "payload";

export const ContattiPage: GlobalConfig = {
  slug: "contatti-page",
  label: "Contatti",
  admin: {
    group: "Pagine",
    livePreview: {
      url: () => {
        const baseUrl =
          process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return `${baseUrl}/contatti`;
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
          defaultValue: "Contatti - BIEMME 2",
        },
        {
          name: "description",
          type: "textarea",
          label: "Meta description",
          defaultValue:
            "Contattaci per un preventivo gratuito. Siamo a Morengo (BG), disponibili per progetti in tutta la Lombardia.",
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
          defaultValue: "Parla con noi",
        },
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Resta in Contatto",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione",
          defaultValue:
            "Siamo sempre disponibili per discutere il tuo progetto. Contattaci per una consulenza gratuita.",
        },
      ],
    },

    // Contact Info Section
    {
      name: "contactInfo",
      type: "group",
      label: "Informazioni di Contatto",
      fields: [
        {
          name: "sedeTitle",
          type: "text",
          label: "Titolo sede",
          defaultValue: "Sede Principale",
        },
        {
          name: "address",
          type: "text",
          label: "Indirizzo",
          defaultValue: "Via Cavalier Quarto Agliardi, 18",
        },
        {
          name: "city",
          type: "text",
          label: "Città e CAP",
          defaultValue: "24050 Morengo (BG)",
        },
        {
          name: "telefonoTitle",
          type: "text",
          label: "Titolo telefono",
          defaultValue: "Telefono",
        },
        {
          name: "phone",
          type: "text",
          label: "Numero telefono",
          defaultValue: "+39 0363 958310",
        },
        {
          name: "mobilePhone",
          type: "text",
          label: "Numero cellulare",
          defaultValue: "+39 346 3157500",
        },
        {
          name: "emailTitle",
          type: "text",
          label: "Titolo email",
          defaultValue: "Email",
        },
        {
          name: "email",
          type: "email",
          label: "Email",
          defaultValue: "info@biemme2.com",
        },
        {
          name: "orari",
          type: "text",
          label: "Orari di apertura",
          defaultValue: "Lun-Ven, 8:00 - 18:00",
        },
      ],
    },

    // Form Section
    {
      name: "formSection",
      type: "group",
      label: "Sezione Form",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Inviaci un messaggio",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione",
        },
        {
          name: "servizi",
          type: "array",
          label: "Opzioni servizi (dropdown)",
          admin: {
            description: "Opzioni che appariranno nel dropdown del form",
          },
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
              label: "Etichetta visualizzata",
            },
            {
              name: "value",
              type: "text",
              required: true,
              label: "Valore",
            },
          ],
        },
        {
          name: "submitLabel",
          type: "text",
          label: "Testo pulsante invio",
          defaultValue: "Invia Messaggio",
        },
        {
          name: "successMessage",
          type: "textarea",
          label: "Messaggio di successo",
          defaultValue:
            "Grazie per averci contattato! Ti risponderemo al più presto.",
        },
      ],
    },

    // Map Section
    {
      name: "mapSection",
      type: "group",
      label: "Sezione Mappa",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titolo",
          defaultValue: "Dove Siamo",
        },
        {
          name: "embedUrl",
          type: "text",
          label: "URL embed Google Maps",
          admin: {
            description: "URL iframe di Google Maps",
          },
        },
        {
          name: "coordinates",
          type: "group",
          label: "Coordinate",
          fields: [
            {
              name: "lat",
              type: "number",
              label: "Latitudine",
            },
            {
              name: "lng",
              type: "number",
              label: "Longitudine",
            },
          ],
        },
      ],
    },
  ],
};
