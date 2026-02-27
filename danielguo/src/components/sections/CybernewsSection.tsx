import { useState, useEffect } from 'react'
import { type DetailItem } from '@/data/portfolio'
import { Link } from 'react-router'

type CybernewsSectionProps = {
  onOpen: (item: DetailItem) => void
}

type NewsArticle = {
  title: string
  summary: string
  url: string
  source: string
  date: string
  publishedAt: string
  image: string | null
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001'

function CybernewsSection({ onOpen }: CybernewsSectionProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/cybernews`)
        const data = await response.json()
        
        if (data.ok && data.articles) {
          setArticles(data.articles)
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
  }, [])

  return (
    <section id="cybernews" className="py-10">
      {/* Header Section with Decorative Lines */}
      <div className="flex items-center gap-6 mb-12">
        {/* Left Decorative Line */}
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
        
        <div className="text-center">
          <h2 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic ">
            Intelligence Feed 
          </h2>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[#888]">
            Sector: Cybersecurity / Global Updates
          </p>
        </div>

        {/* Right Decorative Line */}
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
      </div>
      
      {loading && (
        <div className="mt-4 rounded border border-[#333] bg-[#1a1a1a] p-8 text-center">
          <p className="text-sm text-[#888888]">Loading latest news...</p>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded border border-[#ff4444]/30 bg-[#1a1a1a] p-5">
          <p className="text-sm text-[#ff4444]">{error}</p>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="mt-4 rounded border border-[#333] bg-[#1a1a1a] p-8 text-center">
          <p className="text-sm text-[#888888]">No news available at the moment</p>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4">
        {articles.slice(0, 3).map((article, index) => (
          <button
            key={article.url}
            type="button"
            onClick={() =>
              onOpen({
                title: article.title,
                meta: `${article.source} • ${article.date}`,
                details: `${article.summary}\nRead more at: ${article.url}`,
                image: article.image || ''
              })
            }
            className="group relative w-full overflow-hidden rounded border border-[#00ff41]/20 bg-[#1a1a1a] p-5 text-left transition-all duration-300 hover:border-[#00ff41]/60 hover:bg-[#0f1a0f] hover:shadow-[0_0_30px_rgba(0,255,65,0.1)]"
          >
            {/* Index number accent */}
            <span className="absolute right-4 top-4 text-4xl font-bold text-[#00ff41]/5 group-hover:text-[#00ff41]/10 transition-all">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Top row */}
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00ff41] shadow-[0_0_6px_#00ff41]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00ff41]">{article.source}</span>
              <span className="ml-auto text-xs font-mono text-[#888888]">{article.date}</span>
            </div>

            {/* Title */}
            <h3 className="mt-3 pr-8 text-base font-semibold leading-snug text-[#e0e0e0] line-clamp-2 group-hover:text-white transition-colors">
              {article.title}
            </h3>

            {/* Summary */}
            <p className="mt-2 text-sm leading-relaxed text-[#888888] group-hover:text-[#777] transition-colors">
              {article.summary}
            </p>

            {/* Bottom row */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-mono text-[#00ff41]/60 group-hover:text-[#00ff41] transition-colors">
                READ MORE
              </span>
              <span className="text-xs text-[#00ff41]/60 group-hover:text-[#00ff41] transition-all group-hover:translate-x-1">
                →
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Link
          to="/cybernews"
          className="inline-flex items-center gap-2 rounded-full border border-[#00ff41] px-5 py-2 text-sm font-semibold text-[#00ff41] transition-all hover:-translate-y-1 hover:bg-[#00ff41]/10 hover:shadow-[0_0_18px_rgba(0,255,65,0.55)]"
        >
          View more news
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

export default CybernewsSection
