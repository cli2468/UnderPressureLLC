import { useEffect } from "react"
import { business, services } from "../data/siteData"

const SITE_URL = "https://underpressureexterior.com"

const reviews = [
  {
    author: "Locas Liam",
    text: "I can't say enough good things about Under Pressure Exterior Cleaning. From start to finish the experience was amazing. The team arrived on time, paid great attention to detail, and made sure everything was done perfectly. The quality of their work exceeded my expectations and the finished results look incredible.",
  },
  {
    author: "Jim Jessup",
    text: "Trey and his partner did a great job pressure washing our vinyl siding and decking. They got rid of 35 years of green algae and grime and it looks like new. Trey had great equipment and was efficient and professional. I highly recommend his business and service.",
  },
  {
    author: "Christy Robinson",
    text: "We will definitely be repeat customers. Very professional and fast service. I didn't think some of the staining would come off our white siding, but everything came out including the chimney staining. Very affordable for high quality work.",
  },
  {
    author: "Mary Cee",
    text: "I was overwhelmed with cleaning up my neglected home after renters moved out. Trey kept me updated every step of the way and the results amazed me. My home and yard look brand new. I will definitely recommend them to anyone who needs work done.",
  },
  {
    author: "Theresa Mattox McArdle",
    text: "Highly recommend. They cleaned my two story house, garage, storage shed, and entire fence. Trey is very professional, quick with service, and very fairly priced. I will definitely use them again.",
  },
  {
    author: "Austin Coleslaw Michaels",
    text: "They knocked it out of the park at our house in Wanatah. They took an old modular home and outbuildings and made them look almost new again. They worked with me through several issues on my end and still delivered better results than I imagined.",
  },
  {
    author: "Peter Steinhiser",
    text: "The team did a great job cleaning my siding. They explained the process and the products they used, and the results turned out great.",
  },
  {
    author: "Shawn Sullivan",
    text: "These guys do a great job and communicate well. Very reliable with great pricing.",
  },
  {
    author: "Tammy Krueger",
    text: "What a great job. Very courteous and professional. I would absolutely recommend them.",
  },
]

function buildSchema() {
  const allServices = [...services.residential, ...services.commercial]

  return {
    "@context": "https://schema.org",
    "@graph": [
      // LocalBusiness — core business entity
      {
        "@type": ["HomeAndConstructionBusiness", "ProfessionalService"],
        "@id": `${SITE_URL}/#business`,
        name: business.legalName,
        alternateName: business.name,
        description:
          "Professional soft washing and pressure washing company serving residential and commercial clients across Northwest Indiana, North Central Indiana, and Southwest Michigan. Licensed, bonded, and insured with 53 five-star reviews. Services include house washing, roof cleaning, concrete cleaning and sealing, and full-scale commercial exterior cleaning for storefronts, parking lots, schools, HOAs, and property management companies.",
        url: SITE_URL,
        telephone: "+1-219-307-1207",
        priceRange: "$$",
        image: `${SITE_URL}/UnderPressureLogo.png`,
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
        review: reviews.map((r) => ({
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: r.author,
          },
          reviewBody: r.text,
        })),
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
          "Commercial exterior cleaning",
          "Property management cleaning",
          "Storefront washing",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Exterior Cleaning Services",
          itemListElement: [
            {
              "@type": "OfferCatalog",
              name: "Residential Exterior Cleaning",
              itemListElement: services.residential.map((svc, i) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: svc.name,
                  description: svc.description,
                },
                position: i + 1,
              })),
            },
            {
              "@type": "OfferCatalog",
              name: "Commercial Exterior Cleaning",
              itemListElement: services.commercial.map((svc, i) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: svc.name,
                  description: svc.description,
                },
                position: i + 1,
              })),
            },
          ],
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
        name: "Under Pressure Exterior Cleaning | Northwest Indiana",
        description:
          "Professional soft washing and pressure washing for residential and commercial properties across Northwest Indiana, North Central Indiana, and Southwest Michigan. Licensed, bonded, insured. 53 five-star reviews.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        dateModified: "2026-03-24",
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
              text: "Yes. Under Pressure Exterior Cleaning provides full-scale commercial exterior cleaning services. This includes building and storefront washing, drive-thru and high-traffic area cleaning, parking lot and garage cleaning, and ongoing property management services. We work directly with property managers, HOAs, schools, retail centers, restaurants, and office buildings across Northwest Indiana, North Central Indiana, and Southwest Michigan. We use the same commercial-grade equipment on every job regardless of scale.",
            },
          },
          {
            "@type": "Question",
            name: "Why does Under Pressure use soft washing instead of high-pressure methods?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Soft washing is safer and more effective for most exterior surfaces. Under Pressure Exterior Cleaning uses soft washing as the primary method for siding, roofing, painted surfaces, and other delicate materials. It combines low-pressure water with commercial-grade cleaning solutions that kill algae, mold, and mildew at the root — not just the surface. The results last significantly longer than high-pressure washing alone, and there is no risk of damage to siding, shingles, or paint. It is the industry-recommended approach and one of the core techniques that sets Under Pressure apart.",
            },
          },
          {
            "@type": "Question",
            name: "How many reviews does Under Pressure Exterior Cleaning have?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under Pressure Exterior Cleaning has earned 53 five-star reviews across Google and Facebook. Customers consistently highlight the quality of work, professional communication, fair pricing, and attention to detail. The company maintains a 5.0 star rating and a 100% customer satisfaction rate.",
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
