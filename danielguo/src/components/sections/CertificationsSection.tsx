import { certificationCards, type DetailItem } from '@/data/portfolio'

type CertificationsSectionProps = {
  onOpen: (item: DetailItem) => void
}

function CertificationsSection({ onOpen }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="py-10">
      <div className="flex items-center gap-6 mb-12">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
          <div className="text-center">
            <h2 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">Certifications</h2>
            <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[#888]">Credentials & Achievements</p>
          </div>
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
      </div>
      <div className="mx-auto mt-6 max-w-3xl text-left">
        <div className="space-y-6 border-l-2 border-[#333] pl-6">
          {certificationCards.map((cert) => (
            <button
              key={`${cert.title}-${cert.year}`}
              type="button"
              onClick={() =>
                onOpen({
                  title: cert.title,
                  meta: `${cert.year} • ${cert.issuer} • ${cert.status}`,
                  details: cert.details
                })
              }
              className="block w-full relative rounded border border-[#333] bg-[#1a1a1a] p-4 text-left transition-all hover:-translate-y-2 hover:border-[#e0e0e0] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
            >
              <span className="absolute -left-8.5 top-5 h-3 w-3 rounded-full bg-[#00ff41]" />
              <p className="text-xs uppercase tracking-wide text-[#888888]">{cert.year}</p>
              <div className="mt-1 flex items-center gap-2">
                <h3 className="text-lg font-semibold text-[#e0e0e0]">{cert.title}</h3>
                <span className="rounded-full border border-[#00ff41] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#00ff41]">{cert.status}</span>
              </div>
              <p className="mt-1 text-sm text-[#888888]">{cert.issuer}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CertificationsSection
