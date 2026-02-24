import { activityCards, type DetailItem } from '@/data/portfolio'

type ActivitiesSectionProps = {
  onOpen: (item: DetailItem) => void
}

function ActivitiesSection({ onOpen }: ActivitiesSectionProps) {
  return (
    <section id="activities" className="py-10">
      <div className="flex items-center gap-6 mb-12">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
          <div className="text-center">
            <h2 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">Activities & Clubs</h2>
            <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[#888]">Extracurriculars & Leadership</p>
          </div>
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {activityCards.map((activity) => (
          <button
            key={activity.title}
            type="button"
            onClick={() =>
              onOpen({
                title: activity.title,
                meta: `${activity.role} • ${activity.dates}`,
                details: activity.details
              })
            }
            className="rounded border border-[#333] bg-[#1a1a1a] p-4 text-left transition-all hover:-translate-y-2 hover:border-[#e0e0e0] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
          >
            <span className="inline-block rounded-full border border-[#00ff41] px-3 py-1 text-xs font-semibold text-[#00ff41]">{activity.badge}</span>
            <h3 className="mt-3 font-semibold text-[#e0e0e0]">{activity.title}</h3>
            <p className="mt-1 text-sm text-[#888888]">{activity.role}</p>
            <p className="mt-2 text-xs text-[#888888]">{activity.dates}</p>
          </button>
        ))}
      </div>
    </section>
  )
}

export default ActivitiesSection
