import { motion } from "framer-motion"
import { Warning, ShieldCheck, Drop, ArrowRight, FileText } from "@phosphor-icons/react"
import videoSrc from "../assets/images/gallery/Pressure Wash.mp4"

const spring = { type: "spring", stiffness: 100, damping: 20 }

const risks = [
  "Cracked or etched concrete from excessive PSI",
  "Stripped paint and damaged siding",
  "Voided manufacturer warranties on roofing",
  "Water forced behind siding, causing mold and rot",
]

export default function WhyUs() {
  return (
    <section id="about" className="py-24 bg-surface">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Top row: Video left, Title + description right */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start mb-12">
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
              className="w-full aspect-[3/4] object-cover rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
            />
          </motion.div>

          {/* Right — heading + body text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.1 }}
            className="flex flex-col justify-start"
          >
            <h2 className="font-display text-3xl md:text-5xl tracking-tight text-text-primary uppercase mb-6">
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

            {/* Two cards stacked */}
            <div className="grid gap-6">
              {/* Risk card */}
              <div className="bg-white border border-red-200/60 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center">
                    <Warning size={24} weight="duotone" className="text-red-500" />
                  </div>
                  <h3 className="font-display text-xl uppercase tracking-tight text-text-primary">
                    High-Pressure Damage
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {risks.map((risk) => (
                    <li key={risk} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                      <span className="text-sm text-text-body">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our approach card */}
              <div className="bg-white border border-accent/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center">
                    <ShieldCheck size={24} weight="duotone" className="text-accent" />
                  </div>
                  <h3 className="font-display text-xl uppercase tracking-tight text-text-primary">
                    Our Soft-Wash Process
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Drop size={20} weight="duotone" className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Low-pressure application</p>
                      <p className="text-sm text-text-body">Safe for siding, roofing, wood, and concrete surfaces</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Drop size={20} weight="duotone" className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Kills growth at the source</p>
                      <p className="text-sm text-text-body">Results last significantly longer than pressure alone</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Drop size={20} weight="duotone" className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Protects your investment</p>
                      <p className="text-sm text-text-body">No risk of cracked concrete, stripped paint, or voided warranties</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.2 }}
              className="mt-8"
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
