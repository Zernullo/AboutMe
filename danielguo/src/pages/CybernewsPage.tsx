import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import NetworkNodesBackground from '@/components/ui/NetworkNodeBackground'
import PopupCard from '@/components/ui/PopupCard'
import { type DetailItem, fallbackNewsArticles, type NewsArticle } from '@/data/portfolio'
import { Radio, ArrowLeft, ShieldAlert } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE ?? ''

function articleToDetailItem(article: NewsArticle): DetailItem {
  return {
    title: article.title,
    meta: `${article.source} · ${article.date}`,
    details: `${article.summary}\n\nFull Advisory / Source Link:\n${article.url}`,
    image: article.image ?? undefined,
  }
}

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

function CybernewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>(fallbackNewsArticles)
  const [selectedSource, setSelectedSource] = useState<string>('All')
  const [loading, setLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [activeItem, setActiveItem] = useState<DetailItem | null>(null)
  const [isClosing, setIsClosing] = useState(false)

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
    let isMounted = true
    const endpoint = API_BASE
      ? `${API_BASE}/api/cybernews?limit=24&page=${page}`
      : `/api/cybernews?limit=24&page=${page}`

    const fetchNews = async () => {
      setLoading(true)
      try {
        const response = await fetch(endpoint)
        if (!response.ok) throw new Error('API offline')
        const data = await response.json()
        if (isMounted && data.ok && data.articles && data.articles.length > 0) {
          setArticles(data.articles)
          setTotalPages(data.totalPages || 1)
          setIsLive(true)
        }
      } catch {
        if (isMounted) {
          setArticles(fallbackNewsArticles)
          setTotalPages(1)
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
  }, [page])

  // Extract unique sources for filtering
  const sources = useMemo(() => {
    const list = Array.from(new Set(articles.map((a) => a.source).filter(Boolean)))
    return ['All', ...list]
  }, [articles])

  const filteredArticles = useMemo(() => {
    if (selectedSource === 'All') return articles
    return articles.filter((a) => a.source === selectedSource)
  }, [articles, selectedSource])

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#111111]">
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

          {/* Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <ShieldAlert className="h-6 w-6 text-[#00ff41] animate-pulse" />
                <h1 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">
                  Threat Intelligence Radar
                </h1>
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
                Zero-Days · Vulnerability Disclosures · Malware Campaigns
              </p>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
          </div>

          {/* Source Filter Chips */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {sources.map((source) => {
              const isActive = selectedSource === source
              const count = source === 'All' ? articles.length : articles.filter((a) => a.source === source).length
              return (
                <button
                  key={source}
                  type="button"
                  onClick={() => setSelectedSource(source)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-mono font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#00ff41] !text-black font-bold shadow-[0_0_15px_rgba(0,255,65,0.4)]'
                      : 'border border-[#444] bg-[#1a1a1a] text-[#d1d5db] hover:border-[#00ff41] hover:text-[#00ff41]'
                  }`}
                >
                  <span>{source}</span>
                  <span
                    className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                      isActive ? 'bg-black/30 text-black' : 'bg-[#2a2a2a] text-[#a3a3a3]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {loading ? (
            <div className="rounded border border-[#333] bg-[#1a1a1a] p-12 text-center">
              <p className="text-sm font-mono text-[#00ff41] animate-pulse">Syncing with global threat intelligence feeds...</p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {filteredArticles.map((article, idx) => {
                const tag = getThreatTag(article.title, article.summary)
                return (
                  <button
                    key={article.url + idx}
                    type="button"
                    onClick={() => openItem(article)}
                    className="group cursor-pointer rounded-xl border border-[#333] bg-[#1a1a1a] p-5 text-left transition-all hover:-translate-y-1 hover:border-[#00ff41] hover:shadow-[0_0_22px_rgba(0,255,65,0.2)] flex flex-col justify-between"
                  >
                    <div>
                      {article.image && (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="mb-3 w-full h-40 object-cover rounded-lg border border-[#222]"
                          loading="lazy"
                        />
                      )}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border ${tag.color}`}
                        >
                          {tag.label}
                        </span>
                        <span className="text-xs font-mono text-[#9ca3af]">{article.date}</span>
                      </div>
                      <h2 className="text-base font-bold text-[#ffffff] mb-2 group-hover:text-[#00ff41] transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h2>
                      <p className="text-sm text-[#d1d5db] mb-3 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="mt-2 pt-3 border-t border-[#2a2a2a] flex items-center justify-between text-xs font-mono">
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setPage((p) => Math.max(p - 1, 1))
                  window.scrollTo(0, 0)
                }}
                disabled={page === 1}
                className="group px-5 py-2.5 rounded-lg border-2 border-[#00ff41] bg-transparent text-sm font-mono font-bold text-[#00ff41] transition-all hover:bg-[#00ff41] hover:!text-black hover:shadow-[0_0_15px_rgba(0,255,65,0.4)] disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-[#00ff41] disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="group-hover:!text-black">← PREV</span>
              </button>
              <span className="text-xs font-mono font-bold text-[#e0e0e0]">
                PAGE {page} / {totalPages}
              </span>
              <button
                onClick={() => {
                  setPage((p) => Math.min(p + 1, totalPages))
                  window.scrollTo(0, 0)
                }}
                disabled={page === totalPages}
                className="group px-5 py-2.5 rounded-lg border-2 border-[#00ff41] bg-transparent text-sm font-mono font-bold text-[#00ff41] transition-all hover:bg-[#00ff41] hover:!text-black hover:shadow-[0_0_15px_rgba(0,255,65,0.4)] disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-[#00ff41] disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="group-hover:!text-black">NEXT →</span>
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
