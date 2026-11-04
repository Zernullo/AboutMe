import { Github } from 'lucide-react'

type Experience = {
  company: string
  location: string
  role: string
  period: string
  description: string
  skills: string[]
  github?: { label: string; url: string }
}

const experiences: Experience[] = [
  {
    company: 'Performance Contractors INC.',
    location: 'Baton Rouge, LA',
    role: 'AI Software Engineer (React & C#)',
    period: 'Feb 2026 – May 2026',
    description: `Developed an enterprise LLM-based safety assistant (Soteria) that analyzes historical incident documentation to provide real-time workplace hazard guidance.
    
• Engineered incident predictability models by identifying patterns across physical job sites, shift schedules, and environmental weather conditions.
• Built full-stack interactive safety data analysis features utilizing React on the frontend and C# on the backend for responsive hazard querying and worker safety advisories.`,
    skills: ['React', 'C#', 'Large Language Models', 'Predictive Analytics', 'Workplace Safety', 'Software Architecture']
  },
  {
    company: 'LSU Information Technology Services',
    location: 'Baton Rouge, LA',
    role: 'Information Technology Services',
    period: 'Feb 2026 – Present',
    description: `Deliver frontline technical support, hardware/software troubleshooting, and network problem resolution for university staff, faculty, and academic departments.
    
• Promptly diagnose and resolve complex workstation, software configuration, and network connectivity issues across diverse operating systems.
• Analyze campus IT workflows and procedural bottlenecks to identify inefficiencies and implement technology improvements in close coordination with technical teams.`,
    skills: ['Technical Support', 'Network Troubleshooting', 'Workflow Analysis', 'Systems Optimization', 'Active Directory']
  },
  {
    company: 'LSU RISE Lab (Dr. Fronchetti)',
    location: 'Baton Rouge, LA',
    role: 'Undergraduate Research Assistant',
    period: 'Aug 2025 – May 2026',
    description: `Conducted academic research under Dr. Fronchetti developing pAIrStudio, an innovative web-based platform that teaches robot programming through a gamified block-based environment.
    
• Integrated ChatGPT-powered natural language guidance and real-time code assistance to support learners with limited prior programming background.
• Designed accessible, inclusive learning workflows and evaluated student problem-solving patterns across varied technical proficiencies and age groups.`,
    skills: ['Robotics', 'AI-Assisted Programming', 'Educational Technology', 'JavaScript', 'Phaser.js', 'Research & Experimentation'],
    github: { label: 'View pAIrStudio on GitHub', url: 'https://github.com/riseatlsu/pAIrStudio' }
  }
]

function ExperienceSection() {
  return (
    <section id="experience" className="py-10">
      <div className="flex items-center gap-6 mb-12">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
        <div className="text-center">
          <h2 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">
            Experience
          </h2>
          <p className="mt-1 text-xs font-mono uppercase tracking-[0.3em] text-[#a3a3a3]">
            Professional Engineering &amp; Research
          </p>
        </div>
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <div
            key={exp.company + exp.role}
            className="flex flex-col rounded-xl border border-[#333] bg-[#1a1a1a] p-6 shadow-md hover:border-[#00ff41]/70 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] transition-all text-left justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#00ff41] font-bold">
                  {exp.company}
                </span>
              </div>
              <span className="block text-xs font-mono text-[#9ca3af] font-semibold mb-2">
                {exp.period} · {exp.location}
              </span>
              <h3 className="text-lg font-bold text-[#ffffff] mb-3">{exp.role}</h3>
              <p className="text-sm text-[#d1d5db] mb-4 whitespace-pre-line leading-relaxed">
                {exp.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mt-2 pt-4 border-t border-[#2a2a2a]">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-0.5 text-xs font-mono font-semibold rounded-md bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {exp.github && (
                <div className="mt-4 pt-3 border-t border-[#2a2a2a]">
                  <a
                    href={exp.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00ff41] hover:underline transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    {exp.github.label} →
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ExperienceSection
