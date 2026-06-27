import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Stories from './components/Stories'
import Programs from './components/Programs'
import Trainers from './components/Trainers'
import Locations from './components/Locations'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Privacy from './components/Privacy'
import Terms from './components/Terms'
import OfferSlideshow from './components/OfferSlideshow'
import OfferForm from './components/OfferForm'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import SelectBranch from './components/SelectBranch'

function App() {
  return (
    <BrowserRouter>
      <div className="bg-cream min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <OfferSlideshow />
              <Stats />
              <Stories />
              <Programs />
              <Trainers />
              <Locations />
              <FAQ />
              <CTA />
            </>
          } />
          <Route path="/offer/:id" element={<OfferForm />} />
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