import { motion } from "framer-motion"
import { Phone, ArrowRight } from "@phosphor-icons/react"
import { business } from "../data/siteData"
import heroImg from "../assets/images/gallery/Hero1.jpg"

const spring = { type: "spring", stiffness: 100, damping: 20 }

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] bg-brand-dark overflow-hidden">
      {/* Background image — full bleed */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Freshly cleaned residential driveway and home exterior"
          className="w-full h-full object-cover object-center"
        />
        {/* Layered gradients: dark bottom-left for text legibility, subtle top vignette */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/90 via-brand-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark/30" />
      </div>

      {/* Content — left aligned */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex items-center min-h-[100dvh]">
        <div className="max-w-xl py-24 md:py-0">

          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl tracking-tight text-white leading-none mb-6 uppercase"
          >
            Exterior Cleaning
            <span className="block text-accent-light mt-2">Done Right</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring, delay: 0.6 }}
            className="text-base md:text-lg text-text-light/70 leading-relaxed max-w-[50ch] mb-10"
          >
            Professional soft washing and pressure washing for homes and
            businesses across Northwest Indiana and Southwest Michigan.
            Results you can see. Pricing you can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white hover:text-brand-dark font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-[0_8px_30px_rgba(8,145,178,0.3)] active:scale-[0.98]"
            >
              <Phone size={22} weight="bold" />
              Call {business.phone}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-accent/50 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 active:scale-[0.98]"
            >
              Free Estimate
              <ArrowRight size={20} weight="bold" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-light border border-accent/30 px-3 py-1 rounded-full">
              NWI Life in the Spotlight — Business of the Month
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}