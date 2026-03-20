import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Stats from "./components/Stats"
import Services from "./components/Services"
import BeforeAfter from "./components/BeforeAfter"
import WhyUs from "./components/WhyUs"
import Reviews from "./components/Reviews"
import FAQ from "./components/FAQ"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import SchemaMarkup from "./components/SchemaMarkup"

function App() {
  return (
    <>
      <SchemaMarkup />
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <BeforeAfter />
      <WhyUs />
      <Reviews />
      <Contact />
      <FAQ />
      <Footer />
    </>
  )
}

export default App