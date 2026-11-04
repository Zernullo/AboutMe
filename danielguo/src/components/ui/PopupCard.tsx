import { useEffect, useRef } from 'react'
import { type DetailItem } from '@/data/portfolio'
import { ExternalLink, ShieldCheck } from 'lucide-react'

interface PopupCardProps {
  item: DetailItem
  isClosing: boolean
  onClose: () => void
}

const PopupCard = ({ item, isClosing, onClose }: PopupCardProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      const atTop = el.scrollTop <= 0
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault()
      }
    }

    const preventScroll = (e: TouchEvent) => {
      if (scrollRef.current && scrollRef.current.contains(e.target as Node)) return
      e.preventDefault()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    el.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('touchmove', preventScroll, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      el.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchmove', preventScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  // Split details into clean paragraphs
  const cleanDetails = item.details.split('\nRead more at: ')[0].split('\n\nFull Advisory / Source Link:\n')[0]
  const sourceUrl = item.details.includes('\nRead more at: ')
    ? item.details.split('\nRead more at: ')[1]
    : item.details.includes('\n\nFull Advisory / Source Link:\n')
    ? item.details.split('\n\nFull Advisory / Source Link:\n')[1]
    : null

  const lines = cleanDetails.split('\n').map((l) => l.trim()).filter(Boolean)

  return (
    <div
      className={`${isClosing ? 'animate-modal-overlay-out' : 'animate-modal-overlay'} fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-xs`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${isClosing ? 'animate-modal-panel-out' : 'animate-modal-panel'} relative w-full max-w-2xl text-left`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -inset-px rounded-xl border-2 border-[#00ff41]/50 shadow-[0_0_35px_rgba(0,255,65,0.25)]" />
        <div className="relative rounded-xl bg-[#1a1a1a] shadow-2xl flex flex-col max-h-[82vh] border border-[#333]">

          {/* Fixed header */}
          <div className="flex items-center justify-between border-b border-[#2a2a2a] px-6 sm:px-8 py-4 shrink-0 bg-[#161616] rounded-t-xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#00ff41]" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00ff41] font-bold">
                SPECIFICATION SHEET
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#444] bg-[#222] text-sm text-[#f3f4f6] transition hover:border-[#00ff41] hover:text-[#00ff41] hover:bg-black cursor-pointer font-bold"
            >
              ✕
            </button>
          </div>

          {/* Scrollable content */}
          <div
            ref={scrollRef}
            className="overflow-y-auto px-6 sm:px-8 py-6 space-y-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#ffffff] font-mono leading-snug">
                {item.title}
              </h3>

              {item.meta && (
                <div className="mt-2.5 inline-block rounded-md border border-[#00ff41]/30 bg-[#00ff41]/5 px-3 py-1 text-xs font-mono font-semibold text-[#00ff41]">
                  {item.meta}
                </div>
              )}
            </div>

            {item.image && (
              <div className="mt-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg border border-[#333]"
                />
              </div>
            )}

            {/* Structured details */}
            <div className="space-y-3 pt-2">
              {lines.map((line, idx) => {
                if (line.startsWith('•')) {
                  return (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-[#d1d5db] leading-relaxed pl-1">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#00ff41] shrink-0" />
                      <span>{line.replace(/^•\s*/, '')}</span>
                    </div>
                  )
                }
                if (line.endsWith(':')) {
                  return (
                    <p key={idx} className="text-xs font-mono font-bold uppercase tracking-wider text-[#00ff41] pt-2">
                      {line}
                    </p>
                  )
                }
                return (
                  <p key={idx} className="text-sm leading-relaxed text-[#d1d5db]">
                    {line}
                  </p>
                )
              })}
            </div>

            {/* External Links */}
            {item.links && item.links.length > 0 && (
              <div className="pt-4 border-t border-[#2a2a2a] space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-[#a3a3a3] font-semibold">
                  Repository &amp; Live Resources:
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {item.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#00ff41]/50 bg-[#00ff41]/10 px-3.5 py-1.5 text-xs font-mono font-bold text-[#00ff41] transition-all hover:bg-[#00ff41] hover:!text-black hover:shadow-[0_0_12px_rgba(0,255,65,0.3)]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom bar */}
            <div className="mt-6 flex items-center justify-between border-t border-[#2a2a2a] pt-4">
              {sourceUrl ? (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#00ff41] hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  READ SOURCE ADVISORY →
                </a>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border-2 border-[#00ff41] bg-[#00ff41] px-4 py-1.5 text-xs font-mono font-bold !text-black hover:bg-[#00ff41]/90 transition-all cursor-pointer shadow-[0_0_12px_rgba(0,255,65,0.3)]"
              >
                [ CLOSE ]
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupCard
