import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import nodemailer from "nodemailer";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

// Collections (solo sistema)
import { Media } from "./src/collections/Media";
import { Users } from "./src/collections/Users";

// Globals - Layout
import { Header } from "./src/globals/Header";
import { Footer } from "./src/globals/Footer";

// Globals - Pagine
import { HomePage } from "./src/globals/HomePage";
import { ServiziPage } from "./src/globals/ServiziPage";
import { AziendaPage } from "./src/globals/AziendaPage";
import { ContattiPage } from "./src/globals/ContattiPage";

// Globals - Pagine Legali
import { PrivacyPage } from "./src/globals/PrivacyPage";
import { CookiePage } from "./src/globals/CookiePage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Configura il transporter Nodemailer
const smtpTransport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default buildConfig({
  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_FROM || "noreply@biemme2.com",
    defaultFromName: "BIEMME 2",
    transport: smtpTransport,
  }),
  admin: {
    user: "users",
    meta: {
      titleSuffix: " | BIEMME 2 CMS",
    },
    livePreview: {
      // URL del sito frontend
      url: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
      // Globals abilitati per Live Preview
      globals: ["home-page", "servizi-page", "azienda-page", "contatti-page"],
      // Breakpoints per responsive preview
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [Media, Users],
  globals: [
    // Layout
    Header,
    Footer,
    // Pagine
    HomePage,
    ServiziPage,
    AziendaPage,
    ContattiPage,
    // Pagine Legali
    PrivacyPage,
    CookiePage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "default-secret-change-in-production",
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "mongodb://localhost:27017/biemme2",
    connectOptions: {
      serverSelectionTimeoutMS: 5000, // 5 seconds instead of 30
      connectTimeoutMS: 5000,
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, "src/types/payload-types.ts"),
  },
  sharp,
});
