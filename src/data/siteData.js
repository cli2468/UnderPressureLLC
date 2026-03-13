export const business = {
  name: "Under Pressure Exterior Cleaning",
  legalName: "Under Pressure Exterior Cleaning, LLC",
  tagline: "Elevating the standard of exterior cleaning.",
  phone: "219-307-1207",
  phoneHref: "tel:2193071207",
  serviceArea: [
    "Northwest Indiana",
    "North Central Indiana",
    "Southwest Michigan",
  ],
  established: "4 years",
  reviews: { count: 53, rating: 5, platforms: ["Google", "Facebook"] },
  credentials: ["Licensed", "Bonded", "Insured"],
  awards: ["NWI Life Spotlight Business of the Month"],
}

export const services = {
  residential: [
    {
      name: "House Washing",
      description:
        "Safe soft-wash cleaning for siding, soffits, fascia, and gutters — removes algae, mildew, and buildup without damage.",
      icon: "House",
    },
    {
      name: "Roof Cleaning",
      description:
        "Soft-wash treatments that eliminate black streaks, moss, and organic growth safely.",
      icon: "Umbrella",
    },
    {
      name: "Driveway & Concrete",
      description:
        "Restore driveways, sidewalks, patios, and porches to a clean, bright finish.",
      icon: "Road",
    },
    {
      name: "Concrete Sealing",
      description:
        "Protective sealant applied after cleaning to extend results and guard against future staining.",
      icon: "ShieldCheck",
    },
    {
      name: "Deck & Fence Cleaning",
      description:
        "Restore the natural appearance of wood, composite, and vinyl surfaces.",
      icon: "Fence",
    },
    {
      name: "Rust Removal",
      description:
        "Professional treatment to safely remove stubborn rust stains from siding and concrete.",
      icon: "Drop",
    },
    {
      name: "Paver Cleaning & Sanding",
      description:
        "Deep cleaning and joint sand restoration for paver patios and walkways.",
      icon: "SquaresFour",
    },
  ],
  commercial: [
    {
      name: "Building & Storefront Washing",
      description:
        "Professional exterior cleaning that keeps your business looking sharp for customers.",
      icon: "Storefront",
    },
    {
      name: "Sidewalks & Drive-Thrus",
      description:
        "Heavy-traffic concrete cleaned and maintained for safety and appearance.",
      icon: "Path",
    },
    {
      name: "Parking Lots & Garages",
      description:
        "Large-scale surface cleaning for commercial parking areas.",
      icon: "Car",
    },
    {
      name: "Property Management",
      description:
        "Ongoing exterior maintenance for schools, HOAs, retail centers, and office buildings.",
      icon: "Buildings",
    },
  ],
}

export const differentiators = [
  {
    title: "Professional Equipment, Competitive Pricing",
    description:
      "Commercial-grade equipment and professional solutions — without the premium price tag. Most pros with real gear charge more. Most cheap options show up with consumer machines.",
    icon: "CurrencyDollar",
  },
  {
    title: "Licensed, Bonded & Insured",
    description:
      "Your property is protected. We operate as a fully insured professional company — not a side hustle with a pickup truck.",
    icon: "Certificate",
  },
  {
    title: "Results That Actually Last",
    description:
      "Our soft-wash process removes organic growth at the root, not just the surface. That means results that hold up significantly longer.",
    icon: "Timer",
  },
  {
    title: "Communication You Can Count On",
    description:
      "Clear quotes, timely updates, and we show up when we say we will. Our customers call this out more than anything else.",
    icon: "ChatDots",
  },
]

export const stats = [
  { value: "53+", label: "5-Star Reviews" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "4+", label: "Years in Business" },
  { value: "3", label: "Regions Served" },
]

export const formFields = [
  { name: "name", label: "Your Name", type: "text", required: true },
  { name: "phone", label: "Phone Number", type: "tel", required: true },
  { name: "email", label: "Email", type: "email", required: false },
  {
    name: "service",
    label: "Service Needed",
    type: "select",
    required: false,
    options: [
      "House Washing",
      "Roof Cleaning",
      "Driveway & Concrete",
      "Concrete Sealing",
      "Deck & Fence Cleaning",
      "Rust Removal",
      "Paver Cleaning & Sanding",
      "Commercial Cleaning",
      "Other",
    ],
  },
  { name: "message", label: "Tell us about your project", type: "textarea", required: false },
]