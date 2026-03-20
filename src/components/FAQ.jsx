import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CaretDown, Phone } from "@phosphor-icons/react"
import { business } from "../data/siteData"

const faqs = [
  {
    question: "What is soft washing and how is it different from pressure washing?",
    answer:
      "Soft washing uses low-pressure water combined with commercial-grade cleaning solutions to safely remove algae, mold, mildew, and organic growth from surfaces. Unlike traditional pressure washing that relies on high-pressure force, soft washing kills growth at the root without risking damage to siding, roofing, or painted surfaces. The results last significantly longer because the source of the growth is eliminated, not just the surface stain.",
  },
  {
    question: "What areas does Under Pressure Exterior Cleaning serve?",
    answer:
      "Under Pressure Exterior Cleaning serves Northwest Indiana, North Central Indiana, and Southwest Michigan. Popular service cities include Valparaiso, Chesterton, Portage, Michigan City, La Porte, Crown Point, Merrillville, Hobart, Schererville, St. John, Wanatah, and New Buffalo. Contact us at 219-307-1207 to confirm service availability in your area.",
  },
  {
    question: "Is Under Pressure Exterior Cleaning licensed and insured?",
    answer:
      "Yes. Under Pressure Exterior Cleaning is fully licensed, bonded, and insured. Your property is protected throughout the entire cleaning process. We operate as a professional company with commercial-grade equipment, not a side job with consumer machines.",
  },
  {
    question: "How much does exterior cleaning cost?",
    answer:
      "Pricing depends on the size of the area, the type of service needed, and the condition of the surfaces. Under Pressure Exterior Cleaning provides free, detailed estimates with no obligation. Call 219-307-1207 or fill out our online form to request your free estimate.",
  },
  {
    question: "What residential services does Under Pressure offer?",
    answer:
      "Under Pressure Exterior Cleaning offers house washing, roof cleaning, driveway and concrete cleaning, concrete sealing, deck and fence cleaning, rust removal, and paver cleaning with sanding and sealing. All residential services use safe soft-wash techniques that protect your property while delivering long-lasting results.",
  },
  {
    question: "Do you offer commercial exterior cleaning services?",
    answer:
      "Yes. Under Pressure Exterior Cleaning provides commercial services including building and storefront washing, drive-thru and high-traffic area cleaning, parking lot and garage cleaning, and property management services for schools, HOAs, retail centers, and office buildings.",
  },
]

const easeOut = [0.23, 1, 0.32, 1]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-surface-mid last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <h3 className="font-semibold text-text-primary text-base md:text-lg leading-snug pr-2">
          {faq.question}
        </h3>
        <CaretDown
          size={20}
          weight="bold"
          className={`shrink-0 mt-1 text-accent transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.24, ease: easeOut },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.18, ease: easeOut },
            }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-text-body leading-relaxed max-w-[70ch]">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Left column — heading + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="lg:col-span-2"
          >
            <div className="w-10 h-1 bg-accent rounded-full mb-4" />
            <h2 className="font-display text-3xl md:text-5xl tracking-tight text-text-primary uppercase mb-4">
              Common Questions
            </h2>
            <p className="text-text-body leading-relaxed mb-8 max-w-[45ch]">
              Answers to the most frequently asked questions about our exterior cleaning services, process, and service area.
            </p>
            <a
              href={business.phoneHref}
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-6 py-3 rounded-full text-sm transition-all duration-200 hover:bg-accent-light hover:text-brand-dark active:scale-[0.98]"
            >
              <Phone size={18} weight="bold" />
              Call {business.phone}
            </a>
          </motion.div>

          {/* Right column — FAQ accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.1,
            }}
            className="lg:col-span-3"
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
