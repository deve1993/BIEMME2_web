/**
 * Update Navigation Script
 * Updates Header and Footer globals with correct navigation links
 */

// Load environment variables BEFORE other imports
import "dotenv/config";
import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { getPayload } from "payload";
import config from "../payload.config";

const headerData = {
  logo: {
    alt: "BIEMME 2",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Azienda", href: "/azienda" },
    { label: "Servizi", href: "/servizi" },
    { label: "Contatti", href: "/contatti" },
  ],
  cta: {
    label: "Contattaci",
    href: "/contatti",
    phone: "+39 0363958310",
  },
};

const footerData = {
  companyInfo: {
    name: "BIEMME 2 S.r.l.",
    description:
      "Da oltre 40 anni costruiamo qualità nel territorio bergamasco. Edilizia residenziale, industriale, restauro e ristrutturazioni.",
  },
  contact: {
    address: "Via Cav. Agliardi, 18",
    city: "24050 Morengo (BG)",
    phone: "+39 0363958310",
    mobilePhone: "+39 3463157500",
    email: "info@biemme2.com",
    vatNumber: "P.IVA 03002360166",
  },
  columns: [
    {
      title: "Servizi",
      links: [
        {
          label: "Edilizia Residenziale",
          href: "/servizi/edilizia-residenziale",
        },
        {
          label: "Edilizia Industriale",
          href: "/servizi/edilizia-industriale",
        },
        {
          label: "Scavi e Movimento Terra",
          href: "/servizi/scavi-movimento-terra",
        },
      ],
    },
    {
      title: "Azienda",
      links: [
        { label: "Chi Siamo", href: "/azienda" },
        { label: "Servizi", href: "/servizi" },
        { label: "Contatti", href: "/contatti" },
      ],
    },
  ],
  legal: {
    copyright: "BIEMME 2 S.r.l. Tutti i diritti riservati.",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookie" },
    ],
  },
};

async function updateNavigation() {
  console.log("🔄 Updating navigation...\n");

  const payload = await getPayload({ config });

  console.log("📝 Updating Header...");
  try {
    await payload.updateGlobal({
      slug: "header",
      data: headerData as never,
    });
    console.log("✅ Header updated");
  } catch (error) {
    console.error("❌ Error updating header:", error);
  }

  console.log("\n📝 Updating Footer...");
  try {
    await payload.updateGlobal({
      slug: "footer",
      data: footerData as never,
    });
    console.log("✅ Footer updated");
  } catch (error) {
    console.error("❌ Error updating footer:", error);
  }

  console.log("\n🎉 Navigation update complete!");
  process.exit(0);
}

updateNavigation().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
