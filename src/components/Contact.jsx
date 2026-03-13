import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, MapPin, EnvelopeSimple, CheckCircle } from "@phosphor-icons/react"
import { business, formFields } from "../data/siteData"

const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID"
const spring = { type: "spring", stiffness: 100, damping: 20 }

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

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left column — info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="lg:col-span-2"
          >
            <h2 className="font-display text-3xl md:text-5xl tracking-tight text-text-primary uppercase mb-4">
              Get Your Free Estimate
            </h2>
            <p className="text-text-body leading-relaxed max-w-[45ch] mb-10">
              Call us directly or fill out the form. We respond fast with a
              clear, honest quote — no surprises.
            </p>

            <div className="space-y-4">
              <a
                href={business.phoneHref}
                className="flex items-center gap-4 p-4 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors group"
              >
                <div className="w-11 h-11 bg-accent/15 rounded-xl flex items-center justify-center group-hover:bg-accent/25 transition-colors">
                  <Phone size={22} className="text-accent" weight="bold" />
                </div>
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wide">
                    Call or Text
                  </div>
                  <div className="font-semibold text-text-primary">
                    {business.phone}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4">
                <div className="w-11 h-11 bg-brand-dark/5 rounded-xl flex items-center justify-center">
                  <MapPin
                    size={22}
                    className="text-brand-dark"
                    weight="bold"
                  />
                </div>
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wide">
                    Serving
                  </div>
                  <div className="text-sm font-medium text-text-primary">
                    {business.serviceArea.join(" | ")}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.15 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center p-12 rounded-2xl bg-surface border border-surface-mid">
                <CheckCircle
                  size={56}
                  className="text-accent mb-4"
                  weight="duotone"
                />
                <h3 className="font-semibold text-text-primary text-xl mb-2">
                  Message Sent
                </h3>
                <p className="text-text-body">
                  We will get back to you shortly. You can also reach us at{" "}
                  <a
                    href={business.phoneHref}
                    className="font-semibold text-accent underline"
                  >
                    {business.phone}
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {formFields.map((field) => {
                  const base =
                    "w-full px-4 py-3.5 rounded-xl border border-surface-mid bg-surface focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent text-text-primary transition-all duration-200"

                  if (field.type === "select") {
                    return (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-text-body mb-1.5">
                          {field.label}
                        </label>
                        <select
                          name={field.name}
                          required={field.required}
                          className={base}
                        >
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
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-text-body mb-1.5">
                          {field.label}
                        </label>
                        <textarea
                          name={field.name}
                          rows={4}
                          required={field.required}
                          className={`${base} resize-none`}
                        />
                      </div>
                    )
                  }
                  return (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-text-body mb-1.5">
                        {field.label}
                        {field.required && (
                          <span className="text-accent ml-1">*</span>
                        )}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        className={base}
                      />
                    </div>
                  )
                })}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-accent hover:bg-accent-light text-white hover:text-brand-dark font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 text-lg active:scale-[0.98]"
                >
                  {sending ? "Sending..." : "Request Free Estimate"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}