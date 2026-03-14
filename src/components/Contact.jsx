import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, CheckCircle, ShieldCheck } from "@phosphor-icons/react"
import { business, formFields } from "../data/siteData"

const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID"
const spring = { type: "spring", stiffness: 100, damping: 20 }

const serviceCities = [
  "Valparaiso",
  "Chesterton",
  "Portage",
  "Michigan City",
  "La Porte",
  "Crown Point",
  "Merrillville",
  "Hobart",
  "Schererville",
  "St. John",
  "Wanatah",
  "New Buffalo",
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    const data = new FormData(e.target)
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
      if (res.ok) setSubmitted(true)
    } finally {
      setSending(false)
    }
  }

  const citiesBlock = (
    <div className="rounded-2xl border border-surface-mid bg-white p-5">
      <p className="text-xs uppercase tracking-[0.14em] text-text-muted mb-3">Popular Cities We Serve</p>
      <div className="flex flex-wrap gap-2">
        {serviceCities.map((city) => (
          <span
            key={city}
            className="text-xs font-semibold text-text-primary bg-surface px-3 py-1.5 rounded-full border border-surface-mid"
          >
            {city}
          </span>
        ))}
      </div>
      <p className="text-xs text-text-muted mt-3">
        Don&apos;t see your city listed? Call us anyway and we&apos;ll confirm service availability.
      </p>
    </div>
  )

  return (
    <section id="contact" className="relative py-24 bg-surface overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-12 w-80 h-80 rounded-full bg-brand-dark/8 blur-3xl" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-5 gap-6 md:gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <div className="w-10 h-1 bg-accent rounded-full mb-4" />
              <h2 className="font-display text-3xl md:text-5xl tracking-tight text-text-primary uppercase mb-4">
                Get Your Free Estimate
              </h2>
              <p className="text-text-body leading-relaxed max-w-[45ch]">
                Under Pressure Exterior Cleaning provides fast responses, clear and detailed quotes, and realistic scheduling timelines. Our team is always available to answer any questions, explain our process, and ensure you have complete confidence before moving forward with your project.
              </p>
            </div>

            <a
              href={business.phoneHref}
              className="flex items-center gap-4 p-5 rounded-2xl bg-accent text-white shadow-[0_14px_35px_rgba(8,145,178,0.25)] hover:bg-accent-light hover:text-brand-dark transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Phone size={22} weight="bold" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-white/80">
                  Call or Text
                </div>
                <div className="font-semibold text-lg">{business.phone}</div>
              </div>
            </a>

            <div className="hidden lg:block">
              {citiesBlock}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-[28px] border border-white/80 bg-white/90 backdrop-blur-sm shadow-[0_24px_60px_rgba(26,35,50,0.14)] p-6 md:p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center p-6 md:p-10 rounded-2xl bg-surface border border-surface-mid">
                  <CheckCircle size={56} className="text-accent mb-4" weight="duotone" />
                  <h3 className="font-semibold text-text-primary text-xl mb-2">Message Sent</h3>
                  <p className="text-text-body">
                    We will get back to you shortly. You can also reach us at{" "}
                    <a href={business.phoneHref} className="font-semibold text-accent underline">
                      {business.phone}
                    </a>
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 md:mb-8">
                    <div>
                      <h3 className="font-display text-2xl md:text-4xl tracking-tight text-text-primary uppercase mb-2">
                        Request Your Estimate
                      </h3>
                      <p className="text-text-body">
                        Fill out the form and we will follow up quickly.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] bg-brand-dark/5 text-brand-dark px-3 py-2 rounded-full border border-brand-dark/10">
                      <ShieldCheck size={16} weight="bold" />
                      Licensed | Bonded | Insured
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
                    {formFields.map((field) => {
                      const base =
                        "w-full px-4 py-3.5 rounded-xl border border-surface-mid bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent text-text-primary transition-all duration-200"

                      if (field.type === "select") {
                        return (
                          <div key={field.name} className="md:col-span-1">
                            <label className="block text-sm font-medium text-text-body mb-1.5">
                              {field.label}
                            </label>
                            <select name={field.name} required={field.required} className={base}>
                              <option value="">Select a service</option>
                              {field.options.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </div>
                        )
                      }

                      if (field.type === "textarea") {
                        return (
                          <div key={field.name} className="md:col-span-2">
                            <label className="block text-sm font-medium text-text-body mb-1.5">
                              {field.label}
                            </label>
                            <textarea
                              name={field.name}
                              rows={5}
                              required={field.required}
                              className={`${base} resize-none`}
                            />
                          </div>
                        )
                      }

                      return (
                        <div key={field.name} className="md:col-span-1">
                          <label className="block text-sm font-medium text-text-body mb-1.5">
                            {field.label}
                            {field.required && <span className="text-accent ml-1">*</span>}
                          </label>
                          <input type={field.type} name={field.name} required={field.required} className={base} />
                        </div>
                      )
                    })}

                    <button
                      type="submit"
                      disabled={sending}
                      className="md:col-span-2 w-full bg-accent hover:bg-accent-light text-white hover:text-brand-dark font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 text-lg active:scale-[0.98]"
                    >
                      {sending ? "Sending..." : "Request Free Estimate"}
                    </button>
                  </form>

                  <div className="mt-6 lg:hidden">
                    {citiesBlock}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
