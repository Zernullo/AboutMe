import { type DetailItem, projectCards } from '@/data/portfolio'

type ProjectsSectionProps = { 
  onOpen: (item: DetailItem) => void
}

function ProjectsSection({ onOpen }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-10">
      <div className="flex items-center gap-6 mb-12">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
          <div className="text-center">
            <h2 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">Projects</h2>
            <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[#888]">Personal & Team Projects</p>
          </div>
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {projectCards.slice(0, 3).map((project) => (
          <button
            key={project.title}
            type="button"
            onClick={() =>
              onOpen({
                title: project.title,
                meta: `${project.year ? project.year : ''} • ${project.status ? project.status : ''}`,
                details: project.details
              })
            }
            className="rounded border border-[#333] bg-[#1a1a1a] p-4 text-center transition-all hover:-translate-y-2 hover:border-[#e0e0e0] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
          >
            <h3 className="text-lg font-semibold text-[#e0e0e0]">{project.title}</h3>
            <span className="rounded-full border border-[#00ff41] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#00ff41]">{project.status}</span>
            <p className="mt-2 text-sm text-[#888888]">{project.summary}</p>
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <a
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-[#00ff41] px-5 py-2 text-sm font-semibold text-[#00ff41] transition-all hover:-translate-y-1 hover:bg-[#00ff41]/10 hover:shadow-[0_0_18px_rgba(0,255,65,0.55)]"
        >
          View more projects
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

export default ProjectsSection
