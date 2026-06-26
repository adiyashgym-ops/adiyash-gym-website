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

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Stories />
      <Programs />
      <Trainers />
      <Locations />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}

export default App