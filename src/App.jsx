import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Stories from './components/Stories'
import Programs from './components/Programs'
import AllPrograms from './components/AllPrograms'
import Locations from './components/Locations'
import AllLocations from './components/AllLocations'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Privacy from './components/Privacy'
import Terms from './components/Terms'
import About from './components/About'
import Contact from './components/Contact'
import OfferSlideshow from './components/OfferSlideshow'
import OfferForm from './components/OfferForm'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import SelectBranch from './components/SelectBranch'
import Owner from './components/Owner'
import Transformation from './components/Transformation'
import ScrollToTop from './components/ScrollToTop'
import { trackPageVisit } from './lib/tracking'

function App() {
  useEffect(() => {
    trackPageVisit()
  }, [])

  return (
    <BrowserRouter>
      <div className="bg-cream min-h-screen">
        <Navbar />
        <ScrollToTop />
        <Analytics />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <OfferSlideshow />
              <Stats />
              <Stories />
              <Programs />
              <Locations />
              <FAQ />
              <CTA />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/transformation" element={<Transformation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/programs" element={<AllPrograms />} />
          <Route path="/locations" element={<AllLocations />} />
          <Route path="/offer" element={<OfferForm />} />
          <Route path="/select-branch" element={<SelectBranch />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App