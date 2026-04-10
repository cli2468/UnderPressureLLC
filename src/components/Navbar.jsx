import { useState, useEffect } from "react"
import { List, X, Phone, ArrowRight } from "@phosphor-icons/react"
import { business } from "../data/siteData"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#about" },
  { label: "Reviews", href: "#reviews" },
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/95 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="relative flex h-20 w-full items-center justify-between px-5 md:h-24 md:px-12 lg:px-16">
          <a href="#" className="flex min-w-0 max-w-[calc(100%-9.5rem)] flex-shrink items-center gap-2 md:max-w-none md:gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 font-display text-base uppercase tracking-[0.08em] text-accent-light shadow-[0_10px_24px_rgba(8,15,28,0.18)] md:h-[3.85rem] md:w-[3.85rem] md:text-lg">
              UP
            </span>
            <span className="-ml-1 flex min-w-0 flex-col justify-center pt-2 leading-none md:ml-0 md:pl-0 md:pt-3">
              <span className="block whitespace-nowrap font-display text-[14px] leading-[0.94] tracking-[0.01em] text-white uppercase md:text-[1.72rem] md:leading-[0.9]">
                Under Pressure
              </span>
              <span className="mt-1 block whitespace-nowrap font-sans text-[9px] font-medium uppercase tracking-[0.12em] text-white/88 md:mt-2 md:text-[0.82rem] md:tracking-[0.2em]">
                Exterior Cleaning
              </span>
            </span>
          </a>

          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
            {navLinks.filter((link) => link.label !== "Contact").map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-white/88 transition-colors duration-200 hover:text-accent-light"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href={business.phoneHref}
              className="flex items-center gap-2 text-sm font-medium text-white/88 transition-colors hover:text-accent-light"
            >
              <Phone size={18} weight="bold" />
              {business.phone}
            </a>
            <a
              href="#contact"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-light hover:text-brand-dark active:scale-[0.98]"
            >
              Get a Free Estimate
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href={business.phoneHref}
              className="flex items-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 text-sm font-semibold text-white"
            >
              <Phone size={14} weight="bold" />
              Call
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-text-light"
              aria-label="Open menu"
            >
              <List size={24} />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="menu-fade-in fixed inset-0 z-50 flex flex-col bg-brand-dark md:hidden">
          <div className="flex h-20 shrink-0 items-center justify-end px-6">
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-text-light"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-2 px-10">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{ animationDelay: `${100 + index * 60}ms` }}
                className="menu-slide-in-left group flex items-center justify-between border-b border-white/10 py-3 font-display text-4xl tracking-tight text-white uppercase"
              >
                {link.label}
                <ArrowRight size={20} weight="bold" className="text-white/30 transition-colors group-active:text-accent" />
              </a>
            ))}
          </div>

          <div
            style={{ animationDelay: "360ms" }}
            className="menu-slide-up space-y-4 px-10 pb-12"
          >
            <a
              href={business.phoneHref}
              className="flex items-center justify-center gap-2 text-lg font-semibold text-accent-light"
            >
              <Phone size={20} weight="bold" />
              {business.phone}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded-xl bg-accent py-4 text-center text-lg font-bold text-white transition-transform active:scale-[0.98]"
            >
              Get a Free Estimate
            </a>
          </div>
        </div>
      )}
    </>
  )
}
