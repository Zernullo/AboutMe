import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import CybernewsSection from '@/components/sections/CybernewsSection'
import CredentialsSection from '@/components/sections/CredentialsSection'
import ContactSection from '@/components/sections/ContactSection'
import { type DetailItem } from '@/data/portfolio'
import PopupCard from '@/components/ui/PopupCard'
import NetworkNodesBackground from './components/ui/NetworkNodeBackground'
import ScrollReveal from '@/components/ui/ScrollingAnimation'
import { useLocation } from "react-router-dom"
import BootScreen from '@/components/ui/BootScreen'
import EducationSection from './components/sections/EducationSection'

type Phase = "boot" | "app"

function App() {
  const alreadyBooted = typeof window !== 'undefined' && sessionStorage.getItem('hasBooted') === 'true'

  // Skip boot screen for returning visitors in current session
  const [phase, setPhase] = useState<Phase>(alreadyBooted ? "app" : "boot")
  const [activeItem, setActiveItem] = useState<DetailItem | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const location = useLocation()

  const handleBootDone = () => {
    sessionStorage.setItem('hasBooted', 'true')
    setPhase("app")
  }

  const openItem = (item: DetailItem) => {
    setIsClosing(false)
    setActiveItem(item)
  }

  useEffect(() => {
    // Wait for DOM update after route, hash, or phase change
    if (phase === 'app' && location.hash) {
      const id = location.hash.replace('#', '')
      const scrollToHash = () => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
      scrollToHash()
      const t = setTimeout(scrollToHash, 250)
      return () => clearTimeout(t)
    }
  }, [location.pathname, location.hash, phase])

  const closeModal = () => {
    if (!activeItem || isClosing) return
    setIsClosing(true)
    window.setTimeout(() => {
      setActiveItem(null)
      setIsClosing(false)
    }, 200)
  }

  if (phase === "boot") {
    return <BootScreen onDone={handleBootDone} />
  }

  return (
    <>
      <NetworkNodesBackground />
      <div className="flex min-h-screen w-full flex-col overflow-x-hidden scroll-smooth relative">
        <Navbar />

        <main className="w-full flex-1" style={{ paddingTop: 'var(--navbar-height)' }}>
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-6 text-center">
            <HeroSection />
            <ScrollReveal><AboutSection /></ScrollReveal>
            <ScrollReveal><EducationSection /></ScrollReveal>
            <ScrollReveal><ExperienceSection /></ScrollReveal>
            <ScrollReveal><ProjectsSection onOpen={openItem} /></ScrollReveal>
            <ScrollReveal><CredentialsSection onOpen={openItem} /></ScrollReveal>
            <ScrollReveal><CybernewsSection onOpen={openItem} /></ScrollReveal>
            <ScrollReveal><ContactSection /></ScrollReveal>
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
