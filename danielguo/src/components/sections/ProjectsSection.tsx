import { type DetailItem, projectCards } from '@/data/portfolio'
import { Link } from 'react-router-dom'

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
          <p className="mt-1 text-xs font-mono uppercase tracking-[0.3em] text-[#a3a3a3]">Featured Work &amp; Research</p>
        </div>
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
      </div>

      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {projectCards.slice(0, 4).map((project) => (
          <button
            key={project.title}
            type="button"
            onClick={() =>
              onOpen({
                title: project.title,
                meta: `${project.year ? project.year : ''} • ${project.status ? project.status : ''} • ${project.category}`,
                details: project.details,
                links: project.links
              })
            }
            className="group rounded-xl border border-[#333] bg-[#1a1a1a] p-5 text-left transition-all hover:-translate-y-1.5 hover:border-[#00ff41] hover:shadow-[0_0_22px_rgba(0,255,65,0.2)] cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/30 rounded-md px-2.5 py-0.5 font-semibold">
                  {project.category}
                </span>
                <span className="rounded-full border border-[#00ff41] bg-black/40 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#00ff41]">
                  {project.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#ffffff] group-hover:text-[#00ff41] transition-colors mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-[#d1d5db] leading-relaxed line-clamp-3">
                {project.summary}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2a2a2a] flex items-center justify-between text-xs font-mono">
              <span className="text-[#9ca3af] font-medium">{project.year}</span>
              <span className="text-[#00ff41] font-bold group-hover:translate-x-1 transition-all">
                VIEW SPECS →
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 rounded-full border-2 border-[#00ff41] bg-transparent px-6 py-2.5 text-sm font-bold text-[#00ff41] transition-all hover:-translate-y-0.5 hover:bg-[#00ff41] hover:!text-black hover:shadow-[0_0_22px_rgba(0,255,65,0.4)] cursor-pointer"
        >
          <span className="group-hover:!text-black transition-colors">View all {projectCards.length} projects</span>
          <span className="group-hover:!text-black transition-colors" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

export default ProjectsSection
