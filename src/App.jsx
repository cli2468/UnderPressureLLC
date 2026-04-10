import { lazy } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Stats from "./components/Stats"
import DeferredSection from "./components/DeferredSection"
import SchemaMarkup from "./components/SchemaMarkup"

const Services = lazy(() => import("./components/Services"))
const BeforeAfter = lazy(() => import("./components/BeforeAfter"))
const WhyUs = lazy(() => import("./components/WhyUs"))
const Reviews = lazy(() => import("./components/Reviews"))
const Contact = lazy(() => import("./components/Contact"))
const FAQ = lazy(() => import("./components/FAQ"))
const Footer = lazy(() => import("./components/Footer"))

function App() {
  return (
    <>
      <SchemaMarkup />
      <Navbar />
      <Hero />
      <Stats />
      <DeferredSection anchorId="services" placeholderClassName="min-h-[42rem] bg-white py-24">
        <Services />
      </DeferredSection>
      <DeferredSection anchorId="case-studies" placeholderClassName="hidden min-h-[38rem] bg-surface-mid/30 py-24 md:block">
        <BeforeAfter />
      </DeferredSection>
      <DeferredSection anchorId="about" placeholderClassName="min-h-[48rem] bg-surface-mid/30 py-24 md:bg-white">
        <WhyUs />
      </DeferredSection>
      <DeferredSection anchorId="reviews" placeholderClassName="min-h-[48rem] bg-brand-dark py-24">
        <Reviews />
      </DeferredSection>
      <DeferredSection anchorId="contact" placeholderClassName="min-h-[56rem] bg-surface py-24">
        <Contact />
      </DeferredSection>
      <DeferredSection anchorId="faq" placeholderClassName="min-h-[40rem] bg-white py-24">
        <FAQ />
      </DeferredSection>
      <DeferredSection placeholderClassName="min-h-[20rem] border-t border-surface-mid bg-surface">
        <Footer />
      </DeferredSection>
    </>
  )
}

export default App
