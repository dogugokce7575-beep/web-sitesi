import React from "react";
import { siteConfig } from "@/config/site";

export default function SchemaOrg() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "GeneralContractor"],
        "@id": `${siteConfig.url}/#organization`,
        "name": siteConfig.name,
        "alternateName": siteConfig.shortName,
        "url": siteConfig.url,
        "logo": `${siteConfig.url}/images/logo.png`,
        "description": siteConfig.description,
        "slogan": siteConfig.slogan,
        "telephone": siteConfig.contact.phoneClean,
        "email": siteConfig.contact.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": siteConfig.contact.address,
          "addressLocality": siteConfig.contact.city,
          "addressRegion": "Ardahan",
          "addressCountry": "TR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "41.1105",
          "longitude": "42.7022"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Ardahan" },
          { "@type": "AdministrativeArea", "name": "Kars" },
          { "@type": "AdministrativeArea", "name": "Erzurum" },
          { "@type": "AdministrativeArea", "name": "Artvin" },
          { "@type": "Country", "name": "Türkiye" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "08:30",
            "closes": "18:30"
          }
        ],
        "sameAs": [
          siteConfig.social.instagram,
          siteConfig.social.facebook
        ],
        "priceRange": "$$$"
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        "url": siteConfig.url,
        "name": siteConfig.name,
        "publisher": {
          "@id": `${siteConfig.url}/#organization`
        },
        "inLanguage": "tr-TR"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
