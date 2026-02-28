type Education = {
  school: string
  degree: string
  field: string
  startYear: string
  endYear: string
  description?: string
  concentration?: string
  gpa?: string
}

const educationList: Education[] = [
  {
    school: "Louisiana State University",
    degree: "Bachelor of Science in Computer Science",
    field: "Computer Science",
    concentration: "Cybersecurity",
    startYear: "2023",
    endYear: "2027",
    gpa: "3.85",
    description: "AI & LLM Development, Data Driven Security, Artificial Intelligence, Intro to Cyber, Networks, Operating Systems, Advanced Data Structures and Algorithms, Intro Systems Programming"
  },
]

function EducationSection() {
  return (
    <section id="education" className="py-10">
      <div className="flex items-center gap-6 mb-12">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
        <div className="text-center">
          <h2 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">
            Education
          </h2>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[#888]">
            Academic Background
          </p>
        </div>
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
      </div>

      <div className="space-y-6">
        {educationList.map((edu, idx) => (
          <div
            key={edu.school + edu.degree + idx}
            className="rounded border border-[#00ff41]/20 bg-[#1a1a1a] p-6 shadow-md hover:border-[#00ff41]/60 transition-all"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00ff41] shadow-[0_0_6px_#00ff41] mt-0.5 shrink-0" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#00ff41]">{edu.school}</span>
              </div>
              <span className="text-xs font-mono text-[#888888] shrink-0">{edu.startYear} – {edu.endYear}</span>
            </div>

            {/* Degree */}
            <h3 className="text-lg font-bold text-[#e0e0e0] mb-3 pl-4">{edu.degree}</h3>

            {/* Badges row */}
            <div className="flex flex-wrap gap-2 pl-4 mb-4">
              {edu.concentration && (
                <span className="rounded-full border border-[#00ff41] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#00ff41]">
                  {edu.concentration}
                </span>
              )}
              {edu.gpa && (
                <span className="rounded-full border border-[#00ff41] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#00ff41]">
                  GPA {edu.gpa}
                </span>
              )}
            </div>

            {/* Coursework */}
            {edu.description && (
              <div className="pl-4 pt-3 border-t border-[#2a2a2a]">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#555] mb-2">
                  Relevant Coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {edu.description.split(',').map(course => (
                    <span
                      key={course.trim()}
                      className="rounded bg-[#00ff41]/5 border border-[#00ff41]/15 px-2 py-1 text-xs font-mono text-[#888888]"
                    >
                      {course.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default EducationSection