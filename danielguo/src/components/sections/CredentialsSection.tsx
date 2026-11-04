import { certificationCards, activityCards, type DetailItem } from '@/data/portfolio'
import { Award, Users } from 'lucide-react'

type CredentialsSectionProps = {
  onOpen: (item: DetailItem) => void
}

function CredentialsSection({ onOpen }: CredentialsSectionProps) {
  return (
    <section id="credentials" className="py-10">
      <div className="flex items-center gap-6 mb-12">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
        <div className="text-center">
          <h2 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">
            Credentials &amp; Leadership
          </h2>
          <p className="mt-1 text-xs font-mono uppercase tracking-[0.3em] text-[#a3a3a3]">
            Certifications, Training &amp; Extracurricular Leadership
          </p>
        </div>
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
        {/* Left Column: Certifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#2a2a2a]">
            <Award className="h-5 w-5 text-[#00ff41]" />
            <h3 className="text-lg font-mono font-bold text-[#ffffff] uppercase tracking-wider">
              Certifications &amp; Accreditations
            </h3>
          </div>

          <div className="space-y-4">
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
                className="group block w-full rounded-xl border border-[#333] bg-[#1a1a1a] p-5 text-left transition-all hover:-translate-y-1 hover:border-[#00ff41] hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-mono uppercase tracking-wide text-[#9ca3af] font-semibold">
                    {cert.year} · {cert.issuer}
                  </span>
                  <span className="rounded-full border border-[#00ff41] bg-[#00ff41]/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#00ff41]">
                    {cert.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#ffffff] group-hover:text-[#00ff41] transition-colors mb-1.5">
                  {cert.title}
                </h4>
                <p className="text-sm text-[#d1d5db] line-clamp-2 leading-relaxed">
                  {cert.details}
                </p>
                <div className="mt-3 pt-2 border-t border-[#262626] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#a3a3a3]">Credential Spec</span>
                  <span className="text-[#00ff41] font-bold group-hover:translate-x-1 transition-all">
                    DETAILS →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Leadership & Involvements */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#2a2a2a]">
            <Users className="h-5 w-5 text-[#00ff41]" />
            <h3 className="text-lg font-mono font-bold text-[#ffffff] uppercase tracking-wider">
              Leadership &amp; Campus Involvements
            </h3>
          </div>

          <div className="space-y-4">
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
                className="group block w-full rounded-xl border border-[#333] bg-[#1a1a1a] p-5 text-left transition-all hover:-translate-y-1 hover:border-[#00ff41] hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="inline-block rounded-full border border-[#00ff41] bg-[#00ff41]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#00ff41]">
                    {activity.badge}
                  </span>
                  <span className="text-xs font-mono text-[#9ca3af] font-semibold">{activity.dates}</span>
                </div>
                <h4 className="text-base font-bold text-[#ffffff] group-hover:text-[#00ff41] transition-colors mb-1">
                  {activity.title}
                </h4>
                <p className="text-xs text-[#00ff41] font-mono font-semibold mb-2">{activity.role}</p>
                <p className="text-sm text-[#d1d5db] line-clamp-2 leading-relaxed">
                  {activity.details}
                </p>
                <div className="mt-3 pt-2 border-t border-[#262626] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#a3a3a3]">Involvement Record</span>
                  <span className="text-[#00ff41] font-bold group-hover:translate-x-1 transition-all">
                    DETAILS →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CredentialsSection
