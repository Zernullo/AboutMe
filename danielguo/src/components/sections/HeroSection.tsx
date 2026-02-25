import { Button } from '@/components/ui/button'
import { Github, Linkedin, Shield } from 'lucide-react'

function HeroSection() {
  return (
    <section id="home" className="py-10">
      <p className="text-sm uppercase tracking-[0.3em] text-[#888888]">
        Cybersecurity Specialist
      </p>
      <h1 className="mt-3 text-3xl font-bold text-[#00ff41] sm:text-5xl">
        Daniel Guo
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base text-[#e0e0e0] sm:text-lg">
        Aspiring security engineer creating clean, efficient tools and platforms with usability and protection in mind.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <a href="#projects">View Projects</a>
        </Button>
        <Button asChild>
          <a href="#contact">Get In Touch</a>
        </Button>
        <Button asChild>
          <a href="#cybernews">CyberNews</a>
        </Button>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <a
          href="https://github.com/Zernullo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub Profile"
          className="transition-all hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]"
        >
          <Github className="h-6 w-6 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
        </a>
        <a
          href="https://www.linkedin.com/in/daniel-guo-8251062b6/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn Profile"
          className="transition-all hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]"
        >
          <Linkedin className="h-6 w-6 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
        </a>
        <a
          href="https://tryhackme.com/p/Zernullo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TryHackMe"
          title="TryHackMe Profile"
          className="transition-all hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]"
        >
          <Shield className="h-6 w-6 text-[#e0e0e0] transition-colors hover:text-[#00ff41]" />
        </a>
      </div>
    </section>
  )
}

export default HeroSection
