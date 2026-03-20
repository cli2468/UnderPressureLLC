import { useEffect } from "react"
import { business, services } from "../data/siteData"

const SITE_URL = "https://underpressurellc.com"

function buildSchema() {
  const allServices = [...services.residential, ...services.commercial]

  return {
    "@context": "https://schema.org",
    "@graph": [
      // LocalBusiness — core business entity
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${SITE_URL}/#business`,
        name: business.legalName,
        alternateName: business.name,
        description:
          "Professional soft washing and pressure washing for homes and businesses across Northwest Indiana, North Central Indiana, and Southwest Michigan. Licensed, bonded, and insured.",
        url: SITE_URL,
        telephone: "+1-219-307-1207",
        priceRange: "$$",
        image: `${SITE_URL}/favicon.png`,
        sameAs: [
          business.socialLinks.facebook,
          business.socialLinks.instagram,
        ],
        areaServed: business.serviceArea.map((area) => ({
          "@type": "State",
          name: area,
        })),
        address: {
          "@type": "PostalAddress",
          addressRegion: "IN",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "41.4733",
          longitude: "-87.0611",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          bestRating: "5",
          ratingCount: String(business.reviews.exactCount),
          reviewCount: String(business.reviews.exactCount),
        },
        hasCredential: business.credentials.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          credentialCategory: c,
        })),
        award: business.awards,
        knowsAbout: [
          "Soft washing",
          "Pressure washing",
          "Exterior cleaning",
          "Roof cleaning",
          "Concrete cleaning",
          "Concrete sealing",
          "Paver cleaning",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Exterior Cleaning Services",
          itemListElement: allServices.map((svc, i) => ({
            "@type": "OfferCatalog",
            name: svc.name,
            description: svc.description,
            position: i + 1,
          })),
        },
      },

      // WebSite — site-level entity
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: business.name,
        publisher: { "@id": `${SITE_URL}/#business` },
      },

      // WebPage — homepage
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Under Pressure Exterior Cleaning | Northwest Indiana Pressure Washing & Soft Washing",
        description:
          "Professional soft washing and pressure washing for homes and businesses across Northwest Indiana. Licensed, bonded, insured. 100+ five-star reviews.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        dateModified: "2026-03-20",
      },

      // Service entries — individual services for rich results
      ...allServices.map((svc) => ({
        "@type": "Service",
        name: svc.name,
        description: svc.description,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: business.serviceArea.map((area) => ({
          "@type": "State",
          name: area,
        })),
      })),

      // FAQPage — common questions for FAQ rich results + AI extractability
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is soft washing and how is it different from pressure washing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Soft washing uses low-pressure water combined with commercial-grade cleaning solutions to safely remove algae, mold, mildew, and organic growth from surfaces. Unlike traditional pressure washing that relies on high-pressure force, soft washing kills growth at the root without risking damage to siding, roofing, or painted surfaces. The results last significantly longer because the source of the growth is eliminated, not just the surface stain.",
            },
          },
          {
            "@type": "Question",
            name: "What areas does Under Pressure Exterior Cleaning serve?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Pressure Exterior Cleaning serves Northwest Indiana, North Central Indiana, and Southwest Michigan. Popular service cities include Valparaiso, Chesterton, Portage, Michigan City, La Porte, Crown Point, Merrillville, Hobart, Schererville, St. John, Wanatah, and New Buffalo. Contact us at 219-307-1207 to confirm service availability in your area.",
            },
          },
          {
            "@type": "Question",
            name: "Is Under Pressure Exterior Cleaning licensed and insured?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Pressure Exterior Cleaning is fully licensed, bonded, and insured. Your property is protected throughout the entire cleaning process. We operate as a professional company with commercial-grade equipment, not a side job with consumer machines.",
            },
          },
          {
            "@type": "Question",
            name: "How much does exterior cleaning cost?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pricing depends on the size of the area, the type of service needed, and the condition of the surfaces. Under Pressure Exterior Cleaning provides free, detailed estimates with no obligation. Call 219-307-1207 or fill out our online form to request your free estimate.",
            },
          },
          {
            "@type": "Question",
            name: "What residential services does Under Pressure offer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Pressure Exterior Cleaning offers house washing, roof cleaning, driveway and concrete cleaning, concrete sealing, deck and fence cleaning, rust removal, and paver cleaning with sanding and sealing. All residential services use safe soft-wash techniques that protect your property while delivering long-lasting results.",
            },
          },
          {
            "@type": "Question",
            name: "Do you offer commercial exterior cleaning services?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Under Pressure Exterior Cleaning provides commercial services including building and storefront washing, drive-thru and high-traffic area cleaning, parking lot and garage cleaning, and property management services for schools, HOAs, retail centers, and office buildings.",
            },
          },
        ],
      },
    ],
  }
}

export default function SchemaMarkup() {
  useEffect(() => {
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.textContent = JSON.stringify(buildSchema())
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}
