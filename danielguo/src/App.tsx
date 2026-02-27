import { useState, useEffect, useCallback } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import CybernewsSection from '@/components/sections/CybernewsSection'
import CertificationsSection from '@/components/sections/CertificationsSection'
import ActivitiesSection from '@/components/sections/ActivitiesSection'
import ContactSection from '@/components/sections/ContactSection'
import { type DetailItem } from '@/data/portfolio'
import PopupCard from '@/components/ui/PopupCard'
import NetworkNodesBackground from './components/ui/NetworkNodeBackground'
import GlitchHeading from '@/components/ui/GlitchEffect'
// import SplashIntro from '@/components/ui/LoginFeature'
import ScrollReveal from '@/components/ui/ScrollingAnimation'
import { useLocation } from "react-router-dom"
import BootScreen from '@/components/ui/BootScreen'

type Phase = "boot" | "splash" | "app"

function App() {
  const alreadyLoggedIn = !!sessionStorage.getItem('hasLoggedIn')

  // Skip boot+splash entirely for returning visitors
  const [phase, setPhase] = useState<Phase>(alreadyLoggedIn ? "app" : "boot")
  const [activeItem, setActiveItem] = useState<DetailItem | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const location = useLocation()
  const handleBootDone = useCallback(() => setPhase("splash"), [])


  // Separate component handles boot so it unmounts cleanly after 5s
  // This avoids StrictMode timer issues entirely
  const openItem = (item: DetailItem) => {
    setIsClosing(false)
    setActiveItem(item)
  }

  useEffect(() => {
    if (!activeItem) return

    const preventScroll = (e: TouchEvent) => e.preventDefault()
    
    document.body.style.overflow = 'hidden'
    document.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('touchmove', preventScroll)
    }
  }, [activeItem])

  useEffect(() => {
    // Wait for DOM update after route change
    if (location.hash) {
      const scrollToHash = () => {
        const element = document.querySelector(location.hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
      // Try immediately, then again after a short delay
      scrollToHash()
      setTimeout(scrollToHash, 350)
    }
  }, [location.pathname, location.hash])

  const closeModal = () => {
    if (!activeItem || isClosing) return
    setIsClosing(true)
    window.setTimeout(() => {
      setActiveItem(null)
      setIsClosing(false)
    }, 200)
  }

  // ── boot ────────────────────────────────────────────────────────────────────

  if (phase === "boot") {
    return <BootScreen onDone={handleBootDone} />
  }

  // ── splash / login ──────────────────────────────────────────────────────────
  // if (phase === "splash") {
  //   return (
  //     <SplashIntro
  //       onFinish={() => {
  //         sessionStorage.setItem('hasLoggedIn', 'true')
  //         setPhase("app")
  //       }}
  //     />
  //   )
  // }

  // ── main app ────────────────────────────────────────────────────────────────
  return (
    <>
      <NetworkNodesBackground />
      <div className="flex min-h-screen w-full flex-col overflow-x-hidden scroll-smooth relative">
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">
          <GlitchHeading />
        </div>

        <main className="w-full flex-1" style={{ paddingTop: 'var(--navbar-height)' }}>
          <div className="mx-auto w-full max-w-6xl px-6 py-10 text-center">
            <ScrollReveal><HeroSection /></ScrollReveal>
            <ScrollReveal delay={100}><AboutSection /></ScrollReveal>
            <ScrollReveal delay={200}><ProjectsSection onOpen={openItem} /></ScrollReveal>
            <ScrollReveal delay={300}><ExperienceSection /></ScrollReveal>
            <ScrollReveal delay={400}><CertificationsSection onOpen={openItem} /></ScrollReveal>
            <ScrollReveal delay={450}><ActivitiesSection onOpen={openItem} /></ScrollReveal>
            <ScrollReveal delay={500}><CybernewsSection onOpen={openItem} /></ScrollReveal>
            <ScrollReveal delay={550}><ContactSection /></ScrollReveal>
          </div>
        </main>

        {activeItem && (
          <PopupCard item={activeItem} isClosing={isClosing} onClose={closeModal} />
        )}

        <Footer />
      </div>
    </>
  )
}

export default App