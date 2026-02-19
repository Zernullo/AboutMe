// Main application component that serves as the root component for the entire application
// Contains the main layout and routing logic for the portfolio website

import { useState } from 'react'
// import Layout from '@/components/layout/Layout'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import CybernewsSection from '@/components/sections/CybernewsSection'
import CertificationsSection from '@/components/sections/CertificationsSection'
import ActivitiesSection from '@/components/sections/ActivitiesSection'
import ContactSection from '@/components/sections/ContactSection'
import { type DetailItem } from '@/data/portfolio'

function App() {
  const [activeItem, setActiveItem] = useState<DetailItem | null>(null)
  const [isClosing, setIsClosing] = useState(false)

  const openItem = (item: DetailItem) => {
    setIsClosing(false)
    setActiveItem(item)
  }

  const closeModal = () => {
    if (!activeItem || isClosing) {
      return
    }
    setIsClosing(true)
    window.setTimeout(() => {
      setActiveItem(null)
      setIsClosing(false)
    }, 200)
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />
      <main className="w-full flex-1 pt-24">
        <div className="mx-auto w-full max-w-6xl px-6 py-10 text-center">
          <HeroSection />
          <AboutSection />
          <ProjectsSection onOpen={openItem} />
          <CybernewsSection onOpen={openItem} />
          <CertificationsSection onOpen={openItem} />
          <ActivitiesSection onOpen={openItem} />
          <ContactSection />
        </div>
      </main>
      {activeItem && (
        <div
          className={`${isClosing ? 'animate-modal-overlay-out' : 'animate-modal-overlay'} fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4`}
          onClick={closeModal}
        >
          <div
            className={`${isClosing ? 'animate-modal-panel-out' : 'animate-modal-panel'} w-full max-w-lg rounded border border-[#333] bg-[#1a1a1a] p-6 text-left shadow-[0_0_22px_rgba(255,255,255,0.2)]`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-[#e0e0e0]">{activeItem.title}</h3>
                {activeItem.meta && <p className="mt-1 text-sm text-[#888888]">{activeItem.meta}</p>}
              </div>
              <button
                type="button"
                className="text-[#888888] hover:text-[#00ff41]"
                onClick={closeModal}
                aria-label="Close details"
              >
                ✕
              </button>
            </div>
            <p className="mt-4 text-sm text-[#e0e0e0]">{activeItem.details}</p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default App
