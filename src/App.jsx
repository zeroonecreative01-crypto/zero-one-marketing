import Navigation from './components/Navigation.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import ZeroToOne from './components/ZeroToOne.jsx'
import Results from './components/Results.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import useMotionSystem from './hooks/useMotionSystem.js'

const whatsappUrl = 'https://wa.me/201556764804?text=' + encodeURIComponent('أهلًا Zero One، حابب أتكلم معاكم عن مشروع جديد.')

function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true"><span /></div>
}

export default function App() {
  useMotionSystem()

  return (
    <div className="site-shell">
      <ScrollProgress />
      <CustomCursor />
      <Navigation whatsappUrl={whatsappUrl} />
      <main>
        <Hero whatsappUrl={whatsappUrl} />
        <Services whatsappUrl={whatsappUrl} />
        <Work />
        <About />
        <ZeroToOne />
        <Results />
        <Contact whatsappUrl={whatsappUrl} />
      </main>
      <Footer whatsappUrl={whatsappUrl} />
    </div>
  )
}
