import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CaretLeft, CaretRight, CaretDown, ArrowUpRight } from "@phosphor-icons/react"
import { services } from "../data/siteData"

// Map service names to available "After" images
import imgConcrete from "../assets/images/before-after - mine/AfterConcrete.jpg"
import imgSiding from "../assets/images/before-after - mine/AfterSiding.jpg"
import imgGutters from "../assets/images/before-after - mine/AfterGutters.jpg"
import imgGarage from "../assets/images/before-after - mine/AfterGarageCleaning.jpg"
import imgGarage2 from "../assets/images/before-after - mine/AfterGarageCleaning2.jpg"
import beforeGarage2 from "../assets/images/before-after - mine/BeforeGarageCleaning2.jpg"
import beforeTownhouse from "../assets/images/before-after - mine/BeforeTownhouse.jpg"
import beforeSiding from "../assets/images/before-after - mine/BeforeSiding.jpg"
import churchPhoto from "../assets/images/gallery/church.jpg"
import clientCommercialBuildingAfter from "../assets/images/CLIENT-before-after/Commercial Building After .jpg"
import clientCommercialBuildingBefore from "../assets/images/CLIENT-before-after/Commercial Building Before .jpg"
import clientConcreteBefore from "../assets/images/CLIENT-before-after/Concrete Before.jpg"
import clientCommercialSidewalks from "../assets/images/CLIENT-before-after/Commercial Sidewalks .jpg"
import clientConcreteAfter from "../assets/images/CLIENT-before-after/Concrete After .jpg"
import clientConcreteSealing from "../assets/images/CLIENT-before-after/Concrete Sealing .png"
import clientDeckAfter from "../assets/images/CLIENT-before-after/Deck After.jpg"
import clientDeckBefore from "../assets/images/CLIENT-before-after/Deck Before .jpg"
import clientHouseAfter from "../assets/images/CLIENT-before-after/House After .jpg"
import clientHouseBefore from "../assets/images/CLIENT-before-after/House Before .jpg"
import clientPaversAfter from "../assets/images/CLIENT-before-after/Pavers After.jpg"
import clientPaverCleaningPicture from "../assets/images/CLIENT-before-after/Paver Cleaning Picture .jpg"
import clientPaversBefore from "../assets/images/CLIENT-before-after/Pavers Before .jpg"
import clientPropertyManagementAfter from "../assets/images/CLIENT-before-after/Property Management After.jpg"
import clientPropertyManagementBefore from "../assets/images/CLIENT-before-after/Property Management Before .jpg"
import clientRoofAfter from "../assets/images/CLIENT-before-after/Roof After .JPG"
import clientRoofBefore from "../assets/images/CLIENT-before-after/Roof Before .JPG"

const imageMap = {
  "House Washing": clientHouseAfter,
  "Roof Cleaning": clientRoofAfter,
  "Driveway & Concrete Cleaning": clientConcreteAfter,
  "Concrete Sealing": clientConcreteSealing,
  "Decks & Fences": clientDeckAfter,
  "Rust Removal": imgSiding,
  "Paver Cleaning, Sanding & Sealing": clientPaversAfter,
  "Buildings & Storefronts": clientCommercialBuildingAfter,
  "Drive-Thrus & High Traffic Areas": clientCommercialSidewalks,
  "Parking Lots & Garages": imgGarage2,
  "Property Management": clientPropertyManagementAfter,
  "Schools, Retail Centers & Offices": churchPhoto,
}

const imagePositionMap = {
  "Drive-Thrus & High Traffic Areas": "center 62%",
}

const beforeAfterMap = {
  "House Washing": { before: clientHouseBefore, after: clientHouseAfter, label: "House Washing" },
  "Roof Cleaning": { before: clientRoofBefore, after: clientRoofAfter, label: "Roof Cleaning" },
  "Driveway & Concrete Cleaning": {
    before: clientConcreteBefore,
    after: clientConcreteAfter,
    label: "Driveway & Concrete Cleaning",
    beforePosition: "center 62%",
    afterPosition: "center 80%",
  },
  "Decks & Fences": { before: clientDeckBefore, after: clientDeckAfter, label: "Decks & Fences" },
  "Rust Removal": { before: beforeSiding, after: imgSiding, label: "Rust Removal" },
  "Paver Cleaning, Sanding & Sealing": { before: clientPaversBefore, after: clientPaversAfter, label: "Paver Cleaning, Sanding & Sealing" },
  "Buildings & Storefronts": { before: clientCommercialBuildingBefore, after: clientCommercialBuildingAfter, label: "Buildings & Storefronts" },
  "Parking Lots & Garages": { before: beforeGarage2, after: imgGarage2, label: "Parking Lots & Garages" },
  "Property Management": {
    before: clientPropertyManagementBefore,
    after: clientPropertyManagementAfter,
    label: "Property Management",
  },
}

const spring = { type: "spring", stiffness: 100, damping: 20 }

