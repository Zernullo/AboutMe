import { useState } from 'react'
import { projectCards, type DetailItem } from '@/data/portfolio'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MatrixRain from '@/components/ui/MatrixRainAnimation'
import PopupCard from '@/components/ui/PopupCard'

function ProjectsPage() {
  const [activeItem, setActiveItem] = useState<DetailItem | null>(null)
  const [isClosing, setIsClosing] = useState(false)

  const openItem = (item: DetailItem) => {
    setIsClosing(false)
    setActiveItem(item)
  }

  const closeModal = () => {
    if (!activeItem || isClosing) return
    setIsClosing(true)
    setTimeout(() => {
      setActiveItem(null)
      setIsClosing(false)
    }, 200)
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#111111] relative overflow-hidden">
      <MatrixRain />
      <Navbar />
      <main className="w-full flex-1 pt-24 pb-12 px-4 relative z-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
            <div className="text-center">
              <h1 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">
                Projects
              </h1>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[#888]">
                Portfolio & Team Projects
              </p>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {projectCards.map((project) => (
              <div
                key={project.title}
                onClick={() => openItem(project)}  // ← wire up the click
                className="cursor-pointer rounded border border-[#333] bg-[#1a1a1a] p-5 text-left transition-all hover:-translate-y-2 hover:border-[#00ff41]/60 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)]"
              >
                <h2 className="text-lg font-bold text-[#e0e0e0] mb-1">{project.title}</h2>
                <span className="rounded-full border border-[#00ff41] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#00ff41]">{project.status}</span>
                <p className="mt-2 text-sm text-[#888888]">{project.summary}</p>
                <p className="mt-2 text-xs text-[#888888]">{project.year}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {activeItem && (
        <PopupCard item={activeItem} isClosing={isClosing} onClose={closeModal} />
      )}

      <Footer />
    </div>
  )
}

export default ProjectsPage