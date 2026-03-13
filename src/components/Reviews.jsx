import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, GoogleLogo, FacebookLogo } from "@phosphor-icons/react"
import { business } from "../data/siteData"

const spring = { type: "spring", stiffness: 100, damping: 20 }

const allReviews = [
  {
    name: "Locas Liam",
    platform: "google",
    text: "I can't say enough good things about Under Pressure Exterior Cleaning. From start to finish the experience was amazing. The team arrived on time, paid great attention to detail, and made sure everything was done perfectly. The quality of their work exceeded my expectations and the finished results look incredible.",
  },
  {
    name: "Jim Jessup",
    platform: "google",
    text: "Trey and his partner did a great job pressure washing our vinyl siding and decking. They got rid of 35 years of green algae and grime and it looks like new. Trey had great equipment and was efficient and professional. I highly recommend his business and service.",
  },
  {
    name: "Christy Robinson",
    platform: "google",
    text: "We will definitely be repeat customers. Very professional and fast service. I didn't think some of the staining would come off our white siding, but everything came out including the chimney staining. Very affordable for high quality work.",
  },
  {
    name: "Mary Cee",
    platform: "facebook",
    text: "I was overwhelmed with cleaning up my neglected home after renters moved out. Trey kept me updated every step of the way and the results amazed me. My home and yard look brand new. I will definitely recommend them to anyone who needs work done.",
  },
  {
    name: "Theresa Mattox McArdle",
    platform: "facebook",
    text: "Highly recommend. They cleaned my two story house, garage, storage shed, and entire fence. Trey is very professional, quick with service, and very fairly priced. I will definitely use them again.",
  },
  {
    name: "Austin Coleslaw Michaels",
    platform: "google",
    text: "They knocked it out of the park at our house in Wanatah. They took an old modular home and outbuildings and made them look almost new again. They worked with me through several issues on my end and still delivered better results than I imagined.",
  },
  {
    name: "Peter Steinhiser",
    platform: "google",
    text: "The team did a great job cleaning my siding. They explained the process and the products they used, and the results turned out great.",
  },
  {
    name: "Shawn Sullivan",
    platform: "google",
    text: "These guys do a great job and communicate well. Very reliable with great pricing.",
  },
  {
    name: "Tammy Krueger",
    platform: "facebook",
    text: "What a great job. Very courteous and professional. I would absolutely recommend them.",
  },
]

const pages = []
for (let i = 0; i < allReviews.length; i += 3) {
  pages.push(allReviews.slice(i, i + 3))
}

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
  const [activePage, setActivePage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePage((p) => (p + 1) % pages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

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
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={28} weight="fill" className="text-yellow-400" />
              ))}
            </div>
            <div className="font-display text-6xl md:text-8xl text-white tracking-tight mb-2">
              {business.reviews.count}+
            </div>
            <div className="text-text-muted text-lg mb-6">
              Five-Star Reviews
            </div>
            <div className="flex gap-5 items-center text-text-muted mb-10">
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
          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {pages[activePage].map((review, i) => (
                  <div
                    key={review.name}
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
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
