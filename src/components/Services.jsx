import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CaretLeft, CaretRight, CaretDown, ArrowUpRight } from "@phosphor-icons/react"
import { services } from "../data/siteData"

// Map service names to available "After" images
import imgHouse from "../assets/images/before-after/AfterHouse.jpg"
import imgConcrete from "../assets/images/before-after/AfterConcrete.jpg"
import imgFence from "../assets/images/before-after/AfterFence.jpg"
import imgSiding from "../assets/images/before-after/AfterSiding.jpg"
import imgGutters from "../assets/images/before-after/AfterGutters.jpg"
import imgGarage from "../assets/images/before-after/AfterGarageCleaning.jpg"
import imgTownhouse from "../assets/images/before-after/AfterTownhouse.jpg"
import imgApartment from "../assets/images/before-after/AfterApartment.jpg"
import imgSideYard from "../assets/images/before-after/AfterSideYard.jpg"
import imgGarage2 from "../assets/images/before-after/AfterGarageCleaning2.jpg"

const imageMap = {
  "House Washing": imgHouse,
  "Roof Cleaning": imgTownhouse,
  "Driveway & Concrete": imgConcrete,
  "Concrete Sealing": imgGarage,
  "Deck & Fence Cleaning": imgFence,
  "Rust Removal": imgSiding,
  "Paver Cleaning & Sanding": imgSideYard,
  "Building & Storefront Washing": imgApartment,
  "Sidewalks & Drive-Thrus": imgConcrete,
  "Parking Lots & Garages": imgGarage2,
  "Property Management": imgGutters,
}

const spring = { type: "spring", stiffness: 100, damping: 20 }

/* ── Desktop card (carousel) ── */
function ServiceCard({ card, i, expandedCard, setExpandedCard, tab }) {
  const isExpanded = expandedCard === `${tab}-${card.name}`

  return (
    <motion.div
      key={`${tab}-${card.name}`}
      data-card
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ ...spring, delay: i * 0.06 }}
      style={{ width: "calc((100% - 2 * 1.25rem) / 3)", minWidth: "260px" }}
      className="relative flex-shrink-0 aspect-[4/5] rounded-2xl overflow-hidden snap-start group cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-shadow duration-300"
    >
      <img
        src={imageMap[card.name]}
        alt={card.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent transition-opacity duration-300 group-hover:from-brand-dark/80" />

      <div className="absolute bottom-5 left-5 right-5">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden">
          <button
            onClick={() =>
              setExpandedCard(isExpanded ? null : `${tab}-${card.name}`)
            }
            className="w-full flex items-center justify-between px-5 py-3.5 text-left"
          >
            <h3 className="font-semibold text-text-primary text-base">
              {card.name}
            </h3>
            <CaretDown
              size={18}
              weight="bold"
              className={`shrink-0 ml-2 transition-all duration-300 text-text-primary ${
                isExpanded
                  ? "rotate-180 opacity-100"
                  : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
              }`}
            />
          </button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-4 text-sm text-text-body leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Mobile accordion row ── */
function MobileAccordion({ card, expandedCard, setExpandedCard, tab, i }) {
  const isExpanded = expandedCard === `${tab}-${card.name}`
  const isLast = false // handled by parent

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...spring, delay: i * 0.04 }}
    >
      <button
        onClick={() =>
          setExpandedCard(isExpanded ? null : `${tab}-${card.name}`)
        }
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <h3 className="font-semibold text-text-primary text-base">
          {card.name}
        </h3>
        <CaretDown
          size={18}
          weight="bold"
          className={`shrink-0 ml-3 text-text-primary transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-text-body leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Services() {
  const [tab, setTab] = useState("residential")
  const [expandedCard, setExpandedCard] = useState(null)
  const scrollRef = useRef(null)
  const cards = tab === "residential" ? services.residential : services.commercial

  function scroll(dir) {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector("[data-card]")?.offsetWidth || 300
    const gap = 20
    el.scrollBy({ left: dir * (cardWidth + gap), behavior: "smooth" })
  }

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="text-center md:text-left"
          >
            <h2 className="font-display text-3xl md:text-5xl tracking-tight text-text-primary uppercase">
              <span className="md:hidden">Our Services</span>
              <span className="hidden md:inline">
                Top-Rated Exterior Cleaning
                <br />
                Services That Deliver
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.1 }}
            className="hidden md:block"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-accent-light hover:text-brand-dark transition-all duration-200 active:scale-[0.98]"
            >
              Get a Free Estimate
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center md:justify-start gap-2 mb-8">
          {["residential", "commercial"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t)
                setExpandedCard(null)
              }}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm capitalize transition-all duration-200 ${
                tab === t
                  ? "bg-brand-dark text-white shadow-[0_4px_20px_rgba(26,35,50,0.15)]"
                  : "bg-surface text-text-body hover:bg-surface-mid border border-surface-mid"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Desktop: Carousel ── */}
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 hidden md:block">
        <button
          onClick={() => scroll(-1)}
          className="flex absolute left-0 lg:left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.1)] items-center justify-center hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all"
          aria-label="Scroll left"
        >
          <CaretLeft size={22} className="text-text-primary" weight="bold" />
        </button>

        <button
          onClick={() => scroll(1)}
          className="flex absolute right-0 lg:right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.1)] items-center justify-center hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all"
          aria-label="Scroll right"
        >
          <CaretRight size={22} className="text-text-primary" weight="bold" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cards.map((card, i) => (
            <ServiceCard
              key={`${tab}-${card.name}`}
              card={card}
              i={i}
              expandedCard={expandedCard}
              setExpandedCard={setExpandedCard}
              tab={tab}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile: Clean accordion list ── */}
      <div className="md:hidden max-w-[1440px] mx-auto px-6">
        <div className="divide-y divide-surface-mid">
          {cards.map((card, i) => (
            <MobileAccordion
              key={`${tab}-${card.name}`}
              card={card}
              i={i}
              expandedCard={expandedCard}
              setExpandedCard={setExpandedCard}
              tab={tab}
            />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-accent-light hover:text-brand-dark transition-all duration-200 active:scale-[0.98]"
          >
            Get a Free Estimate
            <ArrowUpRight size={16} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  )
}
