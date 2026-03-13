import { motion } from "framer-motion"
import { Warning, ShieldCheck, Drop, ArrowRight, FileText, X, Check } from "@phosphor-icons/react"
import videoSrc from "../assets/images/gallery/Pressure Wash.mp4"

const spring = { type: "spring", stiffness: 100, damping: 20 }

const theirWay = [
  "High-pressure blasting that cracks concrete",
  "Strips paint and damages siding",
  "Voids manufacturer warranties on roofing",
  "Forces water behind siding, causing mold",
]

const ourWay = [
  "Low-pressure soft wash — safe on every surface",
  "Commercial-grade solutions that kill growth at the root",
  "Results that last significantly longer",
  "Fully licensed, bonded, and insured",
]

export default function WhyUs() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* ── Mobile layout: heading, video, then content ── */}
        <div className="md:hidden mb-8 text-center">
          <h2 className="font-display text-3xl tracking-tight text-text-primary uppercase mb-6">
            The Wrong Company
            <br />
            Can Cost You Thousands
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* Left — vertical video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={spring}
          >
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-[3/4] max-h-[540px] object-cover rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
            />
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
            <h2 className="hidden md:block font-display text-3xl md:text-5xl tracking-tight text-text-primary uppercase mb-6">
              The Wrong Company
              <br />
              Can Cost You
              <br />
              Thousands
            </h2>
            <p className="text-text-body leading-relaxed mb-8 max-w-[50ch]">
              Most exterior cleaning companies blast surfaces with high pressure
              to get the job done fast. The result? Damaged property and repairs
              that cost far more than the cleaning itself.
            </p>

            {/* VS Comparison */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Other Companies */}
              <div className="bg-white border border-red-200/60 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                    <Warning size={20} weight="duotone" className="text-red-500" />
                  </div>
                  <h3 className="font-display text-sm uppercase tracking-tight text-text-primary">
                    Other Companies
                  </h3>
                </div>
                <ul className="space-y-3">
                  {theirWay.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <X size={14} weight="bold" className="text-red-400 mt-1 shrink-0" />
                      <span className="text-sm text-text-body leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Under Pressure */}
              <div className="bg-white border border-accent/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center">
                    <ShieldCheck size={20} weight="duotone" className="text-accent" />
                  </div>
                  <h3 className="font-display text-sm uppercase tracking-tight text-text-primary">
                    Under Pressure
                  </h3>
                </div>
                <ul className="space-y-3">
                  {ourWay.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={14} weight="bold" className="text-accent mt-1 shrink-0" />
                      <span className="text-sm text-text-body leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Insurance link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.2 }}
            >
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-brand-dark text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-brand-light transition-all duration-200 active:scale-[0.98]"
              >
                <FileText size={18} weight="bold" />
                View Our Insurance Information
                <ArrowRight size={16} weight="bold" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
