import { useEffect, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MatrixRain from '@/components/ui/MatrixRainAnimation'
import PopupCard from '@/components/ui/PopupCard'
import { type DetailItem } from '@/data/portfolio'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001'

type NewsArticle = {
  title: string
  summary: string
  url: string
  source: string
  date: string
  publishedAt: string
  image: string | null
}

// Convert a NewsArticle to the DetailItem shape PopupCard expects
function articleToDetailItem(article: NewsArticle): DetailItem {
  return {
    title: article.title,
    meta: `${article.source} · ${article.date}`,
    details: `${article.summary}\nRead more at: ${article.url}`,
    image: article.image ?? undefined,
  }
}

function CybernewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [activeItem, setActiveItem] = useState<DetailItem | null>(null)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    document.body.style.overflow = activeItem ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeItem])

  const openItem = (article: NewsArticle) => {
    setIsClosing(false)
    setActiveItem(articleToDetailItem(article))
  }

  const closeModal = () => {
    if (!activeItem || isClosing) return
    setIsClosing(true)
    setTimeout(() => {
      setActiveItem(null)
      setIsClosing(false)
    }, 200)
  }

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_BASE}/api/cybernews?limit=20&page=${page}`)
        const data = await response.json()
        if (data.ok && data.articles) {
          setArticles(data.articles)
          setTotalPages(data.totalPages)
          setError('')
        } else {
          setError('Unable to load news')
        }
      } catch {
        setError('Failed to fetch news')
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [page])

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#111111]">
      <MatrixRain />
      <Navbar />
      <main className="w-full flex-1 pt-24 pb-12 px-4 relative z-10">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
            <div className="text-center">
              <h1 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">
                Intelligence_Feed
              </h1>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[#888]">
                Sector: Cybersecurity / Global Updates
              </p>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
          </div>

          {/* Page jump input */}
          <div className="flex justify-center items-center gap-2 mb-7">
            <span className="text-xs font-mono text-[#555]">PAGE</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              defaultValue={page}
              key={page}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = parseInt((e.target as HTMLInputElement).value)
                  if (val >= 1 && val <= totalPages) {
                    setPage(val)
                    window.scrollTo(0, 0)
                  }
                }
              }}
              className="w-16 rounded border border-[#333] bg-[#1a1a1a] px-2 py-1 text-center text-sm font-mono text-[#e0e0e0] focus:border-[#00ff41]/60 focus:outline-none"
            />
            <span className="text-xs font-mono text-[#555]">/ {totalPages}</span>
          </div>

          {loading && (
            <div className="rounded border border-[#333] bg-[#1a1a1a] p-8 text-center">
              <p className="text-sm text-[#888888]">Loading latest news...</p>
            </div>
          )}

          {error && (
            <div className="rounded border border-[#ff4444]/30 bg-[#1a1a1a] p-5 mb-6">
              <p className="text-sm text-[#ff4444]">{error}</p>
            </div>
          )}

          {/* Articles — now divs instead of <a> tags */}
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((article) => (
              <div
                key={article.url}
                onClick={() => openItem(article)}
                className="group cursor-pointer block rounded border border-[#333] bg-[#1a1a1a] p-5 transition-all hover:-translate-y-2 hover:border-[#00ff41]/60 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)]"
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="mb-3 w-full h-40 object-cover rounded border border-[#222]"
                    loading="lazy"
                  />
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00ff41] shadow-[0_0_6px_#00ff41]" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[#00ff41]">{article.source}</span>
                  <span className="ml-auto text-xs font-mono text-[#888888]">{article.date}</span>
                </div>
                <h2 className="text-base font-bold text-[#e0e0e0] mb-2 group-hover:text-white transition-colors line-clamp-2">{article.title}</h2>
                <p className="text-sm text-[#888888] mb-3 line-clamp-3">{article.summary}</p>
                <span className="text-xs font-mono text-[#00ff41]/60 group-hover:text-[#00ff41] transition-colors">READ MORE →</span>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                onClick={() => { setPage(p => Math.max(p - 1, 1)); window.scrollTo(0, 0) }}
                disabled={page === 1}
                className="px-4 py-2 rounded border border-[#333] bg-[#1a1a1a] text-sm font-mono text-[#888888] transition-all hover:border-[#00ff41]/60 hover:text-[#00ff41] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← PREV
              </button>
              <span className="text-xs font-mono text-[#555]">PAGE {page} / {totalPages}</span>
              <button
                onClick={() => { setPage(p => Math.min(p + 1, totalPages)); window.scrollTo(0, 0) }}
                disabled={page === totalPages}
                className="px-4 py-2 rounded border border-[#333] bg-[#1a1a1a] text-sm font-mono text-[#888888] transition-all hover:border-[#00ff41]/60 hover:text-[#00ff41] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                NEXT →
              </button>
            </div>
          )}
        </div>
      </main>

      {activeItem && (
        <PopupCard item={activeItem} isClosing={isClosing} onClose={closeModal} />
      )}

      <Footer />
    </div>
  )
}

export default CybernewsPage