type Education = {
  school: string
  degree: string
  field: string
  startYear: string
  endYear: string
  concentration?: string
  minor?: string
  gpa?: string
  honors?: string[]
  coursework?: string[]
  description?: string
}

const educationList: Education[] = [
  {
    school: "Louisiana State University (LSU)",
    degree: "Bachelor of Science in Computer Science",
    field: "Computer Science",
    concentration: "Cybersecurity",
    minor: "Mathematics (In Progress)",
    startYear: "2023",
    endYear: "Spring 2027",
    gpa: "3.93",
    honors: [
      "President's Honor Roll (LSU)",
      "Dean's List (Multiple Semesters)",
      "Adrian Virginia Lazarus Memorial Award",
      "Hargrove Engineers + Constructors Scholarship",
      "S&B Engineers and Constructors Scholarship"
    ],
    coursework: [
      "Software Vulnerability",
      "Malware Analysis & Reverse Engineering",
      "Artificial Intelligence",
      "Large Language Model Development",
      "Applied Data-Driven Security",
      "Computer Networks",
      "Operating Systems",
      "Software Systems Development",
      "Advanced Data Structures & Algorithms",
      "Intro to Systems Programming",
      "Object-Oriented Design",
      "Discrete Structures",
      "Linear Algebra & Differential Equations"
    ],
    description: `Currently pursuing a Bachelor of Science in Computer Science at Louisiana State University with a concentration in Cybersecurity and a Mathematics minor, maintaining a 3.93 GPA.
    
Coursework and technical research span low-latency AI streaming, secure software architecture, network defense, and malware analysis. Recognized on the President's Honor Roll and Dean's List, and recipient of distinguished engineering scholarships.`
  }
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
          <p className="mt-1 text-xs font-mono uppercase tracking-[0.3em] text-[#a3a3a3]">
            Academic Background &amp; Honors
          </p>
        </div>
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
      </div>

      <div className="space-y-6 text-left">
        {educationList.map((edu, idx) => (
          <div
            key={edu.school + edu.degree + idx}
            className="rounded-xl border border-[#333] bg-[#1a1a1a] p-6 sm:p-8 shadow-md hover:border-[#00ff41]/70 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] transition-all"
          >
            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41] shrink-0" />
                <span className="text-sm font-mono uppercase tracking-widest text-[#00ff41] font-bold">
                  {edu.school} · Baton Rouge, LA
                </span>
              </div>
              <span className="text-xs font-mono text-[#9ca3af] font-semibold shrink-0">
                {edu.startYear} – Expected {edu.endYear}
              </span>
            </div>

            {/* Degree & Minor */}
            <h3 className="text-lg sm:text-xl font-bold text-[#ffffff] mb-1">{edu.degree}</h3>
            {edu.minor && (
              <p className="text-sm font-mono text-[#a3a3a3] mb-4">
                Minor: <span className="text-[#f3f4f6] font-semibold">{edu.minor}</span>
              </p>
            )}

            {/* Badges row */}
            <div className="flex flex-wrap gap-2 mb-5">
              {edu.concentration && (
                <span className="rounded-full border border-[#00ff41] bg-[#00ff41]/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-[#00ff41]">
                  CONCENTRATION: {edu.concentration}
                </span>
              )}
              {edu.gpa && (
                <span className="rounded-full border border-[#00ff41] bg-[#00ff41]/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-[#00ff41]">
                  GPA: {edu.gpa} / 4.0
                </span>
              )}
            </div>

            {/* Description */}
            {edu.description && (
              <div className="mb-6">
                <p className="text-sm text-[#d1d5db] leading-relaxed whitespace-pre-line">{edu.description}</p>
              </div>
            )}

            {/* Honors & Awards */}
            {edu.honors && edu.honors.length > 0 && (
              <div className="pt-4 mb-5 border-t border-[#2a2a2a]">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#00ff41] font-bold mb-3">
                  Honors, Awards &amp; Scholarships
                </p>
                <div className="flex flex-wrap gap-2">
                  {edu.honors.map((honor) => (
                    <span
                      key={honor}
                      className="rounded-md bg-[#00ff41]/10 border border-[#00ff41]/40 px-3 py-1 text-xs font-mono font-semibold text-[#00ff41]"
                    >
                      ★ {honor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Coursework */}
            {edu.coursework && (
              <div className="pt-4 border-t border-[#2a2a2a]">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#00ff41] font-bold mb-3">
                  Relevant Coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="rounded-md bg-[#00ff41]/5 border border-[#00ff41]/30 px-2.5 py-1 text-xs font-mono font-medium text-[#e0e0e0] hover:text-[#00ff41] hover:border-[#00ff41] transition-colors"
                    >
                      {course}
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
