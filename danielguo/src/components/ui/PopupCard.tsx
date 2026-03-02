import { useEffect, useRef } from 'react'
import { type DetailItem } from '@/data/portfolio'

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

    document.body.style.overflow = 'hidden'
    el.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      document.body.style.overflow = ''
      el.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchmove', preventScroll)
    }
  }, [])

  return (
    <div
      className={`${isClosing ? 'animate-modal-overlay-out' : 'animate-modal-overlay'} fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4`}
      onClick={onClose}
    >
      <div
        className={`${isClosing ? 'animate-modal-panel-out' : 'animate-modal-panel'} relative w-full max-w-2xl text-left`}
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute -inset-px rounded border border-[#444]" />
        <div className="relative rounded bg-[#1a1a1a] shadow-[0_0_22px_rgba(255,255,255,0.08)] flex flex-col max-h-[70vh]">

          {/* Fixed header — never scrolls */}
          <div className="flex items-center justify-between border-b border-[#2a2a2a] px-8 py-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00ff41] shadow-[0_0_6px_#00ff41]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#888888]">INTEL REPORT</span>
            </div>
            <button type="button" onClick={onClose} className="flex h-6 w-6 items-center justify-center rounded border border-[#333] text-xs text-[#888888] transition hover:border-[#e0e0e0]/40 hover:text-[#e0e0e0]">✕</button>
          </div>

          {/* Scrollable content */}
          <div
            ref={scrollRef}
            className="overflow-y-auto px-8 py-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <h3 className="text-xl font-bold text-[#e0e0e0]">{item.title}</h3>

            {item.meta && (
              <div className="mt-2 flex items-center gap-2">
                <span className="h-px flex-1 bg-[#2a2a2a]" />
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#888888]">{item.meta}</p>
                <span className="h-px flex-1 bg-[#2a2a2a]" />
              </div>
            )}

            <div className="mt-4 space-y-3">
              <p className="text-sm leading-relaxed text-[#e0e0e0] whitespace-pre-line">{item.details.split('\nRead more at: ')[0]}</p>
            </div>

            {item.image && (
              <div className="mt-4">
                <img src={item.image} alt={item.title} className="w-full rounded border border-[#333] object-cover" />
              </div>
            )}

            {item.links && item.links.length > 0 && (
              <div className="mt-4 space-y-2">
                {item.links.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-xs font-mono text-[#00ff41]/60 hover:text-[#00ff41]">
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-[#2a2a2a] pt-3">
              {item.details.includes('\nRead more at: ') && (
                <a href={item.details.split('\nRead more at: ')[1]} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#00ff41]/60 hover:text-[#00ff41]">
                  READ MORE →
                </a>
              )}
              <button onClick={onClose} className="text-[11px] font-mono uppercase tracking-widest text-[#00ff41] hover:text-[#00ff41]/60">[ CLOSE ]</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupCard