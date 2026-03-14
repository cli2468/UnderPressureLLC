import { Certificate, ShieldCheck, Handshake, Star } from "@phosphor-icons/react"

const items = [
  { label: "Licensed", icon: Certificate },
  { label: "Bonded", icon: Handshake },
  { label: "Insured", icon: ShieldCheck },
]

const segmentItems = [...items, ...items, ...items, ...items]

export default function Stats() {
  return (
    <section className="relative bg-brand-dark border-y border-white/10 py-4 md:py-5 overflow-hidden">
      <div className="marquee-track [--marquee-duration:20s] md:[--marquee-duration:24s]">
        {[0, 1].map((segment) => (
          <div key={segment} className="marquee-segment" aria-hidden={segment === 1}>
            {segmentItems.map((item, i) => {
              const Icon = item.icon
              return (
                <span key={`${segment}-${item.label}-${i}`} className="flex items-center">
                  <Star size={28} weight="fill" className="text-accent mx-10 md:mx-14" />
                  <span className="flex items-center gap-4">
                    <Icon size={48} weight="duotone" className="text-accent-light" />
                    <span className="font-display text-4xl md:text-6xl uppercase tracking-wide text-white">
                      {item.label}
                    </span>
                  </span>
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
