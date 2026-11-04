import { useState, useEffect } from 'react'
import { type DetailItem, fallbackNewsArticles, type NewsArticle } from '@/data/portfolio'
import { Link } from 'react-router-dom'
import { Radio, ShieldAlert } from 'lucide-react'

type CybernewsSectionProps = {
  onOpen: (item: DetailItem) => void
}

const API_BASE = import.meta.env.VITE_API_BASE ?? ''

function getThreatTag(title: string, summary: string): { label: string; color: string } {
  const combined = `${title} ${summary}`.toLowerCase()
  if (combined.includes('zero-day') || combined.includes('0-day')) {
    return { label: 'ZERO-DAY', color: 'border-red-500/50 bg-red-950/40 text-red-400' }
  }
  if (combined.includes('ransomware') || combined.includes('extortion')) {
    return { label: 'RANSOMWARE', color: 'border-amber-500/50 bg-amber-950/40 text-amber-400' }
  }
  if (combined.includes('cve-') || combined.includes('vulnerability') || combined.includes('exploit')) {
    return { label: 'VULNERABILITY', color: 'border-orange-500/50 bg-orange-950/40 text-orange-400' }
  }
  if (combined.includes('phishing') || combined.includes('malware') || combined.includes('trojan')) {
    return { label: 'MALWARE', color: 'border-purple-500/50 bg-purple-950/40 text-purple-400' }
  }
  return { label: 'INTEL REPORT', color: 'border-[#00ff41]/40 bg-[#00ff41]/10 text-[#00ff41]' }
}

function CybernewsSection({ onOpen }: CybernewsSectionProps) {
  const [articles, setArticles] = useState<NewsArticle[]>(fallbackNewsArticles.slice(0, 4))
  const [isLive, setIsLive] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const endpoint = API_BASE ? `${API_BASE}/api/cybernews?limit=4` : '/api/cybernews?limit=4'

    const fetchNews = async () => {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) throw new Error('API not available')
        const data = await response.json()

        if (isMounted && data.ok && data.articles && data.articles.length > 0) {
          setArticles(data.articles.slice(0, 4))
          setIsLive(true)
        }
      } catch {
        if (isMounted) {
          setIsLive(false)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchNews()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id="cybernews" className="py-10">
      <div className="flex items-center gap-6 mb-12">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <ShieldAlert className="h-5 w-5 text-[#00ff41] animate-pulse" />
            <h2 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">
              Threat Intelligence Radar
            </h2>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold ${
                isLive
                  ? 'border border-[#00ff41]/50 bg-[#00ff41]/10 text-[#00ff41]'
                  : 'border border-[#555] bg-[#1a1a1a] text-[#d1d5db]'
              }`}
              title={isLive ? "Live RSS Uplink Active (100% Free)" : "Serving Curated Intel Feed"}
            >
              <Radio className={`h-2.5 w-2.5 ${isLive ? 'animate-pulse text-[#00ff41]' : 'text-[#a3a3a3]'}`} />
              {isLive ? 'LIVE UPLINK' : 'CACHED INTEL'}
            </span>
          </div>
          <p className="mt-1 text-xs font-mono uppercase tracking-[0.3em] text-[#a3a3a3]">
            Sector: Cybersecurity / Live Advisories &amp; Zero-Days
          </p>
        </div>

        <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
      </div>

      {loading ? (
        <div className="mt-4 rounded border border-[#333] bg-[#1a1a1a] p-8 text-center">
          <p className="text-sm font-mono text-[#00ff41] animate-pulse">Establishing uplink to threat intel feeds...</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((article, index) => {
            const tag = getThreatTag(article.title, article.summary)
            return (
              <button
                key={article.url + index}
                type="button"
                onClick={() =>
                  onOpen({
                    title: article.title,
                    meta: `${article.source} • ${article.date}`,
                    details: `${article.summary}\n\nFull Advisory / Source Link:\n${article.url}`,
                    image: article.image || ''
                  })
                }
                className="group relative w-full overflow-hidden rounded-xl border border-[#333] bg-[#1a1a1a] p-5 text-left transition-all duration-300 hover:border-[#00ff41] hover:shadow-[0_0_25px_rgba(0,255,65,0.18)] cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border ${tag.color}`}
                    >
                      {tag.label}
                    </span>
                    <span className="text-xs font-mono text-[#9ca3af]">{article.date}</span>
                  </div>

                  <h3 className="mt-1 pr-6 text-base font-bold leading-snug text-[#ffffff] line-clamp-2 group-hover:text-[#00ff41] transition-colors">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#d1d5db] group-hover:text-white transition-colors line-clamp-2">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2a2a2a] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#a3a3a3] font-semibold">{article.source}</span>
                  <span className="text-[#00ff41] font-bold group-hover:translate-x-1 transition-all">
                    VIEW ADVISORY →
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Link
          to="/cybernews"
          className="group inline-flex items-center gap-2 rounded-full border-2 border-[#00ff41] bg-transparent px-6 py-2.5 text-sm font-bold text-[#00ff41] transition-all hover:-translate-y-0.5 hover:bg-[#00ff41] hover:!text-black hover:shadow-[0_0_22px_rgba(0,255,65,0.4)] cursor-pointer"
        >
          <span className="group-hover:!text-black transition-colors">Explore All Threat Intelligence Feeds</span>
          <span className="group-hover:!text-black transition-colors" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

export default CybernewsSection
