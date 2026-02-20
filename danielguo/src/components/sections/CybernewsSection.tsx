import { useState, useEffect } from 'react'
import { type DetailItem } from '@/data/portfolio'

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
      <h2 className="text-2xl font-bold text-[#00ff41]">Cybernews</h2>
      <p className="mt-2 text-sm text-[#888888]">Recent cybersecurity updates and headlines.</p>
      
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

      <div className="mt-4 space-y-4">
        {articles.slice(0, 3).map((article, index) => (
          <button
            key={index}
            type="button"
            onClick={() =>
              onOpen({
                title: article.title,
                meta: `${article.source} • ${article.date}`,
                details: `${article.summary}\n\nRead more at: ${article.url}`
              })
            }
            className="w-full rounded border border-[#333] bg-[#1a1a1a] p-5 text-left transition-all hover:-translate-y-2 hover:border-[#e0e0e0] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-[#888888]">
              <span>{article.source}</span>
              <span>{article.date}</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-[#e0e0e0] line-clamp-2">{article.title}</h3>
            <p className="mt-2 text-sm text-[#888888] line-clamp-2">{article.summary}</p>
            <p className="mt-4 text-sm text-[#00ff41]">Click for details</p>
          </button>
        ))}
      </div>
    </section>
  )
}

export default CybernewsSection
