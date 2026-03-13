import { motion } from "framer-motion"
import { Star, GoogleLogo, FacebookLogo } from "@phosphor-icons/react"
import { business } from "../data/siteData"

const spring = { type: "spring", stiffness: 100, damping: 20 }

// Replace these with real customer reviews
const reviews = [
  {
    name: "Customer Name",
    platform: "google",
    text: "Paste the customer's review here. Keep it to 2-3 sentences for the best layout.",
  },
  {
    name: "Customer Name",
    platform: "facebook",
    text: "Paste the customer's review here. Keep it to 2-3 sentences for the best layout.",
  },
  {
    name: "Customer Name",
    platform: "google",
    text: "Paste the customer's review here. Keep it to 2-3 sentences for the best layout.",
  },
]

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} weight="fill" className="text-yellow-400" />
      ))}
    </div>
  )
}

function PlatformIcon({ platform }) {
  if (platform === "google") {
    return <GoogleLogo size={16} weight="bold" className="text-text-muted" />
  }
  return <FacebookLogo size={16} weight="bold" className="text-text-muted" />
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-brand-dark">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Left — big number + stars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="md:col-span-2 md:sticky md:top-32"
          >
            <p className="text-sm text-text-muted uppercase tracking-widest mb-3">
              What Our Customers Say
            </p>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={28}
                  weight="fill"
                  className="text-yellow-400"
                />
              ))}
            </div>
            <div className="font-display text-6xl md:text-8xl text-white tracking-tight mb-2">
              {business.reviews.count}+
            </div>
            <div className="text-text-muted text-lg mb-6">
              Five-Star Reviews
            </div>
            <div className="flex gap-5 items-center text-text-muted">
              <div className="flex items-center gap-2">
                <GoogleLogo size={22} weight="bold" />
                <span className="text-sm font-medium">Google</span>
              </div>
              <div className="w-px h-5 bg-white/15" />
              <div className="flex items-center gap-2">
                <FacebookLogo size={22} weight="bold" />
                <span className="text-sm font-medium">Facebook</span>
              </div>
            </div>
          </motion.div>

          {/* Right — review cards */}
          <div className="md:col-span-3 space-y-5">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <StarRow />
                  <PlatformIcon platform={review.platform} />
                </div>
                <p className="text-text-light/85 leading-relaxed mb-4 italic">
                  "{review.text}"
                </p>
                <p className="text-sm font-semibold text-white">
                  {review.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
