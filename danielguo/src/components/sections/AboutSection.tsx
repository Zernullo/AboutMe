import { useEffect, useState } from 'react'
import portraitImage from '@/assets/images/portfolio.png'
import { Github, Linkedin, Shield } from 'lucide-react'

function AboutSection() {
  const [displayedInterest, setDisplayedInterest] = useState('')

  useEffect(() => {
    const interests = [
      'Artificial Intelligence & ML',
      'Cybersecurity & Threat Defense',
      'Software Engineering',
      'Low-Latency AI Streaming',
      'Full-Stack Development',
      'Robotics & AI Agents'
    ]
    let interestIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 90

    let timeout: ReturnType<typeof setTimeout>
    const typeInterest = () => {
      const currentInterest = interests[interestIndex]

      if (isDeleting) {
        setDisplayedInterest(currentInterest.substring(0, charIndex - 1))
        charIndex--
        typingSpeed = 45
      } else {
        setDisplayedInterest(currentInterest.substring(0, charIndex + 1))
        charIndex++
        typingSpeed = 90
      }

      if (!isDeleting && charIndex === currentInterest.length) {
        isDeleting = true
        typingSpeed = 1600
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        interestIndex = (interestIndex + 1) % interests.length
        typingSpeed = 450
      }

      timeout = setTimeout(typeInterest, typingSpeed)
    }

    timeout = setTimeout(typeInterest, 800)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section id="about" className="py-10" style={{ scrollMarginTop: '100px' }}>
      <div className="flex items-center gap-6 mb-12">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
        <div className="text-center">
          <h2 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">
            About Me
          </h2>
          <p className="mt-1 text-xs font-mono uppercase tracking-[0.3em] text-[#a3a3a3]">
            Profile &amp; Technical Capabilities
          </p>
        </div>
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
      </div>

      {/* Portrait with Corrected 1:1 Aspect Ratio & Upright Head Crop */}
      <div className="mt-6 flex justify-center">
        <div className="relative group">
          <div className="absolute -inset-1.5 rounded-full bg-linear-to-r from-[#00ff41]/40 to-[#00b32d]/20 blur-md group-hover:opacity-100 transition duration-500" />
          <div className="relative h-60 w-60 sm:h-72 sm:w-72 rounded-full overflow-hidden border-2 border-[#00ff41] bg-[#1a1a1a] shadow-[0_0_35px_rgba(0,255,65,0.35)]">
            <img
              src={portraitImage}
              alt="Portrait of Daniel Guo"
              style={{ objectPosition: 'center 20%' }}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-3xl text-center">
        <p className="text-lg sm:text-xl font-mono text-[#f3f4f6] font-semibold leading-relaxed">
          Hi, I&apos;m <span className="text-[#00ff41]">Daniel Guo</span>.
        </p>
        <p className="mt-3 text-sm sm:text-base text-[#d1d5db] leading-relaxed">
          Computer Science student at <span className="text-[#ffffff] font-semibold">Louisiana State University (LSU)</span>, concentrating in <span className="text-[#00ff41] font-semibold">Cybersecurity</span> and pursuing a <span className="text-[#ffffff] font-semibold">Mathematics</span> minor (GPA: <span className="text-[#00ff41] font-bold">3.93</span>).
        </p>
        <p className="mt-3 text-sm sm:text-base text-[#d1d5db] leading-relaxed">
          Focused on exploring{' '}
          <span className="font-mono text-[#00ff41] font-bold underline decoration-[#00ff41]/50 underline-offset-4">
            {displayedInterest}
            <span className="animate-pulse">|</span>
          </span>
        </p>
        <p className="mt-4 text-xs sm:text-sm text-[#a3a3a3] leading-relaxed">
          Passionate about building real-world applications, solving complex technical problems, and researching new technologies. My work bridges low-latency AI streaming, software engineering, and defensive cybersecurity.
        </p>

        {/* Quick social & profile links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://linkedin.com/in/daniel-guo-8251062b6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[#444] bg-[#1a1a1a] px-4 py-2 text-xs font-mono font-bold text-[#e0e0e0] transition-all hover:border-[#00ff41] hover:text-[#00ff41] hover:shadow-[0_0_12px_rgba(0,255,65,0.25)]"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn Profile
          </a>
          <a
            href="https://github.com/Zernullo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[#444] bg-[#1a1a1a] px-4 py-2 text-xs font-mono font-bold text-[#e0e0e0] transition-all hover:border-[#00ff41] hover:text-[#00ff41] hover:shadow-[0_0_12px_rgba(0,255,65,0.25)]"
          >
            <Github className="h-4 w-4" />
            GitHub: @Zernullo
          </a>
          <a
            href="https://tryhackme.com/p/Zernullo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[#444] bg-[#1a1a1a] px-4 py-2 text-xs font-mono font-bold text-[#e0e0e0] transition-all hover:border-[#00ff41] hover:text-[#00ff41] hover:shadow-[0_0_12px_rgba(0,255,65,0.25)]"
          >
            <Shield className="h-4 w-4" />
            TryHackMe
          </a>
        </div>
      </div>

      {/* Technical Skills Organized by Domain */}
      <div className="mx-auto mt-12 max-w-4xl space-y-4">
        <h3 className="text-center text-xs font-mono uppercase tracking-[0.3em] text-[#00ff41] font-bold">
          Technical Skills &amp; Stack
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="rounded-xl border border-[#333] bg-[#1a1a1a] p-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00ff41] font-bold block mb-2">
              Programming Languages
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Python', 'C#', 'C / C++', 'Java', 'JavaScript', 'TypeScript', 'Luau'].map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-[#00ff41]/25 bg-[#00ff41]/5 px-2.5 py-1 text-xs font-mono text-[#f3f4f6]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#333] bg-[#1a1a1a] p-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00ff41] font-bold block mb-2">
              AI, ML &amp; Speech Systems
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['PyTorch', 'Whisper', 'LLM Integration', 'Speech Recognition', 'Multilingual Translation', 'Prompt Engineering'].map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-[#00ff41]/25 bg-[#00ff41]/5 px-2.5 py-1 text-xs font-mono text-[#f3f4f6]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#333] bg-[#1a1a1a] p-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00ff41] font-bold block mb-2">
              Cybersecurity &amp; Systems
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Software Vulnerabilities', 'Malware Analysis', 'Reverse Engineering', 'Network Security', 'Data-Driven Security', 'Privacy Scoring'].map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-[#00ff41]/25 bg-[#00ff41]/5 px-2.5 py-1 text-xs font-mono text-[#f3f4f6]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#333] bg-[#1a1a1a] p-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00ff41] font-bold block mb-2">
              Frontend, Backend &amp; Tools
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['React', 'Node.js', 'Express', 'Django', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'Linux', 'Git & GitHub', 'VS Code'].map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-[#00ff41]/25 bg-[#00ff41]/5 px-2.5 py-1 text-xs font-mono text-[#f3f4f6]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
