// Footer component
// Displays footer content including copyright information and social media links

import { Github, Linkedin, Shield, Mail, Phone, MapPin } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()
  const lastUpdated = "March 2026"
  const location = useLocation()
  const navigate = useNavigate()

  const handleNav = (target: { sectionId?: string; path?: string }) => {
    if (target.path) {
      navigate(target.path)
      window.scrollTo(0, 0)
      return
    }

    if (target.sectionId) {
      if (location.pathname === '/') {
        const el = document.getElementById(target.sectionId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        navigate({ pathname: '/', hash: `#${target.sectionId}` })
      }
    }
  }

  return (
    <footer className="w-full overflow-x-hidden rounded-t-xl border-t border-[#333] bg-[#1a1a1a] text-[#e0e0e0] relative z-10 font-mono">
      <div className="grid w-full grid-cols-1 gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="min-w-0 text-center sm:text-left">
          <h1 className="wrap-break-word text-xl font-bold text-[#00ff41] sm:text-3xl">Daniel Guo</h1>
          <p className="mt-2 text-sm text-[#00ff41]/90 font-semibold">Cybersecurity &amp; AI Software Engineer</p>
          <p className="mt-1 text-xs text-[#a3a3a3]">Louisiana State University • CS &amp; Math</p>
          <p className="mt-3 text-xs text-[#9ca3af] leading-relaxed">
            Building low-latency AI pipelines, defense-in-depth security architectures, and scalable full-stack applications.
          </p>
        </div>

        <div className="min-w-0 text-center sm:text-left">
          <h3 className="mb-3 text-base font-bold text-[#00ff41] uppercase tracking-wider">Contact</h3>
          <div className="space-y-2 text-xs text-[#d1d5db]">
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <Mail className="h-3.5 w-3.5 text-[#00ff41] shrink-0" />
              <a href="mailto:dguo83212@gmail.com" className="hover:text-[#00ff41] transition-colors">
                dguo83212@gmail.com
              </a>
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <Phone className="h-3.5 w-3.5 text-[#00ff41] shrink-0" />
              <a href="tel:9293171863" className="hover:text-[#00ff41] transition-colors">
                (929) 317-1863
              </a>
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#00ff41] shrink-0" />
              <span>Baton Rouge, LA</span>
            </p>
            <p className="pt-1 text-[#00ff41] font-semibold">
              ● Open to New Opportunities
            </p>
          </div>
        </div>

        <div className="min-w-0 text-center sm:text-left">
          <h3 className="mb-3 text-base font-bold text-[#00ff41] uppercase tracking-wider">Connect</h3>
          <p className="text-xs text-[#a3a3a3] mb-3">Explore code repositories, verified certifications, and professional background:</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <a
              href="https://github.com/Zernullo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub Profile"
              className="rounded-lg border border-[#333] bg-[#222] p-2 text-[#e0e0e0] transition-all hover:border-[#00ff41] hover:text-[#00ff41] hover:shadow-[0_0_12px_rgba(0,255,65,0.4)]"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-guo-8251062b6/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn Profile"
              className="rounded-lg border border-[#333] bg-[#222] p-2 text-[#e0e0e0] transition-all hover:border-[#00ff41] hover:text-[#00ff41] hover:shadow-[0_0_12px_rgba(0,255,65,0.4)]"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://tryhackme.com/p/Zernullo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TryHackMe"
              title="TryHackMe Profile"
              className="rounded-lg border border-[#333] bg-[#222] p-2 text-[#e0e0e0] transition-all hover:border-[#00ff41] hover:text-[#00ff41] hover:shadow-[0_0_12px_rgba(0,255,65,0.4)]"
            >
              <Shield className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="min-w-0 text-center sm:text-left">
          <h3 className="mb-3 text-base font-bold text-[#00ff41] uppercase tracking-wider">Navigation</h3>
          <ul className="grid grid-cols-2 gap-y-1.5 text-xs">
            <li>
              <button
                type="button"
                onClick={() => handleNav({ sectionId: 'home' })}
                className="hover:text-[#00ff41] hover:underline cursor-pointer bg-transparent border-none p-0 text-inherit text-left"
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNav({ sectionId: 'about' })}
                className="hover:text-[#00ff41] hover:underline cursor-pointer bg-transparent border-none p-0 text-inherit text-left"
              >
                About
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNav({ sectionId: 'education' })}
                className="hover:text-[#00ff41] hover:underline cursor-pointer bg-transparent border-none p-0 text-inherit text-left"
              >
                Education
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNav({ sectionId: 'experience' })}
                className="hover:text-[#00ff41] hover:underline cursor-pointer bg-transparent border-none p-0 text-inherit text-left"
              >
                Experience
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNav({ path: '/projects' })}
                className="hover:text-[#00ff41] hover:underline cursor-pointer bg-transparent border-none p-0 text-inherit text-left"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNav({ sectionId: 'credentials' })}
                className="hover:text-[#00ff41] hover:underline cursor-pointer bg-transparent border-none p-0 text-inherit text-left"
              >
                Credentials
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNav({ path: '/cybernews' })}
                className="hover:text-[#00ff41] hover:underline cursor-pointer bg-transparent border-none p-0 text-inherit text-left"
              >
                Threat Intel
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNav({ sectionId: 'contact' })}
                className="hover:text-[#00ff41] hover:underline cursor-pointer bg-transparent border-none p-0 text-inherit text-left"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#00ff41]/20 px-4 py-4 text-center text-xs text-[#9ca3af] sm:px-6 lg:px-8">
        © {currentYear} Daniel Guo. Built with React 19, TypeScript, &amp; Tailwind CSS.<br />
        <span className="text-[#a3a3a3]">Status: Production Ready • Last updated: {lastUpdated}</span>
      </div>
    </footer>
  )
}

export default Footer
