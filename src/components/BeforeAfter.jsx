import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Before/after pairs
import clientCommercialBuildingAfter from "../assets/images/CLIENT-before-after/Commercial Building After .jpg"
import clientCommercialBuildingBefore from "../assets/images/CLIENT-before-after/Commercial Building Before .jpg"
import clientConcreteBefore from "../assets/images/CLIENT-before-after/Concrete Before.jpg"
import clientConcreteAfter from "../assets/images/CLIENT-before-after/Concrete After .jpg"
import clientDeckAfter from "../assets/images/CLIENT-before-after/Deck After.jpg"
import clientDeckBefore from "../assets/images/CLIENT-before-after/Deck Before .jpg"
import clientHouseAfter from "../assets/images/CLIENT-before-after/House After .jpg"
import clientHouseBefore from "../assets/images/CLIENT-before-after/House Before .jpg"
import garageAfter from "../assets/images/before-after - mine/AfterGarageCleaning2.jpg"
import garageBefore from "../assets/images/before-after - mine/BeforeGarageCleaning2.jpg"
import clientPaversAfter from "../assets/images/CLIENT-before-after/Pavers After.jpg"
import clientPaversBefore from "../assets/images/CLIENT-before-after/Pavers Before .jpg"
import clientPropertyManagementAfter from "../assets/images/CLIENT-before-after/Property Management After.jpg"
import clientPropertyManagementBefore from "../assets/images/CLIENT-before-after/Property Management Before .jpg"
import clientRoofAfter from "../assets/images/CLIENT-before-after/Roof After .JPG"
import clientRoofBefore from "../assets/images/CLIENT-before-after/Roof Before .JPG"

const pairs = [
  { before: clientHouseBefore, after: clientHouseAfter, label: "House Washing" },
  {
    before: clientConcreteBefore,
    after: clientConcreteAfter,
    label: "Driveway & Concrete Cleaning",
    afterPosition: "center 66%",
  },
  { before: clientDeckBefore, after: clientDeckAfter, label: "Decks & Fences" },
  { before: clientRoofBefore, after: clientRoofAfter, label: "Roof Cleaning" },
  { before: clientPaversBefore, after: clientPaversAfter, label: "Paver Cleaning, Sanding & Sealing" },
  { before: clientPropertyManagementBefore, after: clientPropertyManagementAfter, label: "Property Management" },
  { before: garageBefore, after: garageAfter, label: "Parking Lots & Garages" },
  { before: clientCommercialBuildingBefore, after: clientCommercialBuildingAfter, label: "Buildings & Storefronts" },
]

function useIsMobile() {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    setMobile(mq.matches)
    const handler = (e) => setMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return mobile
}

function buildPages(isMobile) {
  const perPage = isMobile ? 1 : 2
  const pages = []
  for (let i = 0; i < pairs.length; i += perPage) {
    pages.push(pairs.slice(i, i + perPage))
  }
  return pages
}

const spring = { type: "spring", stiffness: 100, damping: 20 }

function Slider({ before, after, label, onInteract, beforePosition, afterPosition }) {
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

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = clientX - rect.left
    const pct = Math.max(2, Math.min(98, (x / rect.width) * 100))
    setPos(pct)
  }, [])

  const onPointerDown = (e) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updatePos(e.clientX)
    onInteract?.()
  }

  const onPointerMove = (e) => {
    if (!dragging.current) return
    updatePos(e.clientX)
  }

  const onPointerUp = () => {
    dragging.current = false
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="relative aspect-[5/4] rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none"
    >
      <img
        src={after}
        alt={`${label} after`}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: afterPosition ?? "center" }}
        draggable={false}
      />

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt={`${label} before`}
          className="absolute top-0 left-0 h-full object-cover"
          style={{
            width: containerW > 0 ? `${containerW}px` : "100vw",
            maxWidth: "none",
            objectPosition: beforePosition ?? "center",
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

      <div className="absolute bottom-5 left-5">
        <span className="bg-white/90 backdrop-blur-sm text-text-primary font-semibold text-sm px-5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
          Before
        </span>
      </div>
      <div className="absolute bottom-5 right-5">
        <span className="bg-accent/90 backdrop-blur-sm text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
          After
        </span>
      </div>

      <div className="absolute top-5 left-5">
        <span className="bg-brand-dark/70 backdrop-blur-sm text-white font-semibold text-xs px-3 py-1.5 rounded-full">
          {label}
        </span>
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const isMobile = useIsMobile()
  const pages = buildPages(isMobile)
  const [activePage, setActivePage] = useState(0)
  const pausedUntil = useRef(0)

  useEffect(() => {
    if (activePage >= pages.length) setActivePage(0)
  }, [pages.length, activePage])

  useEffect(() => {
    if (!isMobile) return
    const timer = setInterval(() => {
      if (Date.now() < pausedUntil.current) return
      setActivePage((p) => (p + 1) % pages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isMobile, pages.length])

  function handleInteract() {
    pausedUntil.current = Date.now() + 10000
  }

  const currentPairs = pages[activePage] || pages[0]

  return (
    <section id="case-studies" className="hidden md:block py-24 bg-surface-mid/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-14"
        >
          <div className="w-10 h-1 bg-accent rounded-full mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-5xl tracking-tight text-text-primary uppercase mb-4">
            Professional. Reliable. Results.
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {currentPairs.map((pair) => (
              <Slider
                key={pair.label}
                before={pair.before}
                after={pair.after}
                label={pair.label}
                beforePosition={pair.beforePosition}
                afterPosition={pair.afterPosition}
                onInteract={handleInteract}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2.5 mt-10">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActivePage(i)
                handleInteract()
              }}
              aria-label={`Page ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activePage
                  ? "w-3 h-3 bg-accent"
                  : "w-2.5 h-2.5 bg-text-muted/30 hover:bg-text-muted/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
