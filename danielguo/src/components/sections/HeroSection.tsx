import { Github, Linkedin, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <section id="home" className="min-h-[calc(100vh-var(--navbar-height))] flex flex-col justify-center items-center py-12">
      <div className="inline-flex items-center gap-2.5 rounded-full border border-[#00ff41]/50 bg-[#00ff41]/10 px-5 py-2 text-xs font-mono font-bold text-[#00ff41] mb-5 shadow-[0_0_20px_rgba(0,255,65,0.25)]">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff41]"></span>
        </span>
        <span className="tracking-wider">STATUS: ONLINE · AI SOFTWARE ENGINEER &amp; CYBERSECURITY SPECIALIST</span>
      </div>

      <h1 className="mt-2 text-4xl font-mono font-bold tracking-tight text-[#00ff41] sm:text-6xl drop-shadow-[0_0_25px_rgba(0,255,65,0.4)]">
        Daniel Guo
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-base text-[#d1d5db] sm:text-lg leading-relaxed text-center">
        Computer Science student at LSU concentrating in Cybersecurity with a Mathematics minor (GPA: 3.93). Passionate about building real-world applications, low-latency AI streaming, and secure software systems.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to={{ pathname: "/", hash: "#projects" }}
          onClick={() => {
            const el = document.getElementById('projects')
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          style={{ color: '#000000' }}
          className="inline-flex items-center justify-center rounded-lg bg-[#00ff41] px-6 py-3 text-sm font-bold !text-black shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all hover:bg-[#00ff41]/90 hover:shadow-[0_0_30px_rgba(0,255,65,0.6)] hover:-translate-y-0.5 cursor-pointer"
        >
          <span style={{ color: '#000000' }} className="!text-black font-bold">View Projects →</span>
        </Link>

        <Link
          to={{ pathname: "/", hash: "#contact" }}
          onClick={() => {
            const el = document.getElementById('contact')
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          className="group inline-flex items-center justify-center rounded-lg border-2 border-[#00ff41] bg-transparent px-6 py-3 text-sm font-bold text-[#00ff41] transition-all hover:bg-[#00ff41] hover:!text-black hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:-translate-y-0.5 cursor-pointer"
        >
          <span className="text-[#00ff41] group-hover:!text-black transition-colors">Get In Touch</span>
        </Link>

        <Link
          to="/cybernews"
          className="inline-flex items-center justify-center rounded-lg border border-[#444] bg-[#1a1a1a] px-6 py-3 text-sm font-semibold !text-[#f3f4f6] transition-all hover:border-[#00ff41] hover:!text-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] hover:-translate-y-0.5 cursor-pointer"
        >
          Threat Intel Feed
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="https://github.com/Zernullo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub Profile"
          className="rounded-full border border-[#444] bg-[#1a1a1a] p-3 text-[#e0e0e0] transition-all hover:border-[#00ff41] hover:text-[#00ff41] hover:shadow-[0_0_12px_rgba(0,255,65,0.4)]"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/daniel-guo-8251062b6/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn Profile"
          className="rounded-full border border-[#444] bg-[#1a1a1a] p-3 text-[#e0e0e0] transition-all hover:border-[#00ff41] hover:text-[#00ff41] hover:shadow-[0_0_12px_rgba(0,255,65,0.4)]"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="https://tryhackme.com/p/Zernullo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TryHackMe"
          title="TryHackMe Profile"
          className="rounded-full border border-[#444] bg-[#1a1a1a] p-3 text-[#e0e0e0] transition-all hover:border-[#00ff41] hover:text-[#00ff41] hover:shadow-[0_0_12px_rgba(0,255,65,0.4)]"
        >
          <Shield className="h-5 w-5" />
        </a>
      </div>

      <div className="mt-16 flex flex-col items-center gap-1.5 text-xs font-mono tracking-widest text-[#a3a3a3]">
        <span className="uppercase">Scroll to explore</span>
        <span className="animate-bounce text-[#00ff41] text-base">↓</span>
      </div>
    </section>
  )
}

export default HeroSection
