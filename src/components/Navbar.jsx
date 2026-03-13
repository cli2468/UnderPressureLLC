import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { List, X, Phone } from "@phosphor-icons/react"
import logo from "../assets/logos/UnderPressureLogo - Transparent.png"
import { business } from "../data/siteData"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div className="relative w-full px-6 md:px-12 lg:px-16 flex items-center justify-between h-16 md:h-20">
          {/* Logo — left */}
          <a href="#" className="flex-shrink-0">
            <img
              src={logo}
              alt={business.name}
              className="h-10 md:h-14 w-auto"
            />
          </a>

          {/* Links — true center of viewport */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
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
          <div className="flex items-center gap-3 md:hidden">
            <a
              href={business.phoneHref}
              className="flex items-center gap-1.5 bg-accent text-white text-sm font-semibold px-3 py-1.5 rounded-lg"
            >
              <Phone size={14} weight="bold" />
              Call
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-text-light p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 top-16 z-30 bg-brand-dark/98 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center gap-6 pt-12">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-text-light/90 hover:text-accent-light transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={business.phoneHref}
                className="flex items-center gap-2 text-lg font-medium text-accent-light"
              >
                <Phone size={22} weight="bold" />
                {business.phone}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-8 py-3 bg-accent text-white font-semibold rounded-lg text-lg active:scale-[0.98]"
              >
                Get a Free Estimate
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}