import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { List, X, Phone, ArrowRight } from "@phosphor-icons/react"
import logo from "../assets/logos/UnderPressureLogo - Transparent.png"
import { business } from "../data/siteData"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
        >
        <div className="relative w-full px-5 md:px-12 lg:px-16 flex items-center justify-between h-20 md:h-24">
          {/* Logo — left */}
          <a href="#" className="flex items-center gap-2.5 md:gap-3.5 flex-shrink-0">
            <img
              src={logo}
              alt={business.name}
              className="h-12 md:h-14 w-auto object-contain"
            />
            <span className="flex flex-col justify-center leading-none pt-0.5">
              <span className="block font-display text-[15px] md:text-[1.7rem] uppercase tracking-[0.01em] text-white md:leading-[0.92]">
                Under Pressure
              </span>
              <span className="block font-sans text-[10px] md:text-[0.82rem] font-medium uppercase tracking-[0.24em] text-text-light/75 mt-1.5 md:mt-2">
                Exterior Cleaning
              </span>
            </span>
          </a>

          {/* Links — true center of viewport */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.filter(l => l.label !== "Contact").map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-text-light/80 hover:text-accent-light transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA — right (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={business.phoneHref}
              className="flex items-center gap-2 text-sm font-medium text-text-light/80 hover:text-accent-light transition-colors"
            >
              <Phone size={18} weight="bold" />
              {business.phone}
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-light hover:text-brand-dark transition-all duration-200 active:scale-[0.98]"
            >
              Get a Free Estimate
            </a>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={business.phoneHref}
              className="flex items-center gap-1.5 bg-accent text-white text-sm font-semibold px-3.5 py-2 rounded-xl"
            >
              <Phone size={14} weight="bold" />
              Call
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="text-text-light p-2"
              aria-label="Open menu"
            >
              <List size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — full-screen takeover */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-brand-dark md:hidden flex flex-col"
          >
            {/* Top bar with close only */}
            <div className="flex items-center justify-end px-6 h-20 shrink-0">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-text-light p-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav links — large, left-aligned, staggered */}
            <div className="flex-1 flex flex-col justify-center px-10 gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 200, damping: 25 }}
                  className="font-display text-4xl uppercase tracking-tight text-white py-3 border-b border-white/10 flex items-center justify-between group"
                >
                  {link.label}
                  <ArrowRight size={20} weight="bold" className="text-white/30 group-active:text-accent transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* Bottom — phone + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, type: "spring", stiffness: 200, damping: 25 }}
              className="px-10 pb-12 space-y-4"
            >
              <a
                href={business.phoneHref}
                className="flex items-center justify-center gap-2 text-accent-light text-lg font-semibold"
              >
                <Phone size={20} weight="bold" />
                {business.phone}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-accent text-white font-bold py-4 rounded-xl text-lg active:scale-[0.98] transition-transform"
              >
                Get a Free Estimate
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
