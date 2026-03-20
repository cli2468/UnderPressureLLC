import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
} from "@phosphor-icons/react"
import { business } from "../data/siteData"
import reviewPhoto from "../assets/images/services/Main.jpg"

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

function formatReviewerName(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length < 2) return name
  return `${parts[0]} ${parts[parts.length - 1][0]}.`
}

function StarRow({ size = 16 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} weight="fill" className="text-yellow-400" />
      ))}
    </div>
  )
}

function BrandGoogleIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.65Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.07.72-2.44 1.15-4.07 1.15-3.13 0-5.78-2.12-6.73-4.97H1.27v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.27v-3.1H1.27A12 12 0 0 0 0 12c0 1.93.46 3.75 1.27 5.37l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.2 15.24 0 12 0A12 12 0 0 0 1.27 6.63l4 3.1c.95-2.85 3.6-4.96 6.73-4.96Z"
      />
    </svg>
  )
}

function BrandFacebookIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="#1877F2"
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.02 10.12 11.93v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07Z"
      />
    </svg>
  )
}

function PlatformIcon({ platform, size = 16 }) {
  if (platform === "google") {
    return <BrandGoogleIcon size={size} />
  }
  return <BrandFacebookIcon size={size} />
}

function MobileReviewCard({ review }) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col h-[320px]">
      <div className="flex items-center justify-between mb-4">
        <StarRow />
        <PlatformIcon platform={review.platform} />
      </div>
      <p className="text-text-light/85 leading-relaxed mb-4 italic review-text">
        &ldquo;{review.text}&rdquo;
      </p>
      <p className="text-sm font-semibold text-white mt-auto">{formatReviewerName(review.name)}</p>
    </div>
  )
}

export default function Reviews() {
  const [desktopPage, setDesktopPage] = useState(0)
  const [mobileIdx, setMobileIdx] = useState(0)
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false)
  const mobileTrackRef = useRef(null)

  const desktopPages = [
    [allReviews[0], allReviews[4], allReviews[8]],
    [allReviews[1], allReviews[3], allReviews[7]],
    [allReviews[5], allReviews[2], allReviews[6]],
  ]

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const timer = setInterval(() => {
      setDesktopPage((current) => (current + 1) % desktopPages.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [desktopPages.length, isMobile])

  function scrollToMobileReview(index) {
    const track = mobileTrackRef.current
    if (!track) return
    const card = track.children[index]
    if (!card) return
    card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }

  function handleMobileScroll(e) {
    const track = e.currentTarget
    const card = track.querySelector("[data-mobile-review-card]")
    if (!card) return
    const step = card.getBoundingClientRect().width + 16
    const nextIdx = Math.round(track.scrollLeft / step)
    setMobileIdx(Math.max(0, Math.min(allReviews.length - 1, nextIdx)))
  }

  return (
    <section id="reviews" className="py-24 bg-brand-dark">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="mb-8"
          >
            <div className="rounded-[28px] overflow-hidden border border-white/10 shadow-[0_18px_40px_rgba(8,15,28,0.35)] mb-6">
              <img
                src={reviewPhoto}
                alt="Under Pressure crew member pressure washing a home exterior"
                className="w-full h-[240px] object-cover object-center"
              />
            </div>

            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} weight="fill" className="text-yellow-400" />
              ))}
            </div>
            <div className="font-display text-5xl text-white tracking-tight text-center mb-1">
              {business.reviews.displayCount}
            </div>
            <div className="text-text-muted text-base text-center mb-4">Five-Star Reviews</div>
            <div className="flex justify-center gap-4 items-center text-text-muted">
              <div className="flex items-center gap-1.5">
                <BrandGoogleIcon size={18} />
                <span className="text-sm font-medium">Google</span>
              </div>
              <div className="w-px h-4 bg-white/15" />
              <div className="flex items-center gap-1.5">
                <BrandFacebookIcon size={18} />
                <span className="text-sm font-medium">Facebook</span>
              </div>
            </div>
          </motion.div>

          <div>
            <div
              ref={mobileTrackRef}
              onScroll={handleMobileScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 -mx-6 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {allReviews.map((review) => (
                <div
                  key={review.name}
                  data-mobile-review-card
                  className="snap-center shrink-0 w-[calc(100%-3rem)]"
                >
                  <MobileReviewCard review={review} />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-1.5 mt-6">
              {allReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToMobileReview(i)}
                  aria-label={`Review ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${i === mobileIdx ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-white/20"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="md:col-span-2 sticky top-32"
          >
            <div className="rounded-[28px] overflow-hidden border border-white/10 shadow-[0_18px_40px_rgba(8,15,28,0.35)] mb-6">
              <img
                src={reviewPhoto}
                alt="Under Pressure crew member pressure washing a home exterior"
                className="w-full h-[480px] object-cover object-center"
              />
            </div>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={28} weight="fill" className="text-yellow-400" />
              ))}
            </div>
            <div className="font-display text-8xl text-white tracking-tight mb-2">
              {business.reviews.displayCount}
            </div>
            <div className="text-text-muted text-lg mb-8">Five-Star Reviews</div>
            <div className="flex gap-5 items-center text-text-muted mb-10">
              <div className="flex items-center gap-2">
                <BrandGoogleIcon size={22} />
                <span className="text-sm font-medium">Google</span>
              </div>
              <div className="w-px h-5 bg-white/15" />
              <div className="flex items-center gap-2">
                <BrandFacebookIcon size={22} />
                <span className="text-sm font-medium">Facebook</span>
              </div>
            </div>
          </motion.div>

          <div className="md:col-span-3 min-h-[560px]">
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
                  <article
                    key={review.name}
                    className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 h-[235px] flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <StarRow />
                      <PlatformIcon platform={review.platform} />
                    </div>
                    <p className="text-text-light/85 leading-relaxed mb-4 italic">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <p className="text-sm font-semibold text-white mt-auto">
                      {formatReviewerName(review.name)}
                    </p>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
