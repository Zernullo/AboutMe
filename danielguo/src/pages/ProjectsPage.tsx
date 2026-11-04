import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { projectCards, type DetailItem } from '@/data/portfolio'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import NetworkNodesBackground from '@/components/ui/NetworkNodeBackground'
import PopupCard from '@/components/ui/PopupCard'

type CategoryFilter = 'All' | 'AI & Security' | 'Web & Mobile' | 'Research' | 'Hackathons'

const CATEGORIES: CategoryFilter[] = ['All', 'AI & Security', 'Web & Mobile', 'Research', 'Hackathons']

function ProjectsPage() {
  const [activeItem, setActiveItem] = useState<DetailItem | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All')

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projectCards
    return projectCards.filter(p => p.category === selectedCategory)
  }, [selectedCategory])

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
      <NetworkNodesBackground />
      <Navbar />
      <main className="w-full flex-1 pt-24 pb-12 px-4 relative z-10">
        <div className="mx-auto max-w-5xl">
          {/* Back button */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-[#444] bg-[#1a1a1a] px-4 py-2 text-xs font-mono font-bold text-[#e0e0e0] transition-all hover:border-[#00ff41] hover:text-[#00ff41] hover:shadow-[0_0_12px_rgba(0,255,65,0.2)]"
            >
              <ArrowLeft className="h-4 w-4" />
              RETURN TO TERMINAL
            </Link>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
            <div className="text-center">
              <h1 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">
                Projects
              </h1>
              <p className="mt-1 text-xs font-mono uppercase tracking-[0.3em] text-[#a3a3a3]">
                Portfolio &amp; Engineering Archive
              </p>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {CATEGORIES.map(category => {
              const count = category === 'All'
                ? projectCards.length
                : projectCards.filter(p => p.category === category).length
              const isActive = selectedCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono transition-all cursor-pointer font-semibold ${
                    isActive
                      ? 'bg-[#00ff41] text-black shadow-[0_0_18px_rgba(0,255,65,0.45)]'
                      : 'border border-[#444] bg-[#1a1a1a] text-[#e0e0e0] hover:border-[#00ff41] hover:text-[#00ff41]'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`text-[10px] font-bold rounded px-1.5 py-0.5 ${isActive ? 'bg-black/25 text-black' : 'bg-[#262626] text-[#a3a3a3]'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <button
                key={project.title}
                type="button"
                onClick={() =>
                  openItem({
                    title: project.title,
                    meta: `${project.year ? project.year : ''} • ${project.status ? project.status : ''} • ${project.category}`,
                    details: project.details,
                    links: project.links
                  })
                }
                className="group cursor-pointer rounded-xl border border-[#333] bg-[#1a1a1a] p-5 text-left transition-all hover:-translate-y-1.5 hover:border-[#00ff41] hover:shadow-[0_0_22px_rgba(0,255,65,0.2)] w-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/30 rounded-md px-2.5 py-0.5 font-semibold">
                      {project.category}
                    </span>
                    <span className="rounded-full border border-[#00ff41] bg-black/40 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#00ff41]">
                      {project.status}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[#ffffff] group-hover:text-[#00ff41] transition-colors mb-2">
                    {project.title}
                  </h2>
                  <p className="text-sm text-[#d1d5db] leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#2a2a2a] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9ca3af] font-medium">{project.year}</span>
                  <span className="text-[#00ff41] font-bold group-hover:translate-x-1 transition-all">
                    DETAILS →
                  </span>
                </div>
              </button>
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
