import { type DetailItem, cybernewsItem } from '@/data/portfolio'

type CybernewsSectionProps = {
  onOpen: (item: DetailItem) => void
}

function CybernewsSection({ onOpen }: CybernewsSectionProps) {
  return (
    <section id="cybernews" className="py-10">
      <h2 className="text-2xl font-bold text-[#00ff41]">Cybernews</h2>
      <p className="mt-2 text-sm text-[#888888]">Recent cybersecurity updates and headlines.</p>
      <div className="mt-4">
        <button
          type="button"
          onClick={() =>
            onOpen({
              title: cybernewsItem.title,
              meta: `${cybernewsItem.tag} • ${cybernewsItem.date}`,
              details: cybernewsItem.details
            })
          }
          className="w-full rounded border border-[#333] bg-[#1a1a1a] p-5 text-left transition-all hover:-translate-y-2 hover:border-[#e0e0e0] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-[#888888]">
            <span>{cybernewsItem.tag}</span>
            <span>{cybernewsItem.date}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-[#e0e0e0]">{cybernewsItem.title}</h3>
          <p className="mt-2 text-sm text-[#888888]">{cybernewsItem.summary}</p>
          <p className="mt-4 text-sm text-[#00ff41]">Click for details</p>
        </button>
        <div className="mt-3 flex items-center justify-between">
          <a href="/cybernews" className="text-sm text-[#00ff41] hover:underline">Read full story</a>
          <a href="/cybernews" className="text-sm text-[#888888] hover:text-[#00ff41]">View all news</a>
        </div>
      </div>
    </section>
  )
}

export default CybernewsSection