function MobileBeforeAfterSlider({ pair }) {
  const [pos, setPos] = useState(50)
  const [containerW, setContainerW] = useState(0)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      setContainerW(entries[0].contentRect.width)
    })
    observer.observe(el)
    setContainerW(el.offsetWidth)
    return () => observer.disconnect()
  }, [])

  function updatePos(clientX) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = clientX - rect.left
    const pct = Math.max(2, Math.min(98, (x / rect.width) * 100))
    setPos(pct)
  }

  function onPointerDown(e) {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updatePos(e.clientX)
  }

  function onPointerMove(e) {
    if (!dragging.current) return
    updatePos(e.clientX)
  }

  function onPointerUp() {
    dragging.current = false
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="relative h-[280px] rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none mb-4"
    >
      <img
        src={pair.after}
        alt={`${pair.label} after`}
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ objectPosition: pair.afterPosition ?? "center" }}
        draggable={false}
      />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={pair.before}
          alt={`${pair.label} before`}
          className="absolute top-0 left-0 h-full object-cover object-center"
          style={{
            width: containerW > 0 ? `${containerW}px` : "100vw",
            maxWidth: "none",
            objectPosition: pair.beforePosition ?? "center",
          }}
          draggable={false}
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-brand-dark">
            <path d="M5 3L2 8L5 13M11 3L14 8L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-4 left-4">
        <span className="bg-white/90 backdrop-blur-sm text-text-primary font-semibold text-sm px-4 py-2 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
          Before
        </span>
      </div>
      <div className="absolute bottom-4 right-4">
        <span className="bg-accent/90 backdrop-blur-sm text-white font-semibold text-sm px-4 py-2 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
          After
        </span>
      </div>
    </div>
  )
}

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
        style={{ objectPosition: imagePositionMap[card.name] ?? "center" }}
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
              className={`shrink-0 ml-2 transition-all duration-300 text-text-primary ${isExpanded
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

/* ── Mobile accordion row with image ── */
function MobileAccordion({ card, expandedCard, setExpandedCard, tab, i }) {
  const isExpanded = expandedCard === `${tab}-${card.name}`
  const beforeAfterPair = beforeAfterMap[card.name]
  const useStaticMobileImage = card.name === "Paver Cleaning, Sanding & Sealing"

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
          className={`shrink-0 ml-3 text-text-primary transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
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
            {useStaticMobileImage ? (
              <img
                src={clientPaverCleaningPicture}
                alt={card.name}
                className="w-full h-[280px] object-cover rounded-xl mb-4"
              />
            ) : beforeAfterPair ? (
              <MobileBeforeAfterSlider pair={beforeAfterPair} />
            ) : imageMap[card.name] ? (
              <img
                src={imageMap[card.name]}
                alt={card.name}
                className="w-full h-[280px] object-cover rounded-xl mb-4"
                style={{ objectPosition: imagePositionMap[card.name] ?? "center" }}
              />
            ) : null}
            <p className="pb-4 text-sm text-text-body leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function getDefaultExpanded(t) {
  const list = t === "residential" ? services.residential : services.commercial
  const isMobile = window.matchMedia("(max-width: 767px)").matches
  const idx = isMobile ? 0 : 1
  return `${t}-${list[idx].name}`
}

export default function Services() {
  const [tab, setTab] = useState("residential")
  const cards = tab === "residential" ? services.residential : services.commercial
  const [expandedCard, setExpandedCard] = useState(`residential-${services.residential[1].name}`)
  const scrollRef = useRef(null)
  const tabSwitchTimeoutRef = useRef(null)

  // Set correct default based on screen size after mount
  useEffect(() => {
    setExpandedCard(getDefaultExpanded("residential"))
  }, [])

  useEffect(() => {
    return () => {
      if (tabSwitchTimeoutRef.current) {
        clearTimeout(tabSwitchTimeoutRef.current)
      }
    }
  }, [])

  function scroll(dir) {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector("[data-card]")?.offsetWidth || 300
    const gap = 20
    el.scrollBy({ left: dir * (cardWidth + gap), behavior: "smooth" })
  }

  function switchTab(nextTab) {
    if (nextTab === tab) return

    const nextCards = nextTab === "residential" ? services.residential : services.commercial
    const defaultIndex = window.matchMedia("(max-width: 767px)").matches ? 0 : 1
    const nextExpanded = `${nextTab}-${nextCards[defaultIndex].name}`
    const isDesktop = window.matchMedia("(min-width: 768px)").matches

    if (tabSwitchTimeoutRef.current) {
      clearTimeout(tabSwitchTimeoutRef.current)
    }

    setTab(nextTab)
    scrollRef.current?.scrollTo({ left: 0, behavior: "auto" })

    if (isDesktop) {
      setExpandedCard(null)
      tabSwitchTimeoutRef.current = setTimeout(() => {
        setExpandedCard(nextExpanded)
      }, 220)
      return
    }

    setExpandedCard(nextExpanded)
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
            <div className="w-10 h-1 bg-accent rounded-full mx-auto md:mx-0 mb-4" />
            <h2 className="font-display text-3xl md:text-5xl tracking-tight text-text-primary uppercase">
              <span className="md:hidden">Our Services</span>
              <span className="hidden md:inline">
                Exterior Cleaning That Lasts
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
              onClick={() => switchTab(t)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm capitalize transition-all duration-200 ${tab === t
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
