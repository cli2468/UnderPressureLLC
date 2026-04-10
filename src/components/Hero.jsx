import { Phone, ArrowRight } from "@phosphor-icons/react"
import { business } from "../data/siteData"

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[100svh] overflow-hidden bg-brand-dark md:h-auto md:min-h-[95dvh] lg:min-h-[94dvh]">
      <div className="absolute inset-0">
        <img
          src="/hero-home.jpg"
          alt="Freshly cleaned residential driveway and home exterior"
          className="h-full w-full object-cover object-center md:object-[center_25%]"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/90 via-brand-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark/30" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-6 md:min-h-[95dvh] md:px-10 lg:min-h-[94dvh] lg:px-16">
        <div className="max-w-xl pb-12 pt-28 md:py-0 lg:pt-24 xl:pt-28">
          <h1 className="hero-reveal mb-6 font-display text-[4.2rem] leading-[0.9] tracking-tight text-white uppercase md:text-7xl">
            Exterior Cleaning,
            <span className="mt-2 block text-accent-light">Done Right.</span>
          </h1>

          <p className="hero-reveal hero-reveal-delay-1 mb-10 max-w-[44ch] text-base leading-relaxed text-white/88 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] md:text-lg">
            Your trusted choice for professional pressure washing and soft washing. We safely restore homes and businesses with industry-leading equipment and results you can see instantly.
          </p>

          <div className="hero-reveal hero-reveal-delay-2 flex flex-col gap-4 sm:flex-row">
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-lg font-bold text-white shadow-[0_8px_30px_rgba(8,145,178,0.3)] transition-[background-color,color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-accent-light hover:text-brand-dark active:scale-[0.98]"
            >
              <Phone size={22} weight="bold" />
              Call {business.phone}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 px-8 py-4 text-lg font-semibold text-white transition-[border-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-accent/50 active:scale-[0.98]"
            >
              Free Estimate
              <ArrowRight size={20} weight="bold" />
            </a>
          </div>

          <div className="hero-reveal hero-reveal-delay-3 mt-12">
            <span className="inline-flex max-w-full items-center whitespace-nowrap rounded-full border border-accent/30 px-3 py-1.5 text-[9px] font-semibold leading-tight uppercase tracking-[0.14em] min-[390px]:text-[10px] sm:text-xs sm:tracking-widest">
              <span className="text-accent-light">Business of the Month</span>
              <span className="text-white"> - NWI Life in the Spotlight</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
