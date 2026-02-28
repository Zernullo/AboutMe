type Education = {
  school: string
  degree: string
  field: string
  startYear: string
  endYear: string
  description?: string
  concentration?: string
  gpa?: string
  skills?: string
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
    skills: "AI & LLM Development, Data Driven Security, Artificial Intelligence, Intro to Cyber, Networks, Operating Systems, Advanced Data Structures and Algorithms, Intro Systems Programming",
    description: `Currently pursuing a Bachelor of Science in Computer Science at Louisiana State University with a concentration in Cybersecurity. Expected graduation is in 2027 with a strong academic record, maintaining a GPA of 3.85. 
    My coursework has provided me with a solid foundation in computer science principles, with a particular focus on cybersecurity concepts and practices. I have developed skills in AI and LLM development, data-driven security approaches, and have gained hands-on experience through various projects and research opportunities at LSU. 
    I am actively involved in the cybersecurity community on campus and am committed to applying my knowledge and skills to real-world security challenges in the future.`
  },
]

function EducationSection() {
  return (
    <section id="education" className="py-10">
      <div className="flex flex-col gap-6 mb-12 sm:flex-row sm:items-center">
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
            className="rounded border border-[#00ff41]/20 bg-[#1a1a1a] p-4 sm:p-6 shadow-md hover:border-[#00ff41]/60 transition-all"
          >
            {/* Top row */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00ff41] shadow-[0_0_6px_#00ff41] mt-0.5 shrink-0" />
                <span className="text-sm font-mono uppercase tracking-widest text-[#00ff41]">{edu.school}</span>
              </div>
              <span className="text-sm font-mono text-[#888888] shrink-0">{edu.startYear} – {edu.endYear}</span>
            </div>

            {/* Degree */}
            <h3 className="text-base sm:text-lg font-bold text-[#e0e0e0] mb-3 pl-2 sm:pl-4">{edu.degree}</h3>

            {/* Badges row */}
            <div className="flex pl-2 sm:pl-4 mb-4">
              {edu.concentration && (
                <span className="rounded-full border border-[#00ff41] px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#00ff41] w-max">
                  {edu.concentration}
                </span>
              )}
              <div className="flex-1" />
              {edu.gpa && (
                <span className="rounded-full border border-[#00ff41] px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#00ff41] w-max">
                  GPA {edu.gpa}
                </span>
              )}
            </div>

            {/* Description */}
            {edu.description && (
              <div className="pl-2 sm:pl-4 mb-2">
                <p className="text-sm font-mono text-[#888888] whitespace-pre-line">{edu.description}</p>
              </div>
            )}

            {/* Coursework */}
            {edu.skills && (
              <div className="pl-2 sm:pl-4 pt-3 border-t border-[#2a2a2a]">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#555] mb-2">
                  Relevant Coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {edu.skills.split(',').map(course => (
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