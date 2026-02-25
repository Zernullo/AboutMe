import { useState, useEffect } from 'react'
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
import NetworkNodesBackground from './components/ui/NetworkNodeBackground'
import GlitchHeading from './components/ui/GlitchEffect'
import SplashIntro from '@/components/ui/SplashIntro'

function App() {
  const [activeItem, setActiveItem] = useState<DetailItem | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  const openItem = (item: DetailItem) => {
    setIsClosing(false)
    setActiveItem(item)
  }

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [activeItem])

  const closeModal = () => {
    if (!activeItem || isClosing) return

    setIsClosing(true)

    window.setTimeout(() => {
      setActiveItem(null)
      setIsClosing(false)
    }, 200)
  }

  return (
    <>
      {/* Splash Screen */}
      {showSplash && (
        <SplashIntro onFinish={() => setShowSplash(false)} />
      )}

      {/* Main App */}
      {!showSplash && (
        <>
        <NetworkNodesBackground />
        <div className="flex min-h-screen w-full flex-col overflow-x-hidden scroll-smooth relative z-10">
          <Navbar />

          {/* Glitch Hero */}
          <div className="min-h-screen  -color flex items-center justify-center">
            <GlitchHeading />
          </div>

          {/* Main Content */}
          <main className="w-full flex-1 pt-24">
            <div className="mx-auto w-full max-w-6xl px-6 py-10 text-center">
              <HeroSection />
              <AboutSection />
              <ProjectsSection onOpen={openItem} />
              <ExperienceSection />
              <CertificationsSection onOpen={openItem} />
              <ActivitiesSection onOpen={openItem} />
              <CybernewsSection onOpen={openItem} />
              <ContactSection />
            </div>
          </main>

          {/* Modal */}
          {activeItem && (
            <div
              className={`${
                isClosing
                  ? 'animate-modal-overlay-out'
                  : 'animate-modal-overlay'
              } fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4`}
              onClick={closeModal}
            >
              <div
                className={`${
                  isClosing
                    ? 'animate-modal-panel-out'
                    : 'animate-modal-panel'
                } relative w-full max-w-2xl text-left`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Outer Border */}
                <div className="absolute -inset-px rounded border border-[#444]" />

                {/* Panel */}
                <div className="relative rounded bg-[#1a1a1a] p-8 shadow-[0_0_22px_rgba(255,255,255,0.08)] max-h-[70vh] overflow-y-auto">

                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-3 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00ff41] shadow-[0_0_6px_#00ff41]" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#888888]">
                        INTEL REPORT
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex h-6 w-6 items-center justify-center rounded border border-[#333] text-xs text-[#888888] transition hover:border-[#e0e0e0]/40 hover:text-[#e0e0e0]"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#e0e0e0]">
                    {activeItem.title}
                  </h3>

                  {/* Meta */}
                  {activeItem.meta && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-px flex-1 bg-[#2a2a2a]" />
                      <p className="text-[11px] font-mono uppercase tracking-widest text-[#888888]">
                        {activeItem.meta}
                      </p>
                      <span className="h-px flex-1 bg-[#2a2a2a]" />
                    </div>
                  )}

                  {/* Details */}
                  <div className="mt-4 space-y-3">
                    <p className="text-sm leading-relaxed text-[#e0e0e0]">
                      {activeItem.details.split('\nRead more at: ')[0]}
                    </p>
                  </div>

                  {/* Image */}
                  {activeItem.image && (
                    <div className="mt-4">
                      <img
                        src={activeItem.image}
                        alt={activeItem.title}
                        className="w-full rounded border border-[#333] object-cover"
                      />
                    </div>
                  )}

                  {/* Bottom Bar */}
                  <div className="mt-6 flex items-center justify-between border-t border-[#2a2a2a] pt-3">
                    {activeItem.details.includes('\nRead more at: ') && (
                      <a
                        href={activeItem.details.split('\nRead more at: ')[1]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[#00ff41]/60 hover:text-[#00ff41]"
                      >
                        READ MORE →
                      </a>
                    )}

                    <button
                      onClick={closeModal}
                      className="text-[11px] font-mono uppercase tracking-widest text-[#00ff41] hover:text-[#00ff41]/60"
                    >
                      [ CLOSE ]
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Footer />
        </div>
        </>
      )}
    </>
  )
}

export default App