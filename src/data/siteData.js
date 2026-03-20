export const business = {
  name: "Under Pressure Exterior Cleaning",
  legalName: "Under Pressure Exterior Cleaning, LLC",
  tagline: "Elevating the standard of exterior cleaning.",
  phone: "219-307-1207",
  phoneHref: "tel:2193071207",
  socialLinks: {
    facebook: "https://www.facebook.com/p/Under-Pressure-Exterior-Cleaning-100064698066523/",
    instagram: "https://www.instagram.com/_underpressure_llc_/",
  },
  serviceArea: [
    "Northwest Indiana",
    "North Central Indiana",
    "Southwest Michigan",
  ],
  established: "4 years",
  reviews: {
    displayCount: "50+",
    exactCount: 53,
    rating: 5,
    platforms: ["Google", "Facebook"],
  },
  credentials: ["Licensed", "Bonded", "Insured"],
  awards: ["NWI Life Spotlight Business of the Month"],
}

export const services = {
  residential: [
    {
      name: "House Washing",
      description:
        "Our professional house washing service uses a safe soft wash process to remove algae, mold, dirt, and buildup from your home's exterior, restoring its appearance and protecting your property.",
      icon: "House",
    },
    {
      name: "Roof Cleaning",
      description:
        "Professional roof cleaning designed to safely remove algae, moss, and organic buildup using a low-pressure soft wash system that protects and extends the life of your roof.",
      icon: "Umbrella",
    },
    {
      name: "Driveway & Concrete Cleaning",
      description:
        "Professional driveway and concrete cleaning that removes years of dirt, algae, and stains using high-powered surface cleaners, restoring the clean look of your property.",
      icon: "Road",
    },
    {
      name: "Concrete Sealing",
      description:
        "Our concrete sealing service creates a protective barrier that helps prevent staining, moisture penetration, and surface deterioration while enhancing the look of your concrete.",
      icon: "ShieldCheck",
    },
    {
      name: "Decks & Fences",
      description:
        "We safely clean wood and vinyl decks and fences, removing years of dirt, algae, and buildup while protecting the surface and restoring its original look.",
      icon: "Fence",
    },
    {
      name: "Rust Removal",
      description:
        "We use specialized cleaning solutions designed to break down and remove rust stains from concrete, siding, and other exterior surfaces without causing damage.",
      icon: "Drop",
    },
    {
      name: "Paver Cleaning, Sanding & Sealing",
      description:
        "We professionally clean pavers, refill the joints with fresh sand, and apply a protective sealant to enhance color, prevent weeds, and protect your surface from stains and wear.",
      icon: "SquaresFour",
    },
  ],
  commercial: [
    {
      name: "Buildings & Storefronts",
      description:
        "Professional building and storefront cleaning designed to remove dirt, stains, and buildup while maintaining a clean, professional appearance for your business.",
      icon: "Storefront",
    },
    {
      name: "Drive-Thrus & High Traffic Areas",
      description:
        "Professional cleaning for drive-through lanes and high-traffic areas, removing grease, stains, and heavy buildup to maintain a clean and welcoming environment.",
      icon: "Path",
    },
    {
      name: "Parking Lots & Garages",
      description:
        "Professional cleaning for parking lots and garages that removes oil, dirt, and grime while improving the overall appearance and safety of your property.",
      icon: "Car",
    },
    {
      name: "Property Management",
      description:
        "Under Pressure Exterior Cleaning works directly with property management companies, HOAs, and businesses to deliver dependable exterior cleaning services and maintain the appearance of their properties.",
      icon: "Buildings",
    },
    {
      name: "Schools, Retail Centers & Offices",
      description:
        "We provide professional exterior cleaning services for schools, retail centers, and office buildings, helping maintain clean, safe, and welcoming environments for students, employees, and visitors year-round.",
      icon: "Buildings",
    },
  ],
}

export const differentiators = [
  {
    title: "Professional Equipment, Competitive Pricing",
    description:
      "Commercial-grade equipment and professional solutions without the premium price tag. Most pros with real gear charge more. Most cheap options show up with consumer machines.",
    icon: "CurrencyDollar",
  },
  {
    title: "Licensed, Bonded & Insured",
    description:
      "Your property is protected. We operate as a fully insured professional company, not a side hustle with a pickup truck.",
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
  { value: "50+", label: "5-Star Reviews" },
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
      "Driveway & Concrete Cleaning",
      "Concrete Sealing",
      "Decks & Fences",
      "Rust Removal",
      "Paver Cleaning, Sanding & Sealing",
      "Buildings & Storefronts",
      "Drive-Thrus & High Traffic Areas",
      "Parking Lots & Garages",
      "Property Management",
      "Schools, Retail Centers & Offices",
      "Other",
    ],
  },
  { name: "message", label: "Tell us about your project", type: "textarea", required: false },
]
