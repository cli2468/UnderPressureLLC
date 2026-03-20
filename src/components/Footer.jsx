import { Phone, MapPin, FacebookLogo, InstagramLogo } from "@phosphor-icons/react"
import { business } from "../data/siteData"
import logo from "../assets/logos/UnderPressureLogo - Transparent.png"

export default function Footer() {
  const socialIconClassName =
    "w-9 h-9 rounded-full bg-text-body/10 flex items-center justify-center text-text-body transition-colors"

  return (
    <footer className="bg-surface border-t border-surface-mid">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-6">
        {/* 3-column grid: brand takes more space, links and contact share rest */}
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-16 lg:gap-24 mb-14">
          {/* Brand column */}
          <div>
            <img
              src={logo}
              alt={business.name}
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm text-text-body leading-relaxed max-w-[38ch]">
              Under Pressure Exterior Cleaning is dedicated to helping
              homeowners and businesses maintain beautiful, well-maintained
              properties with professional results you can see immediately.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href={business.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className={`${socialIconClassName} hover:bg-accent hover:text-white`}
                aria-label="Facebook"
              >
                <FacebookLogo size={18} weight="bold" />
              </a>
              <a
                href={business.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className={`${socialIconClassName} hover:bg-accent hover:text-white`}
                aria-label="Instagram"
              >
                <InstagramLogo size={18} weight="bold" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-text-primary uppercase tracking-tight mb-5">
              Quick Links
            </h4>
            <div className="space-y-3">
              {[
                { label: "Home", href: "#" },
                { label: "Services", href: "#services" },
                { label: "Case Studies", href: "#case-studies", className: "hidden md:block" },
                { label: "Reviews", href: "#reviews" },
                { label: "Contact Us", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`block text-sm text-text-body hover:text-accent transition-colors ${link.className ?? ""}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-display text-lg text-text-primary uppercase tracking-tight mb-5">
              Contact Information
            </h4>
            <div className="space-y-4">
              <a
                href={business.phoneHref}
                className="flex items-center gap-3 text-sm text-text-body hover:text-accent transition-colors"
              >
                <Phone size={18} weight="bold" className="text-accent shrink-0" />
                {business.phone}
              </a>
              <div className="flex items-start gap-3 text-sm text-text-body">
                <MapPin size={18} weight="bold" className="text-accent shrink-0 mt-0.5" />
                <span>
                  {business.serviceArea.join(" | ")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-mid pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {business.legalName}. All Rights
            Reserved.
          </p>
          <div className="flex items-center gap-4">
            {business.credentials.map((c) => (
              <span key={c} className="text-xs text-text-muted font-medium">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
