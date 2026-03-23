import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Warning, ShieldCheck, ArrowRight, FileText, X, Check, Phone } from "@phosphor-icons/react"
import videoPoster from "../assets/images/gallery/Timelapse-poster.jpg"
import videoSrc from "../assets/images/gallery/Timelapse-optimized.mp4"

const spring = { type: "spring", stiffness: 100, damping: 20 }

function InsuranceModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={spring}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-mid transition-colors"
            aria-label="Close"
          >
            <X size={18} weight="bold" className="text-text-body" />
          </button>

          {/* Heading */}
          <h3 className="font-display text-xl uppercase tracking-tight text-text-primary mb-3">
            Insurance Information
          </h3>
          <p className="text-text-body text-sm leading-relaxed mb-7">
            Our certificate of insurance is available upon request — please give us a call or send us a message and we'll provide it.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:2193071207"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-dark text-white font-semibold px-5 py-3 rounded-full text-sm hover:bg-brand-light transition-all duration-200 active:scale-[0.98]"
            >
              <Phone size={16} weight="bold" />
              Call Now
            </a>
            <a
              href="#contact"
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-brand-dark text-brand-dark font-semibold px-5 py-3 rounded-full text-sm hover:bg-surface transition-all duration-200 active:scale-[0.98]"
            >
              Send a Message
              <ArrowRight size={16} weight="bold" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const theirWay = [
  "May rely on excessive pressure and improper techniques that can etch and permanently damage concrete surfaces.",
  "May use high-pressure methods on siding that can strip paint or damage exterior materials.",
  "May apply incorrect cleaning methods on roofing that may void manufacturer warranties and shorten the roof's lifespan.",
  "May force water behind siding and trim, increasing the risk of moisture intrusion, mold, and long-term structural damage.",
]

const ourWay = [
  "Low-pressure soft wash — safe on every surface",
  "Commercial-grade solutions that kill growth at the root",
  "Results that last significantly longer",
  "Fully licensed, bonded, and insured",
]

export default function WhyUs() {
  const [modalOpen, setModalOpen] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  return (
    <>
    <section id="about" className="py-24 bg-surface-mid/30 md:bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* ── Mobile layout: heading, video, then content ── */}
        <div className="md:hidden mb-8 text-left">
          <div className="w-10 h-1 bg-accent rounded-full mb-4" />
          <h2 className="font-display text-3xl tracking-tight text-text-primary uppercase mb-6">
            The Wrong Company
            <br />
            Can Cost You Thousands
          </h2>
          <p className="text-text-body leading-relaxed">
            Many exterior cleaning companies may rely on improper techniques, poor training, and excessive pressure to complete jobs quickly. The result? Damaged siding, etched concrete, and costly repairs that can far exceed the price of the cleaning itself.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-stretch">
          {/* Left — vertical video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="relative h-full min-h-[400px] md:min-h-0"
          >
            {videoFailed ? (
              <img
                src={videoPoster}
                alt="Under Pressure Exterior Cleaning soft washing a home exterior"
                className="w-full h-full object-cover rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] md:absolute md:inset-0"
              />
            ) : (
              <video
                src={videoSrc}
                poster={videoPoster}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                onError={() => setVideoFailed(true)}
                aria-label="Timelapse of Under Pressure Exterior Cleaning soft washing a home exterior"
                className="w-full h-full object-cover rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] md:absolute md:inset-0"
              />
            )}
          </motion.div>

          {/* Right — heading + VS comparison */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.1 }}
            className="flex flex-col justify-start"
          >
            {/* Desktop heading */}
            <div className="hidden md:block w-10 h-1 bg-accent rounded-full mb-4" />
            <h2 className="hidden md:block font-display text-3xl md:text-5xl tracking-tight text-text-primary uppercase mb-6">
              The Wrong Company Can
              <br />
              Cost You Thousands
            </h2>
            <p className="hidden md:block text-text-body leading-relaxed max-w-[50ch] mb-6">
              Many exterior cleaning companies may rely on improper techniques, poor training, and excessive pressure to complete jobs quickly. The result? Damaged siding, etched concrete, and costly repairs that can far exceed the price of the cleaning itself.
            </p>
            {/* Transition line — below intro copy on desktop */}
            <p className="font-display text-xl md:text-base uppercase tracking-tight text-text-primary mt-4 md:mt-0 mb-6 md:mb-8">
              — But at Under Pressure, we:
            </p>

            {/* VS Comparison — stacked full-width cards */}
            <div className="space-y-4 mb-8">
              {/* Under Pressure — featured card */}
              <div className="bg-accent/5 border-2 border-accent/25 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-accent/15 rounded-xl flex items-center justify-center">
                    <ShieldCheck size={22} weight="duotone" className="text-accent" />
                  </div>
                  <h3 className="font-display text-base uppercase tracking-tight text-text-primary">
                    Under Pressure
                  </h3>
                </div>
                <ul className="space-y-3">
                  {ourWay.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-accent/15 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                        <Check size={12} weight="bold" className="text-accent" />
                      </div>
                      <span className="text-sm text-text-primary font-medium leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other Companies — muted card */}
              <div className="bg-surface border-2 border-surface-mid rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                    <Warning size={22} weight="duotone" className="text-red-400" />
                  </div>
                  <h3 className="font-display text-base uppercase tracking-tight text-text-primary">
                    Other Companies
                  </h3>
                </div>
                <ul className="space-y-3">
                  {theirWay.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-red-50 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                        <X size={12} weight="bold" className="text-red-400" />
                      </div>
                      <span className="text-sm text-text-primary font-medium leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Insurance button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.2 }}
            >
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-brand-dark text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-brand-light transition-all duration-200 active:scale-[0.98]"
              >
                <FileText size={18} weight="bold" />
                View Our Insurance Information
                <ArrowRight size={16} weight="bold" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    {modalOpen && <InsuranceModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
