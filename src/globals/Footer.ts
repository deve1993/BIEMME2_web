import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  admin: {
    group: "Layout",
  },
  fields: [
    {
      name: "companyInfo",
      type: "group",
      label: "Informazioni Azienda",
      fields: [
        {
          name: "name",
          type: "text",
          defaultValue: "BIEMME 2 S.r.l.",
          label: "Nome azienda",
        },
        {
          name: "description",
          type: "textarea",
          label: "Descrizione breve",
        },
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          label: "Logo footer",
        },
      ],
    },
    {
      name: "contact",
      type: "group",
      label: "Contatti",
      fields: [
        {
          name: "address",
          type: "text",
          label: "Indirizzo",
        },
        {
          name: "city",
          type: "text",
          label: "Città e CAP",
        },
        {
          name: "phone",
          type: "text",
          label: "Telefono fisso",
        },
        {
          name: "mobilePhone",
          type: "text",
          label: "Telefono cellulare",
        },
        {
          name: "email",
          type: "email",
          label: "Email",
        },
        {
          name: "pec",
          type: "email",
          label: "PEC",
        },
        {
          name: "vatNumber",
          type: "text",
          label: "Partita IVA",
        },
      ],
    },
    {
      name: "columns",
      type: "array",
      label: "Colonne link",
      maxRows: 3,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: "Titolo colonna",
        },
        {
          name: "links",
          type: "array",
          label: "Link",
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
          ],
        },
      ],
    },
    {
      name: "social",
      type: "array",
      label: "Social Media",
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          label: "Piattaforma",
          options: [
            { label: "Facebook", value: "facebook" },
            { label: "Instagram", value: "instagram" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "YouTube", value: "youtube" },
          ],
        },
        {
          name: "url",
          type: "text",
          required: true,
          label: "URL",
        },
      ],
    },
    {
      name: "legal",
      type: "group",
      label: "Note legali",
      fields: [
        {
          name: "copyright",
          type: "text",
          label: "Copyright",
          admin: {
            description: "Lascia vuoto per generare automaticamente",
          },
        },
        {
          name: "links",
          type: "array",
          label: "Link legali",
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
          ],
        },
      ],
    },
  ],
};
