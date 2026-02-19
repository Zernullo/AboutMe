import { type DetailItem, projectCards } from '@/data/portfolio'

type ProjectsSectionProps = {
  onOpen: (item: DetailItem) => void
}

function ProjectsSection({ onOpen }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-10">
      <h2 className="text-2xl font-bold text-[#00ff41]">Projects</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {projectCards.map((project) => (
          <button
            key={project.title}
            type="button"
            onClick={() =>
              onOpen({
                title: project.title,
                meta: project.summary,
                details: project.details
              })
            }
            className="rounded border border-[#333] bg-[#1a1a1a] p-4 text-center transition-all hover:-translate-y-2 hover:border-[#e0e0e0] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
          >
            <h3 className="text-lg font-semibold text-[#e0e0e0]">{project.title}</h3>
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
