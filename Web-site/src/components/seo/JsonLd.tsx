import Script from "next/script";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://biemme2.it";

// Schema Organization per BIEMME 2
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BIEMME 2 S.r.l.",
  alternateName: "BIEMME 2 Costruzioni",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Impresa generale di costruzioni. Da oltre 40 anni ci occupiamo di edilizia residenziale, industriale, restauro e ristrutturazioni.",
  foundingDate: "1986",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Cav. Agliardi, 18",
    addressLocality: "Morengo",
    addressRegion: "BG",
    postalCode: "24050",
    addressCountry: "IT",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+39-0363-958310",
    contactType: "customer service",
    availableLanguage: ["Italian"],
  },
  sameAs: [
    // Aggiungere URL social quando disponibili
    // "https://www.facebook.com/biemme2",
    // "https://www.linkedin.com/company/biemme2",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "BIEMME 2 S.r.l.",
  image: `${BASE_URL}/opengraph-image`,
  "@id": BASE_URL,
  url: BASE_URL,
  telephone: "+39 0363 958310",
  email: "info@biemme2.com",
  priceRange: "€€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Cav. Agliardi, 18",
    addressLocality: "Morengo",
    addressRegion: "BG",
    postalCode: "24050",
    addressCountry: "IT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.5352,
    longitude: 9.6943,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 45.5352,
      longitude: 9.6943,
    },
    geoRadius: "50000", // 50km di raggio
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "47",
  },
};

// Schema WebSite per sitelinks search box
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BIEMME 2 Costruzioni",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/cerca?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

interface JsonLdProps {
  type?: "organization" | "localBusiness" | "website" | "all";
}

export function JsonLd({ type = "all" }: JsonLdProps) {
  const schemas: object[] = [];

  if (type === "all" || type === "organization") {
    schemas.push(organizationSchema);
  }
  if (type === "all" || type === "localBusiness") {
    schemas.push(localBusinessSchema);
  }
  if (type === "all" || type === "website") {
    schemas.push(websiteSchema);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// Schema per pagina servizio specifica
export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: "BIEMME 2 S.r.l.",
      url: BASE_URL,
    },
    areaServed: {
      "@type": "State",
      name: "Lombardia",
    },
  };

  return (
    <Script
      id="json-ld-service"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Schema per breadcrumb
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="json-ld-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
