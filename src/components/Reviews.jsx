import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, GoogleLogo, FacebookLogo, CaretLeft, CaretRight } from "@phosphor-icons/react"
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

// Desktop pages of 3
const desktopPages = []
for (let i = 0; i < allReviews.length; i += 3) {
  desktopPages.push(allReviews.slice(i, i + 3))
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

function ReviewCard({ review }) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <StarRow />
        <PlatformIcon platform={review.platform} />
      </div>
      <p className="text-text-light/85 leading-relaxed mb-4 italic">
        &ldquo;{review.text}&rdquo;
      </p>
      <p className="text-sm font-semibold text-white">
        {review.name}
      </p>
    </div>
  )
}

export default function Reviews() {
  const [desktopPage, setDesktopPage] = useState(0)
  const [mobileIdx, setMobileIdx] = useState(0)

  // Desktop auto-cycle (pages of 3)
  useEffect(() => {
    const timer = setInterval(() => {
      setDesktopPage((p) => (p + 1) % desktopPages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  // Mobile auto-cycle (individual reviews)
  useEffect(() => {
    const timer = setInterval(() => {
      setMobileIdx((p) => (p + 1) % allReviews.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  function mobilePrev() {
    setMobileIdx((p) => (p - 1 + allReviews.length) % allReviews.length)
  }
  function mobileNext() {
    setMobileIdx((p) => (p + 1) % allReviews.length)
  }

  return (
    <section id="reviews" className="py-24 bg-brand-dark">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">

        {/* ── Mobile layout ── */}
        <div className="md:hidden">
          {/* Mobile header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="text-center mb-8"
          >
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} weight="fill" className="text-yellow-400" />
              ))}
            </div>
            <div className="font-display text-5xl text-white tracking-tight mb-1">
              {business.reviews.count}+
            </div>
            <div className="text-text-muted text-base mb-4">
              Five-Star Reviews
            </div>
            <div className="flex justify-center gap-4 items-center text-text-muted">
              <div className="flex items-center gap-1.5">
                <GoogleLogo size={18} weight="bold" />
                <span className="text-sm font-medium">Google</span>
              </div>
              <div className="w-px h-4 bg-white/15" />
              <div className="flex items-center gap-1.5">
                <FacebookLogo size={18} weight="bold" />
                <span className="text-sm font-medium">Facebook</span>
              </div>
            </div>
          </motion.div>

          {/* Mobile carousel — single card with nav buttons */}
          <div className="relative">
            <button
              onClick={mobilePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Previous review"
            >
              <CaretLeft size={18} weight="bold" className="text-white" />
            </button>
            <button
              onClick={mobileNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Next review"
            >
              <CaretRight size={18} weight="bold" className="text-white" />
            </button>

            <div className="mx-6 min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileIdx}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <ReviewCard review={allReviews[mobileIdx]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 mt-6">
              {allReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIdx(i)}
                  aria-label={`Review ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === mobileIdx
                      ? "w-6 h-2 bg-accent"
                      : "w-2 h-2 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Desktop layout (unchanged) ── */}
        <div className="hidden md:grid md:grid-cols-5 gap-12 items-start">
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
            <div className="font-display text-8xl text-white tracking-tight mb-2">
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
          <div className="md:col-span-3 min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={desktopPage}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {desktopPages[desktopPage].map((review) => (
                  <ReviewCard key={review.name} review={review} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}
