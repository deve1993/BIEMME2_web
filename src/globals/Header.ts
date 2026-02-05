import type { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: "header",
  label: "Header",
  admin: {
    group: "Layout",
  },
  fields: [
    {
      name: "logo",
      type: "group",
      label: "Logo",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Immagine logo",
        },
        {
          name: "alt",
          type: "text",
          defaultValue: "BIEMME 2",
          label: "Testo alternativo",
        },
      ],
    },
    {
      name: "navigation",
      type: "array",
      label: "Menu di navigazione",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          label: "Etichetta",
        },
        {
          name: "href",
          type: "text",
          required: true,
          label: "Link",
          admin: {
            description: "Percorso relativo (es: /chi-siamo) o URL assoluto",
          },
        },
        {
          name: "children",
          type: "array",
          label: "Sottomenu",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
              label: "Etichetta",
            },
            {
              name: "href",
              type: "text",
              required: true,
              label: "Link",
            },
            {
              name: "description",
              type: "text",
              label: "Descrizione",
            },
          ],
        },
      ],
    },
    {
      name: "cta",
      type: "group",
      label: "Call to Action",
      fields: [
        {
          name: "label",
          type: "text",
          defaultValue: "Contattaci",
          label: "Testo pulsante",
        },
        {
          name: "href",
          type: "text",
          defaultValue: "/contatti",
          label: "Link",
        },
        {
          name: "phone",
          type: "text",
          label: "Numero telefono",
          admin: {
            description: "Numero per chiamata diretta",
          },
        },
      ],
    },
  ],
};
