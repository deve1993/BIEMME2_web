import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Sistema",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nome",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      label: "Ruolo",
      options: [
        { label: "Amministratore", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};
